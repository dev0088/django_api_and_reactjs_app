import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { adminStyles } from 'styles';


class ApprovedStatus extends Component {

  render() {
    const {isApproved, classes } = this.props;
    return (
      <Grid container spacing={16} direction="row" justify="center" alignItems="center">
        <Grid item xs/>
        <Grid item xs>
          <div className={isApproved ? classes.adminStatusApproveNotApproved : classes.adminStatusApproveAwaitingApproval }/>
        </Grid>
        <Grid item xs>
          <div className={isApproved ? classes.adminStatusApproveApproved : classes.adminStatusApproveNotApproved}/>
        </Grid>
        <Grid item xs/>
      </Grid>
    );
  }
}

export default withStyles(adminStyles)(ApprovedStatus);