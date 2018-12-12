import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles';

class CruiseStaffIntroCommon extends Component {

  render() {
    const { classes } = this.props;
    let landscapeOrientationLink = {
      pathname: '/talent/video-audition/landscape-orientation',
      state: {
        position: null,
        previousFormTitle: this.props.formTitle
      }
    };

    return (
      <div>
        <Typography className={classes.descriptionText}>
          There are two Cruise Staff Audition Videos sections to show hiring managers your experience and
          potential as Cruise Staff on board a cruise ship: 1) My Emcee/Host Videos, and 2) My Video Interview.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          {`In `}
          <Typography className={classes.boldText}>
            Section 1 (My Emcee/Host Videos),
          </Typography>
          {` there are two options.  You may complete one or both options.`}
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          <ul className={classes.descriptionUl}>
            <li>
              Option 1 (Create Your Own): you may create and upload to your Profile a sample of your “on
              microphone” emcee and event hosting skills. The scenario you are hosting in your video can
              be fictitious and anything you’d like. You can be “on stage” or “on camera.” Be creative.
              Perhaps you’re introducing a show or hosting an activity. Or maybe you’re the spokesperson
              for a TV commercial. It’s your choice – do whatever best showcases your public speaking
              abilities.
            </li>
            <li>
              Option 2: this option is for those with previous “on microphone” experience who have an edited
              video/sizzle reel. Simply upload your reel in this Section.
            </li>
          </ul>
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          For both options, your video(s) should not exceed three minutes in length and the zoom level should
          be tight enough to see your facial expressions clearly.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          Be sure to trim the beginning and ending of each Audition Video so that there is no
          “dead space” before or after your performance. And if you’re using your smartphone
          camera, always remember to shoot in
          <Typography className={classes.boldText}>
            {" Landscape Orientation"}
          </Typography>
          {". "}
          <Link to={landscapeOrientationLink}>
            <Typography color="primary" className={classes.boldUnderlineText}>
              What is Landscape Orientation?
            </Typography>
          </Link>
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          In
          <Typography className={classes.boldText}>
            {` Section 2 (My Video Interview)`}
          </Typography>
          , you will be participating in a live video interview. Detailed instructions are included within
          this section. Be sure to read and follow these instructions carefully in order to conduct a successful
          video interview.
        </Typography>
      </div>
    )
  }
}


export default withStyles(styles)(CruiseStaffIntroCommon);
