// handle user media capture
export function captureUserMedia(options, callback) {
  var params = { audio: true, video: options };
  navigator.mediaDevices.getUserMedia(params).then(callback).catch(function(error) {
  	console.log(error);
      if(error && error.name === 'ConstraintNotSatisfiedError') {
          alert('Your camera or browser does NOT supports selected resolutions or frame-rates. \n\nPlease select "default" resolutions.');
      }
  });
};