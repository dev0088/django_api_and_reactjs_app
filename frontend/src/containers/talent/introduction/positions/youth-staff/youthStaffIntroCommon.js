import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles';

class YouthStaffIntroCommon extends Component {

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
          There are two Youth Staff Audition Videos sections to show hiring managers your experience and
          potential as Youth Staff on board a cruise ship: 1) My Teacher Videos, and 2) My Video Interview.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          {`In `}
          <Typography className={classes.boldText}>
            Section 1 (My Youth Staff Videos),
          </Typography>
          {` there are two options. You may complete one or both options.`}
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          <ul className={classes.descriptionUl}>
            <li>
              Option 1 (Create Your Own): you may create and upload to your Profile a sample of your
              teaching skills and youth event “on stage” hosting skills.  The scenario in your video
              can be fictitious and anything you’d like.  You can be in front of a classroom teaching
              a fun subject.  Perhaps you’re hosting a large event at a youth festival.  Or maybe you’re
              the spokesperson for a new teaching tool that you are introducing to the class. It’s your
              choice – do whatever best showcases your public speaking abilities.
            </li>
            <li>
              Option 2: this option is for those with previous “on stage” experience and who have an edited
              video reel.  If you have been recorded “in action” before, simply upload your reel in this Section.
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
          Be sure to trim the beginning and ending of each Audition Video so that there is no “dead space” before
          or after your presentation.  If you’re using your smartphone camera, always remember to shoot in
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
          , you will be participating in a live video interview.  Detailed instructions are included within
          this section.  Be sure to read and follow these instructions carefully in order to conduct a successful
          video interview.
        </Typography>
      </div>
    )
  }
}


export default withStyles(styles)(YouthStaffIntroCommon);
