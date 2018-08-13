import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Panel from '../components/panel'
import Button from '@material-ui/core/Button';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs'
import apiConfig from '../constants/api';
import Dropzone from 'react-dropzone';
import ImageLoader from 'react-loading-image';
import moment from 'moment';
import './myPicturesScreen.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  slide: {
    padding: 10,
  },
});

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#C00'
    }
  }
})

const picture_caption = [
  'My Current Headshot',
  'My Current Body Shot1',
  'My Current Body Shot2',
  'My Other Pic 1',
  'My Other Pic 2',
  'My Other Pic 3',
  'My Other Pic 4',
  'My Other Pic 5',
]

class MyPictures extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pictures: []
    }
  }

  getInfoFromProps(props) {
    const { 
      talentInfo
    } = props

    let pictures = []

    if (talentInfo && talentInfo.user) {
      // Get nationality info
      pictures = talentInfo.talent_pictures
    }

    return {
      pictures
    }
  }

  componentWillMount() {
    if (this.props.auth.access && this.props.auth.access.user_id) {
      this.props.talentActions.getTalentInfo(this.props.auth.access.user_id)  
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleUploadMyPictures = (files, caption) => {
    // Upload image files
    let file = files[0]
    const {user_id} = this.props.auth.access
    const signAPI = `${apiConfig.url}/talent_picture/upload/${user_id}/policy/`
    const completeAPI = `${apiConfig.url}/talent_picture/upload/${user_id}/complete/`
    this.uploadToS3(signAPI, completeAPI, file, caption)
  }

  uploadToS3 = (signAPI, completeAPI, file, caption) => {
    const params = {
      objectName: file.name,
      contentType: file.type,
      caption: caption
    }
    
    fetch(signAPI, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(response => response.json())
    .then(response => {
      if(response.error) {
        console.log('error: ', response.error)
        this.onError(file)
      }
      else {
        if (response.signedUrl){
          console.log('success: ', response, response.signedUrl)
          this.uploadFile(response.signedUrl, completeAPI, response.fileID, file)
        } else {
          console.log('error: ', response)
          this.onError(file)
        }
      }
    })
    .catch(error => {
      console.log('error: ', error)
      this.onError(file)
    })
  }

  uploadFile = (s3PutUrl, completeAPI, fileID, file) => {
    fetch(s3PutUrl, {
      method: 'put',
      headers: {
        'x-amz-acl': 'public-read',
        'Content-Type': file.type,
      },
      body: file
    })
    .then(response => {
      if(response.error) {
        this.onError(fileID, file)
      }
      else {
        this.onFinish(completeAPI, fileID, file)
      }
    })
    .catch(error => {
      this.onError(fileID, file)
    })
  }

  onProgress = () => {
    console.log('=== progress')
  }

  onError = (file) => {
    console.log('==== Error: ', file)
  }

  onFinish = (completeAPI, fileID, file) => {    
    let params = {
      fileID: fileID, 
      fileSize: file.size,
      fileType: file.type,
    }
    fetch(completeAPI, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(response => response.json())
    .then(response => {
      if(response.error) {
        console.log('error: ', response.error)
      }
      else {
        // Update pictures from server
        this.props.talentActions.getTalentInfo(this.props.auth.access.user_id)  
      }
    })
    .catch(error => {
      console.log('error: ', error)
    })
  }

  renderPictureView(caption) {
    const { classes } = this.props
    const {
      pictures
    } = this.state

    let picture = pictures.find(function(picture) {
      return (picture.caption === caption);
    });
    return (
      <div>
        <Row className="profile-picture-image-container">
          <Col xs="12" md="12" className="pt-3 pt-md-3 profile-picture-image-col">
            {(picture && picture.url && picture.uploaded && picture.active) ? 
              (
                <ImageLoader
                  className="profile-picture-image"
                  src={picture.url}
                  loading={() => <div className="profile-picture-image">Loading...</div>}
                  error={() => <div>Error</div>} />
              ) : (
                <img
                  className="profile-picture-image"
                  src={require('../images/missing.png')} />
              )
            }
          </Col>
        </Row>
        <Row className="profile-picture-image-container">
          <Col xs="12" md="12" className="pt-3 pt-md-3 profile-picture-image-col">
            <div className="profile-picture-image-title">
              {caption}
            </div>
          </Col>
          <Col xs="12" md="12" className="pt-0 pt-md-0 profile-picture-image-col">
            <div className="profile-picture-image-title">
              {"(click to view)"}
            </div>
          </Col>
        </Row>
        <Row className="profile-picture-image-container">
          <Col xs="12" md="12" className="pt-3 pt-md-3 profile-picture-image-col">
              <Dropzone 
                className="profile-picture-dropzone"
                onDrop={ (files) => this.handleUploadMyPictures(files, caption) } 
                size={ 150 } 
                accept="image/*">
                <div className="profile-picture-dropzone-description">
                  {`To upload or change Drop picture here`}
                </div>
                <div className="profile-picture-dropzone-select-file-button">
                  {`OR SELECT FILE`}
                </div>
                <div className="profile-picture-dropzone-description">
                  {`Supported File Types: JPEG, GIF, BMP, PNG`}
                </div>
              </Dropzone>
          </Col>
        </Row>
      </div>
    )
  }

  renderMainPicturesView() {
    return (
      <Row className="profile-gender-row">
        <Col xs="12" md="1" className="pt-0 pt-md-0" />
        <Col xs="12" md="3" className="pt-0 pt-md-0">
          {this.renderPictureView("My Current Headshot")}
        </Col>
        <Col xs="12" md="4" className="pt-0 pt-md-0">
          {this.renderPictureView("My Current Body Shot 1")}
        </Col>
        <Col xs="12" md="3" className="pt-0 pt-md-0">
          {this.renderPictureView("My Current Body Shot 2")}
        </Col>
        <Col xs="12" md="1" className="pt-0 pt-md-0" />
      </Row>
    )
  }

  renderOtherPicturesView() {
    return (
      <Row className="profile-gender-row">
        <Col xs="12" md="1" className="pt-0 pt-md-0" />
        <Col xs="12" md="2" className="pt-1 pt-md-1">
          {this.renderPictureView("My Other Pic 1")}
        </Col>
        <Col xs="12" md="2" className="pt-1 pt-md-1">
          {this.renderPictureView("My Other Pic 2")}
        </Col>
        <Col xs="12" md="2" className="pt-1 pt-md-1">
          {this.renderPictureView("My Other Pic 3")}
        </Col>
        <Col xs="12" md="2" className="pt-1 pt-md-1">
          {this.renderPictureView("My Other Pic 4")}
        </Col>
        <Col xs="12" md="2" className="pt-1 pt-md-1">
          {this.renderPictureView("My Other Pic 5")}
        </Col>
        <Col xs="12" md="1" className="pt-0 pt-md-0" />
      </Row>
    )
  }

  render() {
    const { contactInfo, emergencyInfo } = this.state;
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="contact-info-view-container">
          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
          <Panel title={"My Pictures"}>
            {this.renderMainPicturesView()}
            {this.renderOtherPicturesView()}
          </Panel>
          <Row>
            <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
            <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
              <Link to="/edit-profile">
                <RaisedButton label="Back to Build/Edit My Profile" primary={true}/>
              </Link>
            </Col>
          </Row>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentInfo } = state;
  return {
    auth,
    talentInfo: talentInfo.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPictures);
