import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { getPositionTypeTotalVideosCount, getApprovedVideos } from 'utils/appUtils';
import { adminStyles } from 'styles';


class PositionVideoItem extends Component {

  render() {
    const { positionType, allSkills, videos, classes } = this.props;
    let total = getPositionTypeTotalVideosCount(allSkills, positionType);
    let currentVideos = videos ? videos.length : 0;
    let approved = (total && videos) ? getApprovedVideos(videos).length : 0;
    let pending = currentVideos - approved;
    
    return (
      <Link to={{pathname: '/admin/edit-profiles/profile-videos/edit-position-videos',  state: {positionType: positionType}}}>
        <Button variant="contained" color={'primary'} size="large" fullWidth className={classNames(classes.adminTalentVideoButton)}>
          <Typography className={classNames(classes.adminTalentVideoButtonTitle)}>
            { `${positionType.name} ` }
            <Typography className={classNames(classes.adminTalentVideoButtonTitle)}>
            {`VIDEOS`}
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

export default withStyles(adminStyles)(PositionVideoItem);