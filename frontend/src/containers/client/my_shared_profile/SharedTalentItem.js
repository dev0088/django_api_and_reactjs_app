import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TalentItem from '../find_talent/talentItem';
import TeamMemberList from './TeamMemberList';
import styles, {themeClientSpecialActionButton} from 'styles';


class SharedTalentItem extends Component {

  render() {
    const { sharedProfile, classes } = this.props;
    const {talent, team_members }= sharedProfile;

    if (sharedProfile && talent) {
      return (
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
            <TalentItem talent={talent} />
          </Grid>
          <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
            <TeamMemberList title="Shared With" teamMembers={team_members} />
          </Grid>
        </Grid>
      );
    }

    return <div/>
  }
}

export default withStyles(styles)(SharedTalentItem);