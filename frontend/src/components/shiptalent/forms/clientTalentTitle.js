import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from 'styles';


class ClientTalentTitle extends Component {
  render() {
    const { talent, classes } = this.props;

    return (
      <div>
        <Typography align="center" className={classes.clientFromTalentName} >
          {`${talent.user.first_name} ${talent.user.last_name}`}
        </Typography>
        <Typography align="center" className={classes.clientFromTalentHeadLine} >
          {talent.head_line}
        </Typography>
        <div className={classes.clientFromTalentIDContainer}>
          <Typography align="center" className={classes.clientFromTalentIDText} >
            {`Talent ID: ${talent.tid}`}
          </Typography>
        </div>
      </div>
    )
  }
}

export default (withStyles(styles)(ClientTalentTitle));
