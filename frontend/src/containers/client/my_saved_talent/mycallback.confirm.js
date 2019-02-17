import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import Spacer from 'components/general/spacer';
import styles from 'styles';


class CallBackConfirm extends Component {

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
      <Panel>
        <Grid container spacing={24} direction="column" justify="center" alignItems="center">
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <Typography align="center" className={classNames(classes.h4SmallMargin, classes.bold)}>
              {"Talent has been added to My Callbacks"}
            </Typography>
            <Typography className={classNames(classes.clientFormSubTitle, classes.centerText)}>
              {"(view callbacks in My Talent section of My Home Page)"}
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}> <Spacer size={50}/> </Grid>
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
        nextButtonTitle="Back to Profile"
      >
        {this.renderContent()}
      </ClientForm>
    )
  }
}

export default withStyles(styles)(CallBackConfirm);