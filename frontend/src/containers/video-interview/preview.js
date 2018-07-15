import React from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom'

import './styles.css'
import AudioMeter from "../../components/audio-meter/index";

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
        <Link className="btn btn-primary btnn-start-practice" to="/video-practice">Start Practice Questions</Link>
      </div>
      <div className="col-md-12">
        <button className="btn btn-primary btnn-adjust-settings">Adjust Video and <br/> Audio Settings</button>
      </div>
      <div className="col-md-12">
        <button className="btn btn-primary btnn-not-ready">I’m Not Ready. <br/>  Take Me Back to My Cruise <br/> Staff Audition Videos</button>
      </div>
    </div>
  }
}

export default VideoPreview;