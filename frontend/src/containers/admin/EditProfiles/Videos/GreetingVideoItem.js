import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { adminStyles } from 'styles';


class GreetingVideoItem extends Component {

  render() {
    const { greetingVideos, interviewVideos, classes } = this.props;
    let total = 9;
    let currentVideos = greetingVideos ? greetingVideos.length : 0;
    let currentInterviewVideos = interviewVideos ? interviewVideos.length : 0;
    currentVideos += currentInterviewVideos;
    let approved = (greetingVideos ? greetingVideos.filter(video => video.approved).length: 0) +  currentInterviewVideos;
    let pending = currentVideos - approved;
    
    return (
      <Link to={{pathname: '/admin/edit-profiles/profile-videos/greetings'}}>
        <Button variant="contained" color={'primary'} size="large" fullWidth className={classNames(classes.adminTalentVideoButton)}>
          <Typography className={classNames(classes.adminTalentVideoButtonTitle)}>
            { `VIDEO GREETINGS & ` }
            <Typography className={classNames(classes.adminTalentVideoButtonTitle)}>
            {`VIDEOS INTERVIEWS`}
            </Typography>
          </Typography>
          <Typography className={classes.adminTalentVideoButtonSubTitle}>
            { `Total: ${currentVideos} (${total})` }
          </Typography>
          <Typography className={classes.adminTalentVideoButtonSubTitle}>
            { `Approved: ${approved}` }
          </Typography>
            <Typography className={classes.adminTalentVideoButtonSubTitle}>
              { `Pending: ` }
              {(pending > 0) ? (
                <Typography className={classNames(classes.red, classes.bold, classes.inlineText)}>
                  { pending }
                </Typography>
              ) : (
                <Typography className={classNames(classes.adminTalentVideoButtonSubTitle, classes.inlineText)}>
                  0
                </Typography>                
              )}
            </Typography>
        </Button>
      </Link>
    );
  }
}

export default withStyles(adminStyles)(GreetingVideoItem);