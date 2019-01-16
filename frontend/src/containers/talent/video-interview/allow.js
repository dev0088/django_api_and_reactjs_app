import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import DetectRTC from "detectrtc";
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TalentForm from 'components/shiptalent/forms/talentForm';
import Panel from 'components/general/panel';
import Spacer from 'components/general/spacer';
import { getValueFromLocation } from 'utils/appUtils';
import { styles } from 'styles';

const customStyles={
  raisedLongButton: {
    whiteSpace: "normal",
    width: "320px",
  },
  checkbox: {
    marginBottom: 16,
  },
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
      console.log(DetectRTC);
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

  updateError = (search) => {
    let detectError = this.state.errors;
    detectError = detectError.filter(e => e.indexOf(search) === -1);
    this.setState({ errors: detectError });
  }

  enableDevice = () => {
    let __this = this;
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        __this.setState( {videoAllow: true} );
        __this.updateError("camera permission");
      });
      navigator.getUserMedia({audio:true}, 
          function(stream) {
            __this.setState({ audioAllow: true });
            __this.updateError("microphone permission");
          },
          function(e) {
            alert('Error capturing audio.');
          }
        );
    }
  }

  renderContents(position) {
    let positionName = position ? position.name : '' ;
    const { audioDevice, audioAllow, videoDevice, videoAllow, errors } = this.state;
    const { classes } = this.props;

    return (
      <Panel className="video-interview">
        <Grid container spacing={24} direction="column" justify="center" alignItems="center">
          <Grid item>
            <Link to={{pathname: "/interview-instruction/", state: {position}}}>
              <Typography className={[classes.blue, classes.boldText, classes.underlineText, classes.talentVideoInstructionBody]}>
                My Video Interview Instructions
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Spacer size={30} />
          </Grid>
          <Grid item>
            <Typography className={classes.talentVideoInterviewBody}>
              First, ShipTalent.com needs access to your <b>camera</b> and <b>microphone</b>
            </Typography>
          </Grid>
          <Grid item>
            {(audioAllow && videoAllow) ? (
                <Grid item>
                  {
                    videoAllow && (
                      <Alert color="primary">Webcam is enabled.</Alert>
                  )}
                  {
                    audioAllow && (
                      <Alert color="primary">Microphone is enabled.</Alert>
                  )}
                  <Link to={{pathname: "/video-interview", state: {position}}}>
                    <Button
                      variant="contained" color={'primary'}
                      fullWidth={true}
                      className={classes.generalButtonClass}
                    >
                      <Typography className={classes.talentProfileGuideButtonTitle}>
                        {"Let's Rehearse"}
                      </Typography>
                    </Button>
                  </Link>
                </Grid>
                ) : (
                  <React.Fragment>
                    <Grid item>
                      {
                        errors.map((error, index) => {
                          console.log(error, index);
                          return (<Alert color="warning" key={index}>{error}</Alert>);
                        })
                      }
                    </Grid>
                    { audioDevice && videoDevice &&
                        (<Grid item>
                            <p>Click <b>Allow</b> when prompted.</p>
                            <Button
                              variant="contained" color={'primary'}
                              fullWidth={true}
                              className={classes.talentProfileGuideButton}
                              onClick={this.enableDevice}
                            >
                              <Typography className={classes.talentProfileGuideButtonTitle}>
                                {"Enable Camera and Microphone"}
                              </Typography>
                            </Button>
                            <RaisedButton
                              label="Enable Camera and Microphone"
                              className="btn-video-buttons"
                              style={customStyles.raisedLongButton}
                              primary={true}
                              onClick={this.enableDevice}
                            />
                        </Grid>)
                    }
                  </React.Fragment>
                )
            }
          </Grid>
          <Grid item>
            <Spacer size={50} />
          </Grid>
        </Grid>
      </Panel>
    )
  }

  render () {
    const position = getValueFromLocation(this.props, 'position');
    const positionName = position ? position.name : '';

    return (
      <TalentForm
        formTitle={`My Video Interview (${positionName})`}
        nextLink={{pathname: "/interview-start", state: {position: position}}}
        nextButtonTitle={`Back to My Video Interview`}
      >
        {this.renderContents(position)}
      </TalentForm>
    );
  }
}

export default withStyles(styles)(InterviewDeviceAllow);