import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { adminStyles } from 'styles';


class PositionVideoItem extends Component {

  render() {
    const { positionType, allSkills, videos, classes } = this.props;
    let total = 0;
    let skill = allSkills.find(s => s.related_position_type === positionType.name)
    if (skill) {
      for (let i = 0; i < skill.sub_skills.length; i ++) {
        let subSkill = skill.sub_skills[i];
        if (subSkill.video_audition_button_title) total += subSkill.video_counts;
      }
    }
    let currentVideos = videos ? videos.length : 0;
    let approved = (total && videos) ? videos.filter(video => video.approved).length : 0;
    let pending = currentVideos - approved;
    
    return (
      <Link to={'#'}>
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