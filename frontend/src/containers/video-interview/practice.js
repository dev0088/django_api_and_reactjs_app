import React from 'react';
import Webcam from 'react-webcam';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
  Alert,
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RecordRTC from 'recordrtc';
import DetectRTC from "detectrtc";

import * as videoActions from  '../../actions/videoActions';
import * as deviceActions from  '../../actions/deviceSettings';
import AudioMeter from "../../components/audio-meter/index";

import './styles.css';
import RecordCtl from "../../components/record-ctl/index";
import VideoPlayBack from "./play-back";
import apiConfig from '../../constants/api';
import { captureUserMedia } from '../../utils/appUtils';

const styles={ 
  floatingLabelStyle: {
    color: "#258df2",
  },
}
class VideoPractice extends React.Component {
  constructor() {
    super();

    this.state = {
      config: true,
      currentQuestion: 0,
      isStopped: false,
      isPlaying: false,
      isPlayBackOpen: false,
      alertOpen: false,
      errors: [],
      waitingTime: [30, 120],
      remainingTime: [30, 120],
      timePos: 0,

      src: null,
      recordVideo: null,
      uploadSuccess: null,
      uploading: false,
      settings: [],

      settingDlg: false,
      resolution: 1,
      frameRate: 0,
      bitRate: 0,
    };

  }

  componentWillMount() {
    let __this = this, detectError = [];
    DetectRTC.load(function() {
      // console.log(DetectRTC);

      if (!DetectRTC.hasWebcam)
      {
        __this.setState({ config: false, alertOpen: true })
        detectError.push("Video Camera isn't connected. Check your camera.");
      }else if (!DetectRTC.isWebsiteHasWebcamPermissions)
      {
        __this.setState({ config: false, alertOpen: true })
        detectError.push("Your website doesn't have camera permission."); 
      }
      if (!DetectRTC.hasMicrophone)
      {
        __this.setState({ config: false, alertOpen: true });
        detectError.push("Microphone isn't connected. Check your microphone.");
      }
      else if (!DetectRTC.isWebsiteHasMicrophonePermissions)
      {
        __this.setState({ config: false, alertOpen: true })
        detectError.push("Your website doesn't have microphone permission."); 
      }
      __this.setState({ errors: detectError });
      __this.requestUserMedia();
    });
    this.props.videoActions.getVideoQuestionsActions();
    this.props.videoActions.getVideoSettingsActions();
  }

  componentDidMount() {
    this.countDown();
  }

  componentWillReceiveProps(nextProps) {
    let { videoSettings, deviceSettings } = nextProps;
    let wait = [], remain = [];
    if (videoSettings['value']['video_interview_prep_countdown'])
      wait[0] = remain[0] = videoSettings['value']['video_interview_prep_countdown'];
    else
      wait[0] = remain[0] = 0;
    if (videoSettings['value']['video_interview_response_time'])
      wait[1] = remain[1] = videoSettings['value']['video_interview_response_time'];
    else
      wait[1] = remain[1] = 0;
    this.setState(
      { 
        waitingTime: wait, 
        remainingTime: remain,
        resolution: deviceSettings.resolution,
        frameRate: deviceSettings.frameRate,
        bitRate: deviceSettings.bitRate
      });
  }

  adjustSettings = () => {
    this.setState({ settingDlg: true });
  }

  handleDialogClose = () => {
    this.setState({ settingDlg: false });
  }

  handleResolutionChange = (event, index, resolution1) => {
    const { frameRate, bitRate } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution1, frameRate: frameRate, bitRate: bitRate}
    );
    this.setState({resolution: resolution1});
  }

  handleFrameChange = (event, index, frameRate1) => {
    const { resolution, bitRate } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate1, bitRate: bitRate}
    );
    this.setState({frameRate: frameRate1});
  }

  handleBitRateChange = (event, index, bitRate1) => {
    const { resolution, frameRate } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate, bitRate: bitRate1}
    );
    this.setState({bitRate: bitRate1});
  }

  countDown = () => {
    const { isStopped } = this.state;
    const __this = this;
    if (!isStopped)
    {
      setTimeout(function () {
        const { remainingTime, timePos } = __this.state;
        let isStopped1 = __this.state.isStopped;
        if (!isStopped1)
        {
          if (remainingTime[timePos] === 0) {
            if (timePos === 0) {
              __this.setState({timePos: 1});
            } else {
              __this.setState({isStopped: true});
            }
          } else {
            const newRemaining = [];
            newRemaining[0] = remainingTime[0];
            newRemaining[1] = remainingTime[1];
            newRemaining[timePos]= remainingTime[timePos] - 1;
            __this.setState({remainingTime: newRemaining});
          }
          __this.countDown();
        }
      }, 1000)
    }
  }

  requestUserMedia() {
    // console.log('requestUserMedia');
    captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
    });
  }

  onStopRecord = () => {
    const { remainingTime } = this.state;
    remainingTime[0] = remainingTime[1] = 0;
    this.setState({isStopped: true, isPlaying: false});
    this.videoRecordStop();
  };

  onStartRecord = () => {
    const { remainingTime } = this.state;
    remainingTime[0] = 0;
    this.setState({
        isStopped: false, 
        isPlaying: true, 
        timePos: 1, 
        remainingTime: remainingTime}, 
      function() {
        this.countDown();
        this.videoRecordStart();
      });
  };

  videoRecordStart = () => {
    let mimeType = "video/webm\;codecs=h264";
    if(this.isMimeTypeSupported('video/mpeg')) {
      mimeType = 'video/mpeg';
    }
    let options = {
      checkForInactiveTracks: false,
      disableLogs: false,
      getNativeBlob: false,
      ignoreMutedMedia: false,
      mimeType: mimeType,
      type: "video"
    }
    captureUserMedia((stream) => {
      this.state.recordVideo = RecordRTC(stream, options);
      this.state.recordVideo.startRecording();
    });
  }

  videoRecordStop = () => {
    let __this = this;
    this.state.recordVideo.stopRecording(() => {
      let name = "video_interview_" +  Math.floor(Math.random()*90000) + 10000 + ".mp4";
      let file = new File([this.state.recordVideo.blob], name, {type: "video/mp4", lastModified: Date.now()});
      __this.handleUploadInterviewVideos(file);
    });
  }

  isMimeTypeSupported = (mimeType) => {
    if(DetectRTC.browser.name === 'Edge' || 
      DetectRTC.browser.name === 'Safari' || 
      typeof MediaRecorder === 'undefined') {
        return false;
    }
    if(typeof MediaRecorder.isTypeSupported !== 'function') {
        return true;
    }

    return MediaRecorder.isTypeSupported(mimeType);
  }

  onNextQuestion = () => {
    const { remainingTime, waitingTime } = this.state;
    remainingTime[0] = waitingTime[0];
    remainingTime[1] = waitingTime[1];
    this.setState({
      isPlayBackOpen: false,
      currentQuestion: this.state.currentQuestion + 1,
      isStopped: false,
      isPlaying: false,
      timePos: 0
    }, function() {
      this.countDown();
    });
  };

  onBack = () => {
    const { remainingTime, waitingTime } = this.state;
    remainingTime[0] = waitingTime[0];
    remainingTime[1] = waitingTime[1];
    this.setState({
      isPlayBackOpen: false,
      currentQuestion: 0,
      isStopped: false,
      isPlaying: false,
      timePos: 0
    }, function() {
      this.countDown();
    });
  };

  openPlayBack = () => {
    this.setState({isPlayBackOpen: true});
  }

  handleAlertClose = () => {
    this.setState({alertOpen: false});
  }

  handleAlertRefresh = () => {
    window.location.reload();
  }

  handleUploadInterviewVideos = (file) => {
    // Upload video files
    const {user_id} = this.props.auth.access;
    const signAPI = `${apiConfig.url}/talent_video/upload/${user_id}/interview/policy/`
    const completeAPI = `${apiConfig.url}/talent_video/upload/${user_id}/interview/complete/`
    this.setState({ uploading: true });
    this.uploadToS3(signAPI, completeAPI, file)
  }

  uploadToS3 = (signAPI, completeAPI, file) => {
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
        // console.log('error: ', response.error)
        this.onError(file)
      }
      else {
        if (response.signedUrl){
          // console.log('success: ', response, response.signedUrl)
          this.uploadFile(response.signedUrl, completeAPI, response.fileID, file)
        } else {
          // console.log('error: ', response)
          this.onError(file)
        }
      }
    })
    .catch(error => {
      // console.log('error: ', error)
      this.onError(file)
    })
  }

  onError = (file) => {
    // console.log('==== Error: ', file)
    this.setState({uploading: false});
  }

  onFinish = (completeAPI, fileID, file, response) => {
    let __this = this;
    let params = {
      fileID: fileID, 
      fileSize: file.size,
      fileType: file.type,
    }
    let url_parse = response.url.split("?");
    let s3_url = url_parse[0];
    __this.setState({ uploading: false, src: s3_url });
    fetch(completeAPI, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(response => response.json())
    .then(response => {
      if(response.error) {
        // console.log('error: ', response.error)
      }
      else {
        
      }
    })
    .catch(error => {
      this.setState({uploading: false});
      // console.log('error: ', error)
    })
  }

  uploadFile = (s3PutUrl, completeAPI, fileID, file) => {
    // Get signedUrl 
    // var that = this;
    fetch(s3PutUrl, {
      method: 'put',
      // contentType: file.type,
      headers: {
        'x-amz-acl': 'public-read',
        'Content-Type': file.type,
      },
      body: file
    })
    .then(response => {
      if(response.error) {
        // console.log('=== uploadFile: error: ', response.error)
        this.onError(fileID, file)
      }
      else {
        // console.log('== uploadFile: success: ', response)
        this.onFinish(completeAPI, fileID, file, response)
      }
    })
    .catch(error => {
      // console.log('== uploadFile: error: ', error)
      this.onError(fileID, file)
    })
  }

  showSpinner = (b) => {
    return b ? (<div className="spinner">
                  <div className="loading_text">
                    <div className="loading"></div>
                    Uploading now... Please wait for a while.
                  </div>
                </div>) : null;
  }

  render () {
    const selectItemStyle = {
      'whiteSpace': 'preWrap'
    }
    const { 
      config, 
      errors, 
      currentQuestion, 
      isStopped,
      isPlaying,
      isPlayBackOpen, 
      waitingTime, 
      remainingTime,
      timePos,
      src,
      uploading,

      settingDlg,
      resolution,
      frameRate,
      bitRate,
    } = this.state;
    const { videoQuestions } = this.props;
    let question = "";
    const actions = [
      <FlatButton
        label="Refresh"
        primary={true}
        onClick={this.handleAlertRefresh}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleAlertClose}
      />,
    ];
    const settingsAction = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDialogClose}
      />,
    ];
    if (videoQuestions && videoQuestions.value && videoQuestions.value.length > 0)
      question = videoQuestions.value[currentQuestion]['content'];
    return config ? (<div className="video-practice">
        {this.showSpinner(uploading)}
        <div className="video-interview-header">
          <h3>
            <span className="pull-left">Question {currentQuestion + 1} of 5</span>
            <span className="pull-right">Video Interview for Practice</span>
          </h3>
        </div>

        {!isPlayBackOpen && videoQuestions && videoQuestions.isFetched &&
        <React.Fragment>
          <div className="row">
            <div className="col-sm-12 question-box">
                <p className="question-header text-center">{question}</p>
            </div>
          </div>
          <div className="video-box flex-column">
            <div className="row video-status">
              <div className="col-sm-6">
                <p>Question Time: <b>{remainingTime[1]} second(s)</b></p>
              </div>
              <div className="col-sm-6">
                <p>Preparation Limit: <b>{remainingTime[0]} second(s)</b></p>
              </div>
            </div>
            <div className="row video-webcam"> 
              <div className="audio-box">
                <AudioMeter/>
              </div>
              <Webcam height="420" width="100%"/>
              <div className="video-progress">
                <RecordCtl
                  remaining={remainingTime[timePos]}
                  total={waitingTime[timePos]}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
        }
        { !isPlayBackOpen && 
          (<div className="col-md-12 playbackbtn-wrapper">
            { (!isPlaying && !isStopped && (
                <RaisedButton
                  label={'Start Recording'}
                  className="btn-start-start"
                  onClick={this.onStartRecord}
                  primary={true}
                />
              ))
            }
            {
              ((isPlaying && !isStopped) && (
                <RaisedButton
                  label={'Stop Recording'}
                  className="btn-start-stop"
                  onClick={this.onStopRecord}
                />
              ))
            }
            {isStopped &&
              <RaisedButton
                label="Play Back"
                className="btn-playback"
                onClick={this.openPlayBack}
                primary={true}
              />
            }
          </div>)
        }

        {isPlayBackOpen &&  // Show playback.
          <VideoPlayBack
            url={src}
            currentQuestion={currentQuestion}
            onSettings={this.adjustSettings}
            onNext={this.onNextQuestion}
            onBack={this.onBack}
          />
        }
        <Dialog
          actions={settingsAction}
          title="Video and Audio Settings"
          modal={false}
          open={settingDlg}
          onRequestClose={this.handleDialogClose}
        >
          <SelectField
            floatingLabelText="Resolutions"
            floatingLabelStyle={styles.floatingLabelStyle}
            className="dlg-select"
            value={resolution}
            onChange={this.handleResolutionChange}
            menuItemStyle={selectItemStyle}
          >
            <MenuItem value={1} primaryText="Default" />
            <MenuItem value={2} primaryText="1080p" />
            <MenuItem value={3} primaryText="720p" />
            <MenuItem value={4} primaryText="480p" />
          </SelectField>
          <SelectField
            floatingLabelText="FrameRate"
            floatingLabelStyle={styles.floatingLabelStyle}
            className="dlg-select"
            value={frameRate}
            onChange={this.handleFrameChange}
            menuItemStyle={selectItemStyle}
          >
            <MenuItem value={0} primaryText="Default" />
            <MenuItem value={5} primaryText="5 fps" />
            <MenuItem value={15} primaryText="15 fps" />
            <MenuItem value={24} primaryText="24 fps" />
            <MenuItem value={30} primaryText="30 fps" />
            <MenuItem value={60} primaryText="60 fps" />
          </SelectField>
          <SelectField
            floatingLabelText="Media BitRate"
            floatingLabelStyle={styles.floatingLabelStyle}
            className="dlg-select"
            value={bitRate}
            onChange={this.handleBitRateChange}
            menuItemStyle={selectItemStyle}
          >
            <MenuItem value={0} primaryText="Default" />
            <MenuItem value={8000000000} primaryText="1 GB bps" />
            <MenuItem value={800000000} primaryText="100 MB bps" />
            <MenuItem value={8000000} primaryText="1 MB bps" />
            <MenuItem value={800000} primaryText="100 KB bps" />
            <MenuItem value={8000} primaryText="1 KB bps" />
            <MenuItem value={800} primaryText="100 Bytes bps" />
          </SelectField>
        </Dialog>
      </div>) : (<div className="video-black">
        <Dialog
          title="Error"
          actions={actions}
          modal={false}
          open={this.state.alertOpen}
          onRequestClose={this.handleAlertClose}
        >
          <Alert color="danger">Error</Alert>
          {
            errors.map((error, index) => {
              return (<p key={index}>{error}</p>);
            })
          }
        </Dialog>
      </div>)
  }
}

function mapStateToProps(state) {
  const { auth, videoQuestions, videoSettings, deviceSettings } = state;
  // let vq = {value: ["aaa", "bbb"], isFetched: true};
  return {
    auth: auth,
    videoQuestions: videoQuestions,
    videoSettings: videoSettings,
    deviceSettings: deviceSettings,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    videoActions: bindActionCreators(videoActions, dispatch),
    deviceActions: bindActionCreators(deviceActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoPractice);