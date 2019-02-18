import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ApprovedStatus from '../../ApprovedStatus';
import { adminStyles } from 'styles';


class InterviewVideoItem extends Component {

  renderButton = (videoCount) => {
    const { classes } = this.props;
    return (
      <Button variant="contained" size="large" className={classNames(classes.button, classes.adminTalentStatusButton)}>
        <Typography className={classNames(classes.bold, classes.adminTalentStatusButtonText)}>
          { `Video Interview (${videoCount})` }
        </Typography>
      </Button>
    );
  };

  render() {
    const { videos } = this.props;
    const videoCount = videos ? videos.length : 0;

    return (
      <Grid container spacing={16} direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
        { (videoCount > 0) ? (
          <Link to={"/admin/edit-profiles/profile-videos/interview-videos"}>
            { this.renderButton(videoCount)}
          </Link>
        ) : (
          <Link to={"/admin/edit-profiles/profile-videos/interview-videos"}>
            { this.renderButton(videoCount)}
          </Link>
        )
        }
        </Grid>
        <Grid item xs={12}>
          <ApprovedStatus isApproved={(videoCount > 0) ? true : false} /> 
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(adminStyles)(InterviewVideoItem);