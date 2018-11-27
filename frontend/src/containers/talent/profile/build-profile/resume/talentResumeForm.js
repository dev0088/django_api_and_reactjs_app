import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Request from 'superagent';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClearRounded from '@material-ui/icons/ClearRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import ImageLoader from 'react-loading-image';
import ImageLightbox from 'react-image-lightbox';
import Panel from 'components/general/panel'
import apiConfig from 'constants/api';
import TalentAPI from 'apis/talentAPIs';
import * as talentActions from 'actions/talentActions';
import styles from 'styles';
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
      openImageModal: false,
      progressPercent: 0.0,
      progressing: false,
    }
    this.onFinish = this.onFinish.bind(this)
  }

  getInfoFromProps(props) {
    const { talentInfo } = props

    let resume = {}
    let progressPercent = 0.0
    let progressing = false

    if (talentInfo && talentInfo.user && talentInfo.talent_resume) {
      // Get nationality info
      resume = talentInfo.talent_resume[0]
    }

    return {
      resume,
      progressPercent,
      progressing,
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

    this.setState({
      progressing: true
    }, () => {
      this.signAndUploadToS3(signAPI, completeAPI, generatePreviewAPI, file)
    })
  }

  signAndUploadToS3 = (signAPI, completeAPI, generatePreviewAPI, file) => {
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
            this.uploadToS3(
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

  uploadToS3 = (s3PutUrl, completeAPI, generatePreviewAPI, fileID, file) => {
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
          this.onFinish(completeAPI, generatePreviewAPI, fileID, file)
        }
      })
  }

  onProgress = (percent) => {
    this.setState({ progressPercent: percent })
  }

  doneUploadingProgress = () => {
    this.setState({
      progressing: false,
      progressPercent: 0
    })
  };

  onError = (file) => {
    console.log('==== Error: ', file)
    this.doneUploadingProgress()
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
          this.onError(file, response.error)
        }
        else {
          // Update resume from server
          this.uploadToS3ToServerToGetPreviewImage(generatePreviewAPI, fileID, file)
        }
      })
      .catch(error => {
        console.log('error: ', error)
        this.onError(file, error)
      })
  }

  uploadToS3ToServerToGetPreviewImage(generatePreviewAPI, fileID, file) {

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
          this.onError(file, response.error)
        }
        else {
          // Update resume from server
          this.props.talentActions.getCurrentTalentInfo()
          this.doneUploadingProgress()
        }
      })
      .catch(error => {
        console.log('error: ', error)
        this.onError(file, error)
      })
  }

  deleteResume = () => {
    const { resume } = this.state
    TalentAPI.deleteResume(resume.id, this.handleDeleteResponse)
  };

  handleDeleteResponse = () => {
    this.props.talentActions.getCurrentTalentInfo()
  };

  showImage = (picture) => {
    const { resume } = this.state
    const haveResume = resume && resume.url && resume.uploaded && resume.active && resume.preview_path

    if (haveResume) {
      this.setState({
        openImageModal: true
      })
    }
  };

  onInputChange = e => {
    const { currentTarget: { files } } = e;
    if (files[0]) {
      this.setState({file: files[0]});
    }
  };

  renderContents() {
    const { contentTitle, classes } = this.props
    const { resume, openImageModal, progressing, progressPercent } = this.state
    const haveResume = resume && resume.url && resume.uploaded && resume.active && resume.preview_path

    return (
      <Panel title={contentTitle}>
        <Row className="profile-picture-image-container">
          <Col xs="12" md="12" className="pt-3 pt-md-3 profile-picture-image-col">
            {
              progressing ? (
                <CircularProgress className={classes.talentProfileVideoGreetingImage}/>
              ) : (
                <div>
                  <div onClick={() => this.showImage()}>
                    <ImageLoader
                      className="profile-resume-image"
                      src={
                        haveResume
                          ? `${apiConfig.server}/${resume.preview_path}`
                          : require('images/missing.png')
                      }
                      loading={() => <div className={classes.talentProfileVideoGreetingImage}>Loading...</div>}
                      error={() => <div>Error</div>} />
                  </div>
                  <div>
                    { haveResume && (
                      <Button
                        variant="contained"
                        color="secondary"
                        aria-label="Edit"
                        className={classes.talentProfileResumeDeleteButton}
                        onClick={this.deleteResume}
                      >
                        <ClearRounded style={{fontSize: '20px'}}/>
                      </Button>
                    )}
                  </div>
                  { openImageModal &&(
                    <ImageLightbox
                      mainSrc={resume.preview_path}
                      onCloseRequest={() => this.setState({ openImageModal: false })}
                    />
                  )}
                </div>
              )}
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
            { progressPercent > 0 ? (
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
            )}
          </Col>
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyResume));
