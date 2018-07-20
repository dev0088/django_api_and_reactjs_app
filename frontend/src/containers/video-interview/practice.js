import React from 'react';
import Webcam from 'react-webcam';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {
  Alert,
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as videoActions from  '../../actions/videoActions';
import AudioMeter from "../../components/audio-meter/index";
import DetectRTC from "detectrtc";

import './styles.css';
import RecordCtl from "../../components/record-ctl/index";
import VideoPlayBack from "./play-back";

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
    };
  }
  componentWillMount() {
    let __this = this;
    DetectRTC.load(function() {
      console.log(DetectRTC);
      if (!DetectRTC.hasWebcam)
      {
        __this.setState({ config: false, alertOpen: true })
        __this.state.errors.push("Video Camera isn't connected. Check your camera");
      }else if (!DetectRTC.isWebsiteHasWebcamPermissions)
      {
        __this.setState({ config: false, alertOpen: true })
        __this.state.errors.push("Your website doesn't have camera permission."); 
      }
      if (!DetectRTC.hasMicrophone)
      {
        __this.setState({ config: false, alertOpen: true });
        __this.state.errors.push("Microphone isn't connected. Check your microphone");
      }
      else if (!DetectRTC.isWebsiteHasMicrophonePermissions)
      {
        __this.setState({ config: false, alertOpen: true })
        __this.state.errors.push("Your website doesn't have microphone permission."); 
      }

    });
    this.props.videoActions.getVideoQuestionsActions();
    this.props.videoActions.getVideoSettingsActions();
  }
  componentDidMount() {
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
    this.setState({ waitingTime: wait, remainingTime: remain });
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

  onStopRecord = () => {
    const { remainingTime } = this.state;
    remainingTime[0] = remainingTime[1] = 0;
    this.setState({isStopped: true, isPlaying: false});

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
      });
  };

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
  };
  handleAlertClose = () => {
    this.setState({alertOpen: false});
  }
  handleAlertRefresh = () => {
    window.location.reload();
  }
  render () {
    const { 
      config, 
      errors, 
      currentQuestion, 
      isStopped,
      isPlaying,
      isPlayBackOpen, 
      waitingTime, 
      remainingTime,
      timePos
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
    if (videoQuestions.value && videoQuestions.value.length > 0)
      question = videoQuestions.value[currentQuestion]['content'];
    return config ? (<div className="video-practice">
        <div className="video-interview-header">
          <h3>
            <span className="pull-left">Question {currentQuestion + 1} of 5</span>
            <span className="pull-right">Video Interview for Practice</span>
          </h3>
        </div>

        {!isPlayBackOpen && videoQuestions.isFetched &&
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
            currentQuestion={currentQuestion}
            onNext={this.onNextQuestion}
            onBack={this.onBack}
          />
        }
      </div>) : (<div className="video-black">
        <Dialog
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
  const { videoQuestions, videoSettings } = state;
  return {
    videoQuestions: videoQuestions,
    videoSettings: videoSettings,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    videoActions: bindActionCreators(videoActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoPractice);