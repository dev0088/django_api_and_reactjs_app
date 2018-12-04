import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Request from 'superagent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ClearRounded from '@material-ui/icons/ClearRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Panel from 'components/general/panel'
import Spacer from 'components/general/spacer';
import * as talentActions from 'actions/talentActions';
import TalentAPI from 'apis/talentAPIs';
import apiConfig from 'constants/api';
import Dropzone from 'react-dropzone';
import ImageLoader from 'react-loading-image';
import ImageLightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';
import './myPicturesScreen.css';
import {styles} from 'styles.js';

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

class TalentPicturesForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      currentPicture: null,
      openImageModal: false,
      progressPercent: 0.0,
      progressing: false,
      progressingCaption: null
    }
    this.onFinish = this.onFinish.bind(this)
  }

  getInfoFromProps(props) {
    const {
      talentInfo
    } = props

    let pictures = []
    let progressPercent = 0.0
    let progressing = false
    let  progressingCaption = null

    if (talentInfo && talentInfo.user) {
      // Get nationality info
      pictures = talentInfo.talent_pictures
    }

    return {
      pictures,
      progressPercent,
      progressing,
      progressingCaption
    }
  }

  componentWillMount() {
    this.props.talentActions.getCurrentTalentInfo()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  handleUploadMyPictures = (files, caption, priority) => {
    // Upload image files
    let file = files[0]
    const {user_id} = this.props.auth.access
    const signAPI = `${apiConfig.url}/talent_picture/upload/${user_id}/policy/`
    const completeAPI = `${apiConfig.url}/talent_picture/upload/${user_id}/complete/`

    this.setState({
      progressing: true,
      progressingCaption: caption
    }, () => {
      this.signAndUploadToS3(signAPI, completeAPI, file, caption, priority)
    })
  }

  signAndUploadToS3 = (signAPI, completeAPI, file, caption, priority) => {
    const params = {
      objectName: file.name,
      contentType: file.type,
      caption: caption,
      priority: priority ? priority : 0
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
            this.uploadToS3(response.signedUrl, completeAPI, response.fileID, file)
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

  uploadToS3 = (s3PutUrl, completeAPI, fileID, file) => {
    Request.put(s3PutUrl)
      .set("Content-Type", file.type)
      .set("x-amz-acl", 'public-read')
      .send(file)
      .on('progress', function(e) {
        this.onProgress(e.percent);
      }.bind(this))
      .end((err, res) => {
        if (err) {
          this.onError(fileID, file)
        } else {
          this.onFinish(completeAPI, fileID, file)
        }
      })
  }

  onProgress = (percent) => {
    this.setState({ progressPercent: percent })
  }

  doneUploadingProgress = () => {
    this.setState({
      progressing: false,
      progressPercent: null
    })
  };

  onError = (file) => {
    console.log('==== Error: ', file)
    this.doneUploadingProgress()
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
          this.props.talentActions.getCurrentTalentInfo()
          this.doneUploadingProgress()
        }
      })
      .catch(error => {
        console.log('error: ', error)
      })
  }

  showImage = (picture) => {
    const havePicture = picture && picture.url && picture.uploaded && picture.active

    if (havePicture) {
      this.setState({
        currentPicture: picture,
        openImageModal: true
      })
    }
  }

  deleteImage = (picture) => {
    TalentAPI.deletePicture(picture.id, this.handleDeleteResponse)
  }

  handleDeleteResponse = (response, failed) => {
    this.props.talentActions.getCurrentTalentInfo()
  }

  renderPictureView(caption, priority) {
    const { pictures, progressing, progressPercent, progressingCaption } = this.state
    const { classes } = this.props

    let picture = pictures.find(function(picture) {
      return (picture.caption === caption);
    });
    const havePicture = picture && picture.url && picture.uploaded && picture.active
    const isOwnerPicture = progressingCaption === caption

    return (
      <div>
        <Row>
          <Col xs="12" md="12" className="pt-3 pt-md-3 profile-picture-image-col">
            {
              progressing && isOwnerPicture ? (
                <CircularProgress className={classes.talentProfileVideoGreetingImage}/>
              ) : (
                <div>
                  <div onClick={() => this.showImage(picture)}>
                    <ImageLoader
                      className="profile-picture-image"
                      src={havePicture ? picture.url : require('images/missing.png')}
                      loading={() => <div className={classes.talentProfileVideoGreetingImage}>Loading...</div>}
                      error={() => <div>Error</div>}
                    />
                  </div>
                  <div>
                    { havePicture ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        aria-label="Edit"
                        className={classes.talentProfilePictureDeleteButton}
                        onClick={() => this.deleteImage(picture)}
                      >
                        <ClearRounded style={{fontSize: '20px'}}/>
                      </Button>
                    ) : (
                      <div className={classes.talentProfilePictureEmpty} />
                    )}
                  </div>
                </div>
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
            {progressPercent && isOwnerPicture > 0 ? (
              <div>
                <LinearProgress
                  variant="determinate"
                  className={classes.uploadProgressBar}
                  value={progressPercent}
                />
                <Typography
                  gutterBottom
                  variant='Subheading'
                  className={classes.talentProfileVideoUploadingText}
                >
                  {`Uploading (${progressPercent.toFixed(0)} %) ... `}
                </Typography>
              </div>
            ) : (
              <Dropzone
                className="profile-picture-dropzone"
                onDrop={(files) => this.handleUploadMyPictures(files, caption, priority)}
                size={150}
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
            )}
          </Col>
        </Row>
      </div>
    )
  }

  renderMainPicturesView() {
    return (
      <Row className="profile-gender-row">
        <Col sm="12" md="0" lg="0" xl="1" className="pt-0 pt-md-0" />
        <Col sm="12" md="6" lg="4" xl="3" className="pt-0 pt-md-0">
          {this.renderPictureView("My Current Headshot", 0)}
        </Col>
        <Col sm="12" md="6" lg="4" xl="4" className="pt-0 pt-md-0">
          {this.renderPictureView("My Current Body Shot 1", 1)}
        </Col>
        <Col sm="12" md="6" lg="4" xl="3" className="pt-0 pt-md-0">
          {this.renderPictureView("My Current Body Shot 2", 2)}
        </Col>
        <Col sm="12" md="0" lg="0" xl="1" className="pt-0 pt-md-0" />
      </Row>
    )
  }

  renderOtherPicturesView() {
    return (
      <Row className="profile-gender-row">
        <Col sm="12" md="0" lg="0" xl="0" className="pt-0 pt-md-0" />
        <Col sm="12" md="6" lg="4" xl="2" className="pt-1 pt-md-1">
          {this.renderPictureView("My Other Pic 1", 3)}
        </Col>
        <Col sm="12" md="6" lg="4" xl="3" className="pt-1 pt-md-1">
          {this.renderPictureView("My Other Pic 2", 4)}
        </Col>
        <Col sm="12" md="6" lg="4" xl="2" className="pt-1 pt-md-1">
          {this.renderPictureView("My Other Pic 3", 5)}
        </Col>
        <Col sm="12" md="6" lg="4" xl="3" className="pt-1 pt-md-1">
          {this.renderPictureView("My Other Pic 4", 6)}
        </Col>
        <Col sm="12" md="6" lg="4" xl="2" className="pt-1 pt-md-1">
          {this.renderPictureView("My Other Pic 5", 7)}
        </Col>
        <Col sm="12" md="0" lg="0" xl="0" className="pt-0 pt-md-0" />
      </Row>
    )
  }

  renderContents() {
    const { contentTitle } = this.props
    const { currentPicture, openImageModal } = this.state;

    return (
      <Panel title={contentTitle}>
        {this.renderMainPicturesView()}
        <Spacer size={20} />
        <Divider />
        <Spacer size={10} />
        {this.renderOtherPicturesView()}
        {openImageModal && (
          <ImageLightbox
            mainSrc={currentPicture.url}
            onCloseRequest={() => this.setState({ openImageModal: false })}
          />
        )}
      </Panel>
    )
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        {this.renderContents()}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentPicturesForm));
