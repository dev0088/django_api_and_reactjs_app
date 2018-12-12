import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from 'styles';

class ImportantRegardingButton extends Component {

  render() {
    const { classes,  } = this.props;
    let landscapeOrientationLink = {
      pathname: '/talent/video-audition/landscape-orientation',
      state: {
        previousFormTitle: this.props.formTitle
      }
    };

    return (
      <Link to={landscapeOrientationLink}>
        <Button
          variant="contained"
          fullWidth={false}
          className={classes.talentImportantRegardingButton}
        >
          <Typography className={classes.talentImportantRegardingButtonTitle}>
            IMPORTANT NOTE Regarding ALL of your Audition Videos
          </Typography>
        </Button>
      </Link>
    )
  }
}


export default withStyles(styles)(ImportantRegardingButton);
