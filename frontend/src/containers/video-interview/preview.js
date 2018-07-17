import React from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';

import './styles.css'
import AudioMeter from "../../components/audio-meter/index";

const styles={
  raisedButton: {
    whiteSpace: "normal",
    width: "240px",
  }
}
class VideoPreview extends React.Component {
  render () {
    return <div className="video-interview">
      <div className="video-interview-header">
        <h1>My Video Interview (Cruise Staff)</h1>
        <h3>Video and Audio Preview</h3>
      </div>

      <div className="col-md-12 camera-box">
        <Webcam height="300" width="700"/>
      </div>

      <div className="audio-box">
        <AudioMeter/>
      </div>

      <div className="col-md-12">
        <RaisedButton
          label="Start Practice Questions"
          className="btnn-video-buttons"
          style={styles.raisedButton}
          href="/video-practice"
          primary={true}
        />
      </div>
      <div className="col-md-12">
        <RaisedButton
          className="btnn-video-buttons btnn-adjust-settings"
          style={styles.raisedButton}
          label="Adjust Video and Audio Settings"
          primary={true}
        />
      </div>
      <div className="col-md-12">
        <RaisedButton
          className="btnn-video-buttons btnn-not-ready"
          style={styles.raisedButton}
          label="I’m Not Ready. Take Me Back to My Cruise Staff Audition Videos"
          primary={true}
        />
      </div>
    </div>
  }
}
export default VideoPreview;