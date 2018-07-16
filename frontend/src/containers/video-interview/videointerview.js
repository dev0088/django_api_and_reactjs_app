import React from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';

import './styles.css'
import AudioMeter from "../../components/audio-meter/index";

class VideoPreview extends React.Component {
  constructor() {
    super();
  }

  render () {
    return
			<Row>
	      <Col md="12" sm="12">
					<div className="video-interview">
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
                href="/video-practice"
                primary={true}
              />
			      </div>
			      <div className="col-md-12">
              <RaisedButton
                className="btnn-adjust-settings"
                label="Adjust Video and <br/> Audio Settings"
                primary={true}
              />
			      </div>
			      <div className="col-md-12">
              <RaisedButton
                className="btnn-not-ready"
                label="I’m Not Ready. <br/> Take Me Back to My Cruise <br/> Staff Audition Videos"
                primary={true}
              />
			      </div>
			    </div>
				</Col>
			</Row>
  }
}

export default VideoPreview;
