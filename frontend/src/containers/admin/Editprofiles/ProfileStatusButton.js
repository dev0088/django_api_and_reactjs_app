import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { adminStyles } from 'styles';


class ProfileStatusButton extends Component {

  render() {
    const { link, title, requireApproval, classes } = this.props;
    let buttonClasses = classNames(classes.button, classes.adminTalentStatusButton);

    if (requireApproval) buttonClasses = classNames(classes.button, classes.adminTalentStatusButton, classes.adminTalentStatusApproved);

    return (
        <Link to={link}>
          <Button variant="contained" size="large" fullWidth className={buttonClasses}>
            <Typography className={classNames(classes.bold, classes.adminTalentStatusButtonText)}>
              { title }
            </Typography>
          </Button>
        </Link>
    );
  }
}

export default withStyles(adminStyles)(ProfileStatusButton);