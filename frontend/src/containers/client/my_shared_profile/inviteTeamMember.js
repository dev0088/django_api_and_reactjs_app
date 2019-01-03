import React, {Component} from 'react'
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spacer from "components/general/spacer";
import * as globalNotificationActions from 'actions/globalNotificationActions';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles/clientStyles';


class InviteTeamMembers extends Component {

  state = {
    talent: null,
    team: 0,
    emails: ['', '', '', '']
  };

  getInfoFromProps = (props) => {
    let talent = null;
    let team = 0;
    if (props.location && props.location.state) {
      talent = props.location.state.talent;
      team = props.location.state.team;
    }
    return {
      talent,
      team
    }
  };

  componentWillMount() {
    this.setState({...this.getInfoFromProps(this.props)});
  }

  onChangeEmail = index => event => {
    let newEmails = this.state.emails;

    newEmails[index] = event.target.value;

    this.setState({ emails: newEmails });
  };

  onClickMoreButton = () => {
    let newEmails = this.state.emails;
    newEmails.push('');
    this.setState({ emails: newEmails });
  };

  handleInviteTeamMembers = (event) => {
    const { emails } = this.state;
    const { clientInfo } = this.props;

    let data = [];
    for (let i = 0; i < emails.length; i ++) {
      if (emails[i])
        data.push({
          team: clientInfo.client_teams[0].id,
          member_email: emails[i]
        });
    }

    event.preventDefault();

    ClientAPI.addTeamMembers(data, this.handleResponseInviteTeamMembers);
  };

  handleResponseInviteTeamMembers = (response, isFailed) => {
    const { talent } = this.state;

    if(isFailed) {

    } else {
      this.props.globalNotificationActions.notify(true, 'success', 'Invited new team members successfully.');
      this.props.history.push('/client/shared_profile/invite_confirm', {talent});
    }
  };

  renderEmailEditors = () => {
    const { emails } = this.state;
    const { classes } = this.props;

    let items = emails.map((email, index) => {
      return (
        <Grid item xs={7} key={`email-${index}`}>
          <TextField
            id="outlined-name"
            label=""
            value={email}
            type="text"
            onChange={this.onChangeEmail(index)}
            margin="normal"
            variant="outlined"
            placeholder={`Email address ${index + 1}`}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      )
    });

    return (
      <Grid container spacing={8} justify="center" alignItems="center">
        <Grid item xs={10}>
          <Typography align="center" className={classes.clientFromTalentName} >
            Enter the email address(es) of team members with whom you would like to share profiles. They will be sent an invitation to create a client account with ShipTalent.com
          </Typography>
        </Grid>
        {items}
        <Grid item xs={7}>
          <Button
            className={[classes.clientCastingRequestListViewButton, classes.leftText]}
            onClick={this.onClickMoreButton}
          >
            <Typography align="center" className={classes.clientCastingRequestListViewButtonText} >
              + more
            </Typography>
          </Button>
        </Grid>
      </Grid>
    );
  };

  renderContents = () => {
    const { classes } = this.props;

    return (
      <Panel>
        <Grid container spacing={40} justify="center" alignItems="center">
          <Grid item xs={12} >
            {this.renderEmailEditors()}
          </Grid>

          <ColumnButton
            link='/client/shared_profile/confirm'
            itemClass={classes.clientTalentViewMoreInfoButtonGridItem}
            buttonClass={[classes.clientTalentViewVideoButton, classes.centerText]}
            title={'Send Invitation'} titleClass={classes.clientTalentViewVideoButtonText}
            xl={5} lg={5} md={6} sm={7} xs={10} fullWidth={true}
            onClickButton={this.handleInviteTeamMembers}
          />

        </Grid>
      </Panel>
    );
  };


  render() {
    const { talent } = this.state;

    return(
      <ClientForm
        formTitle="Send Invitation"
        nextLink={{pathname: "/client/talent_view", state: {talentID: talent ? talent.id : 0}}}
        nextButtonTitle="Back to Profile"
        talent={talent}
      >
        {this.renderContents()}
      </ClientForm>
    );
  }
}

const mapStateToProps = (state) => {
  const { clientInfo } = state;

  return {
    clientInfo: clientInfo && clientInfo.value ? clientInfo.value : null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    globalNotificationActions: bindActionCreators(globalNotificationActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InviteTeamMembers));
