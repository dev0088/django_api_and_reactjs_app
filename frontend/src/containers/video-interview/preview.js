import React from 'react';
import Webcam from 'react-webcam';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import './styles.css'
import AudioMeter from "../../components/audio-meter/index";

const styles={
  raisedButton: {
    whiteSpace: "normal",
    width: "240px",
  }
}
const title = {
  "cruise": "Cruise Staff",
  "audio": "Audio Technician",
  "light-technician": "Lighting Technician",
  "vocalist": "Vocalist",
  "dancer": "Dancer",
  "actor": "Actor",
  "aerialist": "Aerialist",
  "solo-musician": "Solo Musician",
  "music-group-leader": "Musical Group Leader",
  "video-technician": "Video Technician",
  "youth-staff": "Youth Staff"
}
class VideoPreview extends React.Component {
  constructor() {
    super();
    this.state = {
      
    }
  }
  adjustSettings = () => {
    console.log('adjust');
  }
  render () {
    const { pageId } = this.props.match.params;
    return <div className="video-interview">
      <div className="video-interview-header">
        <h1>My Video Interview ({title[pageId] && title[pageId]})</h1>
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
          onClick={this.adjustSettings}
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

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth: auth
  }
}
function mapDispatchToProps(dispatch) {
  return {
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoPreview);