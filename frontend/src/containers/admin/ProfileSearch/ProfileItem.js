import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  makeTalentNameWithTid
} from 'utils/appUtils';
import { adminStyles } from 'styles';


class ProfileItem extends Component {

  render() {
    const { profile, link, className, classes } = this.props;
    let defaultClassName = className ? className : classes.adminTalentViewButton;

    if (profile) {
      return (
        <Link to={link}>
          <Button variant="contained" size="large" fullWidth className={classNames(classes.button, defaultClassName)}>
            <Typography className={classNames(classes.bold, classes.adminTalentViewButtonText)}>
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