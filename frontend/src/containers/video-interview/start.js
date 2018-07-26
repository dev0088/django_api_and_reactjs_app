import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';

const styles={
  raisedButton: {
    whiteSpace: "normal",
    width: "240px",
  }
}
class InterviewStart extends React.Component {
  render() {
    return (<div className="video-interview">
        <div className="video-interview-header">
          <h1>My Video Interview (Cruise Staff)</h1>
          <h3>(Required for all Video Technicians)</h3>
        </div>
        <div className="video-interview-body">
          <p>You will use your computer’s webcam and microphone to complete your Video Interview. </p>
          <p>If you have webcam control software installed,</p>
          <p>please ensure that the program is closed before starting your Video Interview.</p>
          <p>Before proceeding, it is important that you read the Instructions above very carefully.</p>
          <p>When ready to proceed, click the Let’s Begin button below. </p>
        </div>
        <div className="col-md-12"> 
          <RaisedButton
            label="Instructions"
            className="btnn-video-buttons"
            style={styles.raisedButton}
            href="/interview-instruction/cruise"
            primary={true}
          />
        </div>
        <div className="col-md-12">
          <RaisedButton
            label="Let's begin"
            className="btnn-video-buttons"
            style={styles.raisedButton}
            href="/interview-device-allow/cruise"
            primary={true}
          />
        </div>
      </div>)

  }
}

export default InterviewStart;