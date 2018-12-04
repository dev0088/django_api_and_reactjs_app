import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

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
const styles={
  raisedButton: {
    whiteSpace: "normal",
    width: "240px",
  },
}

class InterviewInstruction extends React.Component {
  render() {
    const { pageId } = this.props.match.params;
    let link = {
      pathname: '/interview-start',
      state: {
        position: pageId,
        subPosition: ''
      }
    }

    return (<div className="video-interview">
        <div className="video-interview-header">
          <h1>{`My Video Interview (${pageId && pageId})`}</h1>
          <h3>Instructions</h3>
        </div>
        <div className="video-instruction-body">
          <p>
            A Video Interview is required for every ShipTalent.com member.  
            With the exception of Technicians, 
            only one Video Interview is required for your primary discipline category 
            (vocalist, dancer, actor, aerialist, solo musician, musical group leader, cruise staff or youth staff).  
            Technicians must complete a Video Interview for each specialty (audio, lighting and/or video technician).
          </p>
          <p>
            Approach your Video Interview just as you would an in-person interview.  
            Remember, your Video Interview will be viewed by hiring managers throughout the cruise industry, 
            so look your best and dress to impress.
          </p>
          <p>
            You will use your computer’s webcam and microphone to complete your Video Interview.  
            If you have webcam control software installed, 
            please ensure that the program is closed before beginning.  
            Click the <b>Let’s Begin</b> button and, when prompted, 
            select <b>Allow</b> in order for ShipTalent.com to access and test your webcam and microphone.  
            Once enabled and tested, the <b>Let’s Rehearse</b> button will appear.  Click it.
          </p>
          <p>
            In the rehearsal section, you can answer a number of practice questions 
            to get comfortable with the process.  
            Click <b>Start Practice Questions</b> to begin.  
            For each question, you will have  30 seconds to review the question and mentally prepare your response.  
            At the end of the 30 seconds, recording will begin automatically.  
            You will then have up to two minutes to answer the question.  
          </p>
          <p>
            Keep a close eye on the <b>Response Time</b> progress bar so you finish answering before time runs out!  
            If you finish within two minutes and want to end your response, simply click <b>Stop Recording</b>.  
            Once finished, click <b>Playback</b> to review your response and see how you look and sound.  
            If you need to adjust your camera or microphone settings, click the <b>Settings</b> button. 
            Then click <b>Next Practice Question</b> to try another one, if you’d like.
          </p>
          <p>
            You may try as many as five practice questions.  
            Once all five are completed, or 
            if you are comfortable with the process before answering all of the practice questions, 
              you may proceed by clicking the <b>Let’s Go Live!</b> button to start the actual Video Interview.
          </p>
          <p>
            The “live” interview is conducted just like the practice questions 
            with 30 seconds to read the question and prepare your response, 
            and up to two minutes to answer.  
            Follow the onscreen prompts until all Video Interview questions have been answered. 
            Once you begin the actual interview, you will be “live” and unable to stop or go back, 
            just like with an in-person interview. 
          </p>
          <p>
            Helpful Hint: be sure to pay attention to your background – 
            what’s behind you – to ensure there’s nothing that will distract or 
            take away from your interview responses.
          </p>
          <p></p>
          <div className="text-center">
            <Link to={link}>
              <RaisedButton
                label="Back to My Video Interview"
                className="btn-video-buttons btnn-not-ready"
                style={styles.raisedButton}
                primary={true}
              />
            </Link>
          </div>
        </div>
      </div>)

  }
}

export default InterviewInstruction;