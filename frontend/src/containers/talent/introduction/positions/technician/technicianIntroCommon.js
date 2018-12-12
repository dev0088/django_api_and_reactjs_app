import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles';

class TechnicianIntroCommon extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography className={classes.descriptionText}>
          There are three Technician Audition Videos sections:
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          <ol className={classes.olParentheses}>
            <li>
              Audio Technician Videos
            </li>
            <li>
              Lighting Technician Videos
            </li>
            <li>
              Video Technician Videos
            </li>
          </ol>
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          You must upload a demo reel as well as participate in a Video Interview for each technical
          specialty in which you are trained and proficient (audio, lighting and/or video).
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          You must upload a demo reel as well as participate in a Video Interview for each technical
          specialty in which you are trained and proficient (audio, lighting and/or video).
        </Typography>
        <br/>
      </div>
    )
  }
}


export default withStyles(styles)(TechnicianIntroCommon);
