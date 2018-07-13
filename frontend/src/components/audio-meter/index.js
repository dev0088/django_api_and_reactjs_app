import React from 'react';

// Polyfill: mediaDevices.
// Not work on Desktop Safari, IE.
// Not work on Mobile browsers.

// navigator.mediaDevices = function() {
//   if (navigator.mediaDevices) {
//     return navigator.mediaDevices;
//   }
//
//   navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
//   if (navigator.getUserMedia) {
//     return {
//       getUserMedia: function (c) {
//         return new Promise(function(y, n) {
//             navigator.getUserMedia.call(navigator, c, y, n);
//           }
//         );
//       }
//     }
//   }
// }();
// if (!navigator.mediaDevices) {
//   alert("mediaDevices() not supported.");
//   throw new Error("mediaDevices() not supported.")
// }

// Polyfill: AudioContext.
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

class AudioMeter extends React.Component {

  constructor() {
    super();

    this.state =  {
      volume: 0
    };
  }

  componentDidMount () {

    // Processing.
    let process = function (event) {
      let buf = event.inputBuffer.getChannelData(0);
      let sum = 0;
      let x;

      for (let i = 0; i < buf.length; i++) {
        x = buf[i];
        sum += x * x;
      }

      let rms = Math.sqrt(sum / buf.length);
      this.setState({
        volume: Math.max(rms, this.state.volume * this.averaging)
      });
      //console.log('Volume: ' + this.state.volume);

      this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
      // this.canvasCtx.fillRect(0, this.canvasCtx.canvas.height * (1 - this.state.volume), this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
      this.canvasCtx.fillRect(0, 0, this.canvasCtx.canvas.width * this.state.volume, this.canvasCtx.canvas.height);

    }.bind(this);

    // Init processing.
    navigator.mediaDevices.getUserMedia(
      {
        audio: true
      }
    ).then(function(stream) {
        let audioCtx = new AudioContext();
        let source = audioCtx.createMediaStreamSource(stream);
        let processor = audioCtx.createScriptProcessor(256);

        this.averaging = 0.95;
        this.canvasCtx = this.refs.canvas.getContext('2d');
        this.canvasCtx.fillStyle = '#00a42f';

        processor.onaudioprocess = process;
        processor.connect(audioCtx.destination);
        source.connect(processor);
      }.bind(this)
    ).catch(function(err){
      console.log('Error occurred while initalizing audio input: ' +  err.toString());
    });
  }

  toggleDebug = () => {
    this.setState({
      debug: !this.state.debug
    });
  };

  render () {
    return (
      <div>
        <span className="microphone">
          <img src="/images/microphone.png" alt="Microphone" style={{width: '25px', marginTop: '-20px', marginLeft: '10px'}}/>
        </span>
        <canvas ref="canvas" width="350" height="30" />
      </div>
    );
  }
}

export default AudioMeter;
