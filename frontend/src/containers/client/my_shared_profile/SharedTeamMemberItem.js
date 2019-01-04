import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TalentTable from '../find_talent/talentTable';
import styles from 'styles';


class SharedTalentItem extends Component {

  render() {
    const { sharedProfile, classes } = this.props;
    const {team_member, talents }= sharedProfile;

    if (sharedProfile && team_member) {
      return (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.clientSharedProfileTeamMemberText}>
              {team_member.member_email}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TalentTable talents={talents} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    }

    return <div/>
  }
}

export default withStyles(styles)(SharedTalentItem);