import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import ClientTalentMarkWithStar from './clientTalentMarkWithStar';
import { adminStyles } from 'styles';


class AdminTalentTitle extends Component {
  render() {
    const { talent, classes } = this.props;

    return (
      <div>
        {/*<ClientTalentMarkWithStar talent={talent} />*/}
        <Typography align="center" className={classes.clientFromTalentName} >
          {`${talent.user.first_name} ${talent.user.last_name}`}
        </Typography>
        <Typography align="center" className={classes.clientFromTalentHeadLine} >
          {talent.head_line}
        </Typography>
      </div>
    )
  }
}

export default (withStyles(adminStyles)(AdminTalentTitle));
