import React, {Component} from 'react'
import ReactPlayer from 'react-player';

export default function VideoPlayBack(props) {
  return (<div className="row video-playback">
    <div className="video-box col-md-12">
      <ReactPlayer
        url='https://www.youtube.com/watch?v=rnwlWn603g4'
        className='react-player'
        playing
        width='500px'
        height='250px'
        controls="true"
      />
    </div>
    <div className="col-md-12">
      <button className="btn btn-primary btn-vpb">Adjust Audio and Video Settings</button>
    </div>

    {props.currentQuestion < 4 &&
    <div className="col-md-12">
      <button className="btn btn-primary btn-vpb" onClick={() => { props.onNext() } }>Next Practice Question</button>
    </div> }

    { props.currentQuestion === 4 &&
    <div className="col-md-12">
      <button className="btn btn-success btn-vpb">Let's Go Live!</button>
    </div> }

    <div className="col-md-12">
      <button className="btn btn-primary btnn-not-ready" onClick={() => {props.onBack()}}>I’m Not Ready. <br/>  Take Me Back to My Cruise <br/> Staff Audition Videos</button>
    </div>
  </div>)
}