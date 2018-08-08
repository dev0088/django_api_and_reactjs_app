import React from 'react'
import ReactPlayer from 'react-player';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import {Row, Col} from 'reactstrap';

const styles={
  raisedButton: {
    whiteSpace: "normal",
    width: "240px",
  }
}
export default function VideoPlayBack(props) {
  
  return (
    <Row className="video-playback">
    <Col xs="12" md="4" className="pt-3 pt-md-0"/>
    <Col xs="12" md="4" className="pt-3 pt-md-0">
    
      {props.url && 
        (<ReactPlayer
          url={props.url}
          className='react-player'
          playing
          width={'100%'}
          height='100%'
          controls={true}
        />)
      }
    </Col>
    <Col xs="12" md="4" className="pt-3 pt-md-0"/>
    <Col className="col-md-12">
      <RaisedButton
        label="Adjust Video and Audio Settings"
        className="btnn-video-buttons btn-vpb"
        style={styles.raisedButton}
        primary={true}
        onClick={() => {props.onSettings()}}
      />
    </Col>

    {props.currentQuestion < 4 &&
    <div className="col-md-12">
      <RaisedButton
        label="Next Practice Question"
        className="btnn-video-buttons btn-vpb"
        style={styles.raisedButton}
        primary={true}
        onClick={() => { props.onNext() } }
      />
    </div> }

    <div className="col-md-12">
      <Link to={"/interview-instruction-live/" + props.pageId}>
        <RaisedButton
          label="Let's Go Live!"
          className="btnn-video-buttons btn-vpb"
          style={styles.raisedButton}
          secondary={true}
        />
      </Link>
    </div>

    <div className="col-md-12">
      <Link to="/edit-profile">
        <RaisedButton
          label="I’m Not Ready. Take Me Back to My Cruise Staff Audition Videos"
          className="btnn-video-buttons btnn-not-ready"
          style={styles.raisedButton}
          primary={true}
        />
      </Link>
    </div>
  </Row>)
}