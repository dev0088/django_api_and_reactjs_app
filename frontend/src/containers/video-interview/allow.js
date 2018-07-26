import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import DetectRTC from "detectrtc";
import {
  Alert,
} from 'reactstrap';

const styles={
  raisedLongButton: {
    whiteSpace: "normal",
    width: "320px",
  },
  checkbox: {
    marginBottom: 16,
  },
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
class InterviewDeviceAllow extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      audioDevice: true,
      audioAllow: true,
      videoDevice: true,
      videoAllow: true
    }
  }
  componentWillMount() {
    let __this = this, detectError = [];
    DetectRTC.load(function() {
      // console.log(DetectRTC);
      if (!DetectRTC.hasWebcam)
      {
        __this.setState({ videoDevice: false, videoAllow: false })
        detectError.push("Video Camera isn't connected. Check your camera.");
      }
      else if (!DetectRTC.isWebsiteHasWebcamPermissions)
      {
        __this.setState({ videoAllow: false })
        detectError.push("Your website doesn't have camera permission."); 
      }
      if (!DetectRTC.hasMicrophone)
      {
        __this.setState({ audioDevice: false, audioAllow: false });
        detectError.push("Microphone isn't connected. Check your microphone.");
      }
      else if (!DetectRTC.isWebsiteHasMicrophonePermissions)
      {
        __this.setState({ audioAllow: false })
        detectError.push("Your website doesn't have microphone permission."); 
      }
      __this.setState({ errors: detectError });
    });
  }
  render() {
    const { pageId } = this.props.match.params;
    const { audioDevice, audioAllow, videoDevice, videoAllow, errors } = this.state;
    return (<div className="video-interview">
        <div className="video-interview-header">
          <h1>My Video Interview ({title[pageId] && title[pageId]})</h1>
          <a href={"/interview-instruction/" + pageId}>My Video Interview Instructions</a>
        </div>
        <div className="video-access-body row d-flex justify-content-center">
          <p>First, ShipTalent.com needs access to your <b>camera</b> and <b>microphone</b>.</p>
        {
          (audioAllow && videoAllow) ? (
            <div className="col-md-8">
              {
                videoAllow && (
                  <Alert color="primary">Webcam is enabled.</Alert>
              )}
              {
                audioAllow && (
                  <Alert color="primary">Microphone is enabled.</Alert>  
              )}
              <RaisedButton
                label="Let's Rehearse"
                className="btnn-video-buttons"
                style={styles.raisedLongButton}
                primary={true}
                href={"/video-interview/" + pageId }
              />
            </div>
            ) : (
            (!audioDevice || !videoDevice) ? 
              (<div className="col-md-8"> 
                {
                  errors.map((error, index) => {
                    console.log(error, index);
                    return (<Alert color="warning" key={index}>{error}</Alert>);
                  })
                }
              </div>): 
              (<div className="col-md-8">
                <p>Click <b>Allow</b> when prompted.</p>
                <RaisedButton
                  label="Enable Camera and Microphone"
                  className="btnn-video-buttons"
                  style={styles.raisedLongButton}
                  primary={true}
                />
              </div>)
          )
        }
        </div>
      </div>)

  }
}

export default InterviewDeviceAllow;