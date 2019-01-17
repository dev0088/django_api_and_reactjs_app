import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TalentForm from 'components/shiptalent/forms/talentForm';
import { getValueFromLocation } from 'utils/appUtils';
import { styles } from 'styles';

// const styles={
//   raisedButton: {
//     whiteSpace: "normal",
//     width: "240px",
//     textTransform: "none"
//   }
// }

class InterviewStart extends React.Component {

  renderContents = (position) => {
    const { classes } = this.props;

    return (
      <div className="video-interview">
        <div className="col-md-12">
          <Link to={{pathname: `/interview-instruction`, state: {position: position}}}>
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
          <Link to={{pathname: `/interview-device-allow`, state: {position: position}}}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.talentProfileGuideButtonTitle}
            >
              {`Let's Begin`}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  render() {
    let position = getValueFromLocation(this.props, 'position');
    //   null;
    // if (this.props &&
    //   this.props.location &&
    //   this.props.location.state &&
    //   this.props.location.state.position) {
    //   position = this.props.location.state.position;
    // }

    let positionName = position ? position.name : '';

    return (
      <TalentForm
        formTitle={`My Video Interview (${position ? position.name : ''})`}
        nextLink={{pathname: "/video-positions", state: {position: position}}}
        nextButtonTitle={`Back to My ${positionName} Audition Videos`}
      >
        {this.renderContents(position)}
      </TalentForm>
    );
  }
}

export default withStyles(styles)(InterviewStart);