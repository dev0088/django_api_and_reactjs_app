import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { styles } from 'styles';

// const styles={
//   raisedButton: {
//     whiteSpace: "normal",
//     width: "240px",
//     textTransform: "none"
//   }
// }

class InterviewStart extends React.Component {
  render() {
    const { classes } = this.props

    let position_type = 'Cruise Staff';
    let page_id = 'Cruise Staff';
    if (this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.position) {
      let position = this.props.history.location.state.position;
      let subPosition = this.props.history.location.state.subPosition;
      position_type = position;
      page_id = position_type
    }

    return (
      <div className="video-interview">
        <div className="video-interview-header">
          <h1>{`My Video Interview (${position_type})`}</h1>
        </div>
        <div className="col-md-12">
          <Link to={`/interview-instruction/${page_id}`}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.generalButtonClass}
            >
              {`INSTRUCTIONS`}
            </Button>
          </Link>
        </div>
        <div className="video-interview-body" style={{marginTop: '50px', marginBottom: '50px'}}>
          <p>You will use your computer’s webcam and microphone to complete your Video Interview. </p>
          <p>If you have webcam control software installed,</p>
          <p>please ensure that the program is closed before starting your Video Interview.</p>
          <p>Before proceeding, it is important that you read the Instructions above very carefully.</p>
          <p>When ready to proceed, click the Let’s Begin button below. </p>
        </div>
        <div className="col-md-12">
          <Link to={`/interview-device-allow/${page_id}`}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.generalButtonClass}
            >
              {`Let's Begin`}
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(InterviewStart);