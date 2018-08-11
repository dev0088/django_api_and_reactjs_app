import React from 'react';
import Webcam from 'react-webcam';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import {
  Alert,
  Row,
  Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RecordRTC from 'recordrtc';
import DetectRTC from "detectrtc";

import * as talentActions from  '../../actions/talentActions';
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
const resolutionSize = {
  1: [],
  2: [1920, 1080],
  3: [1280, 720],
  4: [640, 480]
}
const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#40c741',
    },
    secondary: {
      main: '#C00'
    }
  }
})
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
      selectedAudio: "",
      selectedVideo: "",
      audioDevices: [],
      videoDevices: [],
    };

  }

  componentWillMount() {
    let __this = this, detectError = [];
    let { deviceSettings } = this.props;
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
      __this.setState({ 
          resolution: deviceSettings.resolution,
          frameRate: deviceSettings.frameRate,
          bitRate: deviceSettings.bitRate,
          selectedAudio: deviceSettings.audio,
          selectedVideo: deviceSettings.video,
        }, function(){
          __this.requestUserMedia();
        })
    });
    const { pageId } = this.props.match.params;
    this.props.videoActions.getVideoQuestionsActions(pageId, 'practice');
    this.props.videoActions.getVideoSettingsActions();
  }

  componentDidMount() {
    let __this = this;
    setTimeout(function() {
      let { access } = __this.props.auth;
      if (access.user_id){
        __this.props.talentActions.getTalentInfo(access.user_id);
      }
    }, 400);
    this.countDown();
  }

  componentWillReceiveProps(nextProps) {
    let { videoSettings } = nextProps;
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
      });
  }

  adjustSettings = () => {
    let __this = this;
    let aDevice = [], vDevice = [];
    navigator.mediaDevices.enumerateDevices()
      .then(gotDevices)
      .catch(errorCallback);
    function gotDevices(deviceInfos) {
      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var obj = {};
        obj.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput') {
          obj.text = deviceInfo.label || 'Microphone ' + i;
          aDevice.push(obj);
        } else if (deviceInfo.kind === 'videoinput') {
          obj.text = deviceInfo.label || 'Camera ' + i;
          vDevice.push(obj);
        }
      }
      if (__this.state.selectedAudio === "" && aDevice.length > 0)
        __this.setState({ selectedAudio: aDevice[0].value });
      if (__this.state.selectedVideo === "" && vDevice.length > 0)
        __this.setState({ selectedVideo: vDevice[0].value });
      __this.setState({ 
        audioDevices: aDevice, 
        videoDevices: vDevice
      }, function() {
        __this.setState({ settingDlg: true });
      });
    }
    function errorCallback(error) {
      __this.setState({ audioDevices: [], videoDevices: [], selectedAudio: 0, selectedVideo: 0 }, function() {
        __this.setState({ settingDlg: true });
      });
    }
  }

  handleDialogClose = () => {
    this.setState({ settingDlg: false });
  }

  handleResolutionChange = (event, index, resolution1) => {
    const { frameRate, bitRate, selectedAudio, selectedVideo } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution1, frameRate: frameRate, bitRate: bitRate, audio: selectedAudio, video: selectedVideo}
    );
    this.setState({resolution: resolution1});
  }

  handleFrameChange = (event, index, frameRate1) => {
    const { resolution, bitRate, selectedAudio, selectedVideo } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate1, bitRate: bitRate, audio: selectedAudio, video: selectedVideo}
    );
    this.setState({frameRate: frameRate1});
  }

  handleBitRateChange = (event, index, bitRate1) => {
    const { resolution, frameRate, selectedAudio, selectedVideo } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate, bitRate: bitRate1, audio: selectedAudio, video: selectedVideo}
    );
    this.setState({bitRate: bitRate1});
  }

  handleAudioChange = (event, index, audio) => {
    const { resolution, frameRate, bitRate, selectedVideo } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate, bitRate: bitRate, audio: audio, video: selectedVideo}
    );
    this.setState({selectedAudio: audio});
  }
  handleVideoChange = (event, index, video) => {
    const { resolution, frameRate, bitRate, selectedAudio } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate, bitRate: bitRate, audio: selectedAudio, video: video}
    );
    this.setState({selectedVideo: video});
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
              let newRemaining = [];
              newRemaining[0] = remainingTime[0];
              newRemaining[1] = remainingTime[1] - 1;
              __this.videoRecordStart();
              __this.setState({ timePos: 1, isStopped: false, isPlaying: true, remainingTime: newRemaining });
            } else {
              __this.setState({ isStopped: true });
              __this.videoRecordStop();
            }
          } else {
            let newRemaining = [];
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
    const { resolution, frameRate, selectedAudio, selectedVideo } = this.state;
    let options = {mandatory: {}};
    if (selectedAudio !== "")
    {
      options["audio"] = {deviceId: {exact: selectedAudio}};
    }
    if (selectedVideo !== "")
    {
      options["video"] = {deviceId: {exact: selectedVideo}};
    }
    if (resolution !== 1 ){
      options['mandatory']['minWidth'] = resolutionSize[resolution][0];
      options['mandatory']['minHeight'] = resolutionSize[resolution][1];
    }
    if (frameRate !== 0){
      options['mandatory']['minFrameRate'] = frameRate;
    }
    captureUserMedia(options, (stream) => {
      try {
        this.setState({ src: stream });
      }
      catch(error) {
        this.setState({ src: window.URL.createObjectURL(stream) });
      }
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
    let __this = this;
    if(this.isMimeTypeSupported('video/mpeg')) {
      mimeType = 'video/mpeg';
    }
    const { resolution, frameRate, bitRate, selectedAudio, selectedVideo } = this.state;
    let options = {mandatory: {}};
    let rtcOptions = {
      checkForInactiveTracks: false,
      disableLogs: false,
      getNativeBlob: false,
      ignoreMutedMedia: false,
      mimeType: mimeType,
      type: "video"
    }
    if (selectedAudio !== "")
    {
      options["audio"] = {deviceId: {exact: selectedAudio}};
    }
    if (selectedVideo !== "")
    {
      options["video"] = {deviceId: {exact: selectedVideo}};
    }
    if (resolution !== 1 ){
      options['mandatory']['minWidth'] = resolutionSize[resolution][0];
      options['mandatory']['minHeight'] = resolutionSize[resolution][1];
    }
    if (frameRate !== 0){
      options['mandatory']['minFrameRate'] = frameRate;
    }
    if (bitRate !== 0)
      rtcOptions['videoBitsPerSecond'] = bitRate;
    captureUserMedia(options, (stream) => {
      __this.setState({recordVideo: RecordRTC(stream, rtcOptions)}, function() {
        __this.state.recordVideo.startRecording();
      })
    });
  }

  videoRecordStop = () => {
    let __this = this;
    if (this.state.recordVideo)
    {
      this.state.recordVideo.stopRecording(() => {
        let name = "video_interview_" +  Math.floor(Math.random()*90000) + 10000 + ".mp4";
        let file = new File([this.state.recordVideo.blob], name, {type: "video/mp4", lastModified: Date.now()});
        __this.handleUploadInterviewVideos(file);
      });
    }
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
    const { videoQuestions } = this.props
    const { currentQuestion } = this.state
    const params = {
      objectName: file.name,
      contentType: file.type,
      position_type: 'Practice',
      position_sub_type: '',
      question: videoQuestions.value[currentQuestion]['content']
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
                    Uploading - Please Wait
                  </div>
                </div>) : null;
  }

  renderStarAndStopRecordButton () {
    const { isPlayBackOpen, isPlaying, isStopped } = this.state

    if (isPlayBackOpen) {
      return (<div />)
    } else {
      return (
        <div className="col-md-12 playbackbtn-wrapper">
          <MuiThemeProvider theme={theme}>

          { (!isPlaying && !isStopped && (
              <Button 
                variant="contained" 
                color="primary" className='btn-start-start'
                fullWidth={true}
                onClick={this.onStartRecord}>
               {'Start Recording'}
              </Button>
            ))
          }
          {
            ((isPlaying && !isStopped) && (
              <Button 
                variant="contained" 
                color="secondary" className='btn-start-stop'
                fullWidth={true}
                onClick={this.onStopRecord}>
               {'Stop Recording'}
              </Button>
            ))
          }
          </MuiThemeProvider>
        </div>
      )
    }
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
      audioDevices, 
      videoDevices, 
      selectedAudio, 
      selectedVideo, 
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
    const { talentInfo } = this.props;
    let positionName = "";
    if (talentInfo.value){
      const { talent_position_sub_type } = talentInfo.value;
      if (talent_position_sub_type)
        positionName = talent_position_sub_type.talent_position_type.toLowerCase();
    }

    if (videoQuestions && videoQuestions.value && videoQuestions.value.length > 0)
      question = videoQuestions.value[currentQuestion]['content'];
    return config ? (<div className="video-practice">
        {this.showSpinner(uploading)}

        {!isPlayBackOpen && videoQuestions && videoQuestions.isFetched &&
        <React.Fragment>
          <Row>
            <Col xs="12" md="1" className="pt-6 pt-md-0"/>
            <Col xs="12" md="4" className="pt-6 pt-md-0">
              <div className="video-interview-header">
                <h3>
                  <span className="pull-left"><b>Practice Question {currentQuestion + 1} of 5</b></span>
                </h3>
              </div>
              <p className="question-text">{question}</p>
            </Col>
            <Col xs="12" md="1" className="pt-6 pt-md-0"/>
            <Col xs="12" md="5" className="pt-6 pt-md-0">
              <div className="">
                <Row className="question-time-title-row">
                  <div className="question-time">
                      Qeustion Time: 2 minutes
                  </div>
                </Row>
                <Row className="video-status">
                  <Col className="col-sm-9 question-time-title-parent-col">
                    <Row>
                      <Col className="col-sm-4 question-time-col">
                        {
                          remainingTime[0] > 0 ? (
                            <div>
                              <p>Prep Countdown: </p>
                              <p><b>{remainingTime[0]} second(s)</b></p>
                            </div>
                          ) : (
                            <div>
                              <p>Response Time: </p>
                              <p><b>{remainingTime[1]} second(s)</b></p>
                            </div>
                          )
                        }
                      </Col>
                      <Col className="col-sm-8 question-time-col"> 
                        <div className="video-progress">
                          <RecordCtl
                            remaining={remainingTime[timePos]}
                            total={waitingTime[timePos]}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="col-sm-3 question-time-title-parent-button-col">
                    {this.renderStarAndStopRecordButton()}
                  </Col>
                </Row>

                <Row className="video-webcam"> 
                  <Col className="col-sm-12 video-webcam-col">
                    <Webcam height="100%" width="100%"/>
                    <div className="audio-box">
                      <AudioMeter width={'90%'}/>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs="12" md="1" className="pt-6 pt-md-0"/>
          </Row>
          {isStopped &&
            <Row>
            <Col xs="12" md="4" className="pt-4 pt-md-0" />
            <Col xs="12" md="4" className="pt-4 pt-md-0" >
              <RaisedButton
                label="Play Back"
                className="btn-playback"
                fullWidth={true}
                onClick={this.openPlayBack}
                primary={true}
              />
            </Col>
            <Col xs="12" md="4" className="pt-4 pt-md-0" />
            </Row>
          }
        </React.Fragment>
        }
        
        {isPlayBackOpen &&  // Show playback.
          <VideoPlayBack
            url={src}
            pageId={positionName}
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
          {
            audioDevices.length > 0 && (
              <SelectField
                floatingLabelText="Audio Source"
                floatingLabelStyle={styles.floatingLabelStyle}
                className="dlg-select"
                value={selectedAudio}
                onChange={this.handleAudioChange}
                menuItemStyle={selectItemStyle}
              >
                {
                  audioDevices.map((obj, index) => {
                    return (<MenuItem key={index} value={obj.value} primaryText={obj.text} />);
                  })
                }
              </SelectField>
            )
          }

          {
            videoDevices.length > 0 && (
              <SelectField
                floatingLabelText="Audio Source"
                floatingLabelStyle={styles.floatingLabelStyle}
                className="dlg-select"
                value={selectedVideo}
                onChange={this.handleVideoChange}
                menuItemStyle={selectItemStyle}
              >
                {
                  videoDevices.map((obj, index) => {
                    return (<MenuItem key={index} value={obj.value} primaryText={obj.text} />);
                  })
                }
              </SelectField>
            )
          }
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
            floatingLabelText="Frame Rate"
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
  const { auth, videoQuestions, videoSettings, deviceSettings, talentInfo } = state;
  // let vq = {value: ["aaa", "bbb"], isFetched: true};
  return {
    auth: auth,
    videoQuestions: videoQuestions,
    videoSettings: videoSettings,
    deviceSettings: deviceSettings,
    talentInfo: talentInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    videoActions: bindActionCreators(videoActions, dispatch),
    deviceActions: bindActionCreators(deviceActions, dispatch),
    talentActions: bindActionCreators(talentActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoPractice);