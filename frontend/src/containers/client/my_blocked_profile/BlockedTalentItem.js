import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import ClearRounded from '@material-ui/icons/ClearRounded';
import TalentItem from '../find_talent/talentItem';
import ClientAPI from 'apis/clientAPIs';
import styles, {themeClientSpecialActionButton} from 'styles';


class BlockedTalentItem extends Component {

  unblockProfile = (blockedProfileID) => {
    ClientAPI.unblockProfile(blockedProfileID, this.handleUnblockProfileResponse);
  };
  
  handleUnblockProfileResponse = (response, isFailed) => {
    if(isFailed) {

    } else {
      const { onUnblockedProfile } = this.props;
      if(onUnblockedProfile) onUnblockedProfile(this.props.blockedProfile.id);
    }
  };

  render() {
    const { blockedProfile, classes } = this.props;
    const talent = blockedProfile.talent;

    if (blockedProfile && talent) {
      return (
        <Grid container spacing={8} justify="center" alignItems="center">
          <Grid item xs={12} >
            <div className={classes.clientTalentControlContainerDiv}>
              <MuiThemeProvider theme={themeClientSpecialActionButton}>
                <div style={{height:'20px'}}>
                  <Typography
                    color="primary"
                    className={classNames(classes.clientTalentControlBlockProfileExpirationText)}>
                    { blockedProfile.description }
                  </Typography>
                </div>
                <div>
                  <Link to={{ pathname: '/client/blocked_profile/edit', state: {blockedProfile} }} >
                    <EditIcon color="primary" className={classes.clientTalentControlEditIcon}/>
                  </Link>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    aria-label="Unblocked"
                    className={classes.clientTalentControlDeleteButton}
                    onClick={() => this.unblockProfile(blockedProfile.id)}
                  >
                    <ClearRounded className={classes.clientTalentControlDeleteIcon}/>
                  </Button>
                </div>
              </MuiThemeProvider>
            </div>
            <div className={classes.clientTalentContainerDiv}>
              <TalentItem talent={talent} />
            </div>
          </Grid>
        </Grid>
      );
    }

    return <div/>
  }
}

export default withStyles(styles)(BlockedTalentItem);