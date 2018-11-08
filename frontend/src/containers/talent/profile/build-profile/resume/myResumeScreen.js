import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ClearRounded from '@material-ui/icons/ClearRounded';
import Dropzone from 'react-dropzone';
import ImageLoader from 'react-loading-image';
import ImageLightbox from 'react-image-lightbox';
import Panel from 'components/panel'
import apiConfig from 'constants/api';
import TalentAPI from 'apis/talentAPIs';
import * as talentActions from 'actions/talentActions';

import 'react-image-lightbox/style.css';
import './myResumeScreen.css';

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

class MyResume extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resume: {},
      file: null,
			openImageModal: false
    }
  }

  getInfoFromProps(props) {
    const {
      talentInfo
    } = props

    let resume = {}

    if (talentInfo && talentInfo.user && talentInfo.talent_resume) {
      // Get nationality info
      resume = talentInfo.talent_resume[0]
    }

    return {
      resume
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

  handleUploadResume = (files) => {
    // Upload pdf files
    let file = files[0]
    const {user_id} = this.props.auth.access
    const signAPI = `${apiConfig.url}/talent_resume/upload/${user_id}/policy/`
    const completeAPI = `${apiConfig.url}/talent_resume/upload/${user_id}/complete/`
    const generatePreviewAPI = `${apiConfig.url}/talent_resume/upload/${user_id}/generate_preview/`

    this.uploadToS3(signAPI, completeAPI, generatePreviewAPI, file)
  }

  uploadToS3 = (signAPI, completeAPI, generatePreviewAPI, file) => {
    const params = {
      objectName: file.name,
      contentType: file.type
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
          this.uploadFile(
            response.signedUrl,
            completeAPI,
            generatePreviewAPI,
            response.fileID,
            file)
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

  uploadFile = (s3PutUrl, completeAPI, generatePreviewAPI, fileID, file) => {
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
        this.onFinish(completeAPI, generatePreviewAPI, fileID, file)
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

  onFinish = (completeAPI, generatePreviewAPI, fileID, file) => {
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
        // Update resume from server
        // this.props.talentActions.getCurrentTalentInfo()
        this.uploadFileToServerToGetPreviewImage(generatePreviewAPI, fileID, file)
      }
    })
    .catch(error => {
      console.log('error: ', error)
    })
  }

  uploadFileToServerToGetPreviewImage(generatePreviewAPI, fileID, file) {

    let data = new FormData();
    console.log('=== file: ', file, file.name)
    data.append('file', file)
    data.append('fileName', file.name)
    data.append('fileID', fileID)

    fetch(generatePreviewAPI, {
      method: 'put',
      headers: {
        // "Content-Type": file.type
        // 'content-type': 'multipart/form-data'
      },
      body: data
    }).then(response => response.json())
    .then(response => {
      if(response.error) {
        console.log('error: ', response.error)
      }
      else {
        // Update resume from server
        this.props.talentActions.getCurrentTalentInfo()
      }
    })
    .catch(error => {
      console.log('error: ', error)
    })
  }

  deleteResume = () => {
    const { resume } = this.state
    TalentAPI.deleteResume(resume.id, this.handleDeleteResponse)
  }

  handleDeleteResponse = () => {
    this.props.talentActions.getCurrentTalentInfo()
  }

	showImage = (picture) => {
    this.setState({
      openImageModal: true
    })
  }

  renderResumeView(caption) {
    const {
      resume,
			openImageModal
    } = this.state

    return (
      <div>
        <Row className="profile-picture-image-container">
          <Col xs="12" md="12" className="pt-3 pt-md-3 profile-picture-image-col">
            {(resume && resume.url && resume.uploaded && resume.active && resume.preview_path) ?
              (
                <div onClick={() => this.showImage()}>
                  <ImageLoader
                    className="profile-resume-image"
                    src={`${apiConfig.server}/${resume.preview_path}`}
                    loading={() => <div className="profile-resume-image">Loading...</div>}
                    error={() => <div>Error</div>} />
                  <div onClick={() => this.deleteResume()}>
                    <ClearRounded className="profile-resume-delete-icon" color="seconday" />
                  </div>
									{openImageModal && (
										<ImageLightbox
											mainSrc={resume.preview_path}
											onCloseRequest={() => this.setState({ openImageModal: false })}
										/>
									)}
                </div>
              ) : (
                <div>
									<ImageLoader
										className="profile-resume-image"
										src={'../images/missing.png'}
										loading={() => <div className="profile-resume-image">None image</div>}
										error={() => <div>Error</div>} />
                  <div>
                    <ClearRounded className="profile-resume-delete-icon-disabled" color="seconday" />
                  </div>
                </div>
              )
            }
          </Col>
        </Row>
        <Row className="profile-picture-image-container">
          <Col xs="12" md="12" className="pt-3 pt-md-3 profile-picture-image-col">
            <div className="profile-picture-image-title">
              {"Current Uploaded Resume"}
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
                onDrop={ (files) => this.handleUploadResume(files) }
                size={ 150 }
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain ">
                <div className="profile-picture-dropzone-description">
                  {`To upload or change Drop resume here`}
                </div>
                <div className="profile-picture-dropzone-select-file-button">
                  {`OR SELECT FILE`}
                </div>
                <div className="profile-picture-dropzone-description">
                  {`Supported File Types: PDF, TXT, DOC, DOCX`}
                </div>
              </Dropzone>
          </Col>
        </Row>
      </div>
    )
  }

  onInputChange = e => {
    const { currentTarget: { files } } = e;
    if (files[0]) {
      this.setState({file: files[0]});
    }
  }

  renderResumeViewWithFilePreview() {
    const {
      file
    } = this.state
    return (
      <div>
        <Row className="profile-picture-image-container">
          <Col xs="12" md="12" className="pt-3 pt-md-3 profile-picture-image-col">
            <input type="file" onChange={this.onInputChange} />
            { (file && file.url && file.preview_path) ? (
                <div>
                  <ImageLoader
                    className="profile-picture-image"
                    src={file.preview_path}
                    loading={() => <div className="profile-picture-image">Loading...</div>}
                    error={() => <div>Error</div>} />
                  <div onClick={() => this.deleteResume()}>
                    <ClearRounded className="profile-picture-delete-icon" color="seconday" />
                  </div>
                </div>
              ) : (
                <div>
									<ImageLoader
										className="profile-picture-image"
										src={'../images/missing.png'}
										loading={() => <div className="profile-picture-image">None image</div>}
										error={() => <div>Error</div>} />
                  <div>
                    <ClearRounded className="profile-picture-delete-icon-disabled" color="disabled" />
                  </div>
                </div>
              )
            }
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="contact-info-view-container">
          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
          <Panel title={"My Resume"}>
            {this.renderResumeView()}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyResume);
