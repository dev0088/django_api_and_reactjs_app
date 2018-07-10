import React from 'react';
import Webcam from 'react-webcam';

import AudioMeter from "../../components/audio-meter/index";
import { questions } from "./constants";

import './styles.css';
import RecordCtl from "../../components/record-ctl/index";
import VideoPlayBack from "./play-back";

class VideoPractice extends React.Component {
  constructor() {
    super();

    this.state = {
      currentQuestion: 0,
      isStopped: false,
      isPlayBackOpen: false
    };
  }

  onStopRecord = () => {
    console.log('onStopRecord');
    this.setState({isStopped: true});
  };

  onStartRecord = () => {
    console.log('onStartRecord');
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

  render () {

    const { currentQuestion, isStopped, isPlayBackOpen } = this.state;

    return <div className="video-practice">
      <div className="video-interview-header">
        <h1>My Video Interview (Cruise Staff)</h1>
        <h3>Practice Questions</h3>
      </div>

      {!isPlayBackOpen &&
      <div className="row">
        <div className="col-md-6 question-box">
          <p className="question-header">Practice Question {currentQuestion + 1} of 5</p>
          <span className="practice-question">{questions[currentQuestion]}</span>
        </div>

        <div className="col-md-6">
          <p className="question-time">Question Time: 2 minutes </p>

          <RecordCtl
            onStop={this.onStopRecord}
            onStart={this.onStartRecord}
            countStop={isPlayBackOpen || isStopped}
          />

          <Webcam height="300" width="700" style={{marginLeft: '-150px', marginTop: '5px'}}/>
          <div className="audio-box">
            <AudioMeter/>
          </div>
        </div>
      </div>
      }

      { !isPlayBackOpen && isStopped &&
        <div className="col-md-12 playbackbtn-wrapper">
          <button className="btn btn-primary btn-playback" onClick={this.openPlayBack}>Play Back</button>
        </div>
      }

      {isPlayBackOpen &&  // Show playback.
      <VideoPlayBack
        currentQuestion={currentQuestion}
        onNext={this.onNextQuestion}
        onBack={this.onBack}
      />
      }
    </div>
  }
}

export default VideoPractice;