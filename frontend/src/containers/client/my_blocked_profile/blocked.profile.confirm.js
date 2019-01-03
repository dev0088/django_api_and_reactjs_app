import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import Spacer from 'components/general/spacer';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles';


class BlockedProfileConfirm extends Component {

  state = {
  };

  handleClickReturn = () => {
    const { blockedProfile } = this.props.location.state;
    this.props.history.push('/client/talent_view', { talentId: blockedProfile.talent});
  };

  renderContent = () => {
    const { classes } = this.props;
    if (!this.props.location || !this.props.location.state) return <div/>;

    const { blockedProfile, expiration, talent } = this.props.location.state;

    return (
      <Panel title={`Talent will be ${expiration}`} bold={true} center={true} >
        <Grid container spacing={24} direction="column" justify="center" alignItems="center">
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <Typography className={classes.wizardSettingSubTitle}>
              {"You may manage or remove your blocks in the My Blocked Profiles section of MY Home Page."}
            </Typography>
            <Typography className={classes.wizardSettingSubTitle}>
              {"Blocks that time-out will be removed by the system automatically"}
            </Typography>
          </Grid>

          <Grid item lg={12} md={12} sm={10} xs={0}> <Spacer size={50}/> </Grid>

          <Grid item lg={10} md={10} sm={10} xs={10}>
            <Typography className={classes.wizardSettingSubTitle}>
              {"Note: Blocking talent only removes them your search results."}
            </Typography>
            <Typography className={classes.wizardSettingSubTitle}>
              {"Talent will still appear in My Callbacks, My Favorites and My Castingn Requests"}
            </Typography>
          </Grid>

          <Grid item lg={12} md={12} sm={10} xs={0}> <Spacer size={50}/> </Grid>

          <Grid item lg={8} md={8} sm={8} xs={8} className={classes.talentProfileGuideButtonItem}>
            <Button
              variant="contained" color={'primary'}
              fullWidth={true}
              className={classes.clientTalentViewVideoButton}
              onClick={this.handleClickReturn}
            >
              <Typography className={classes.clientTalentViewVideoButtonText}>
                {"Return to Profile"}
              </Typography>
            </Button>
          </Grid>

        </Grid>
      </Panel>
    )
  };

  render() {
    let blockedProfile = null;
    let talent = null;

    if (this.props.location && this.props.location.state) {
      blockedProfile = this.props.location.state.blockedProfile;
      talent = this.props.location.state.talent;
    }

    if (blockedProfile) talent = blockedProfile;

    return (
      <ClientForm
        formTitle={talent && talent.user ? `${talent.user.first_name} ${talent.user.last_name}` : '' }
        formSubTitle={talent ? talent.head_line : '' }
        nextLink={{pathname: "/client/talent_view", state: {talentID: talent ? talent.id : 0}}}
        nextButtonTitle="Return to Profile"
      >
        {this.renderContent()}
      </ClientForm>
    )
  }
}

export default withStyles(styles)(BlockedProfileConfirm);