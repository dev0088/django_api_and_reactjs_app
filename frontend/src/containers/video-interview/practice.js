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
import { questions } from "./constants";
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
      isPlayBackOpen: false,
      alertOpen: false,
      errors: []
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
  onStopRecord = () => {
    // console.log('onStopRecord');
    this.setState({isStopped: true});
  };

  onStartRecord = () => {
    // console.log('onStartRecord');
    this.setState({isStopped: false});
  };

  onNextQuestion = () => {
    this.setState({
      isPlayBackOpen: false,
      currentQuestion: this.state.currentQuestion + 1,
      isStopped: false
    });
  };

  onBack = () => {
    this.setState({
      isPlayBackOpen: false,
      currentQuestion: 0,
      isStopped: false
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
    const { config, errors, currentQuestion, isStopped, isPlayBackOpen } = this.state;
    const { videoQuestions, videoSettings } = this.props;
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
          <h1>My Video Interview (Cruise Staff)</h1>
          <h3>Practice Questions</h3>
        </div>

        {!isPlayBackOpen && videoQuestions.isFetched &&
        <div className="row">
          <div className="col-md-6 question-box">
            <p className="question-header">Practice Question {currentQuestion + 1} of 5</p>
            <span className="practice-question">{question}</span>
          </div>

          <div className="col-md-6">
            <p className="question-time">
              Question Time: {videoSettings.value['video_interview_response_time']} second(s)
            </p>
            <RecordCtl
              onStop={this.onStopRecord}
              onStart={this.onStartRecord}
              countStop={isPlayBackOpen || isStopped}
              prep={videoSettings.value['video_interview_prep_countdown']}
              response={videoSettings.value['video_interview_response_time']}
            />
          </div>
          <div className="col-sm-12 video_container">
            <Webcam height="300" width="700" style={{marginLeft: '-150px', marginTop: '5px'}}/>
            <div className="audio-box">
              <AudioMeter/>
            </div>
          </div>
        </div>
        }

        { !isPlayBackOpen && isStopped &&
          <div className="col-md-12 playbackbtn-wrapper">
            <RaisedButton
              label="Play Back"
              className="btn-playback"
              onClick={this.openPlayBack}
              primary={true}
            />
          </div>
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