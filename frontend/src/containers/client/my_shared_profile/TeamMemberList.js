import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from 'styles';


class TeamMemberList extends Component {

  render() {
    const { title, teamMembers, classes } = this.props;

    return (
      <Grid container spacing={8} direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography align="center" className={[classes.descriptionText, classes.boldText]}>
            {title}
          </Typography>
        </Grid>
        {(teamMembers && teamMembers.length > 0) ? (
          teamMembers.map(teamMember => {
            return (
              <Grid item xs={12}>
                <Typography align="center" className={classes.underline}>
                  {teamMember.member_email}
                </Typography>
              </Grid>
            )
          })
        ) : (<Grid item xs={12} />)}
      </Grid>
    )
  }
}

export default withStyles(styles)(TeamMemberList);