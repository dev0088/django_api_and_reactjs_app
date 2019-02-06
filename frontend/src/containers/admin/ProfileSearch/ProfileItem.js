import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  makeTitleWithAllPositionTypes, getSexTitle, getAvatarFromTalentInfo, makeTalentNameWithTid
} from 'utils/appUtils';
import { adminStyles } from 'styles';


class ProfileItem extends Component {

  render() {
    const { profile, classes } = this.props;

    if (profile) {
      return (
        <Link
          to={{
            pathname: '/admin/edit-profiles/edit-profile',
            state: { profileId: profile.id }
          }}
        >
          <Button variant="contained" size="large" className={[classes.button, classes.adminTalentViewButton]}>
            <Typography className={[classes.bold, classes.adminTalentViewButtonText]}>
              { makeTalentNameWithTid(profile)}
            </Typography>
          </Button>
        </Link>
      )
    }

    return <div/>
  }
}

export default withStyles(adminStyles)(ProfileItem);