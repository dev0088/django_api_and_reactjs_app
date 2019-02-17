import React, {Component} from 'react'
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Spacer from "components/general/spacer";
import * as globalNotificationActions from 'actions/globalNotificationActions';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles/clientStyles';


class SelectTeamMembers extends Component {

  state = {
    talent: null,
    teamMembers: [],
    sharedProfiles: [],
    alreadySharedTeamMembers: [],
    additionalTeamMembers: [],
    checked: [0],
    comment: ''
  };

  getInfoFromProps = (props) => {
    let talent = null;
    if (props.location && props.location.state) talent = props.location.state.talent;
    return {
      talent
    }
  };

  componentWillMount() {
    this.setState({...this.getInfoFromProps(this.props)}, () => {
      ClientAPI.getAllTeamMembers(this.handleResponseAllTeamMembers);
    });
  }

  handleResponseAllTeamMembers = (response, isFailed) => {
    if(isFailed) {

    } else {
      this.setState({teamMembers: response}, () => {
        ClientAPI.getAllSharedProfiles(this.handleResponseAllSharedProfiles);
      });
    }
  };

  handleResponseAllSharedProfiles = (response, isFailed) => {
    if(isFailed) {

    } else {
      const { teamMembers, talent } = this.state;
      let sharedProfiles = response;
      let alreadySharedTeamMembers = [];
      let additionalTeamMembers = [];

      for (let i = 0; i < teamMembers.length; i ++) {
        let sharedProfile = sharedProfiles.find(sharedProfile =>
          (sharedProfile.team_member === teamMembers[i].id) && (sharedProfile.talent === talent.id)
        );
        if(sharedProfile)
          alreadySharedTeamMembers.push(teamMembers[i]);
        else
          additionalTeamMembers.push(teamMembers[i]);
      }

      this.setState({ sharedProfiles, alreadySharedTeamMembers, additionalTeamMembers });
    }
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  onChangeComment = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleShareProfiles = (event) => {
    const {
      checked, comment, talent
    } = this.state;


    let data = [];
    for (let i = 1; i < checked.length; i ++) {
      data.push({
        team_member: checked[i],
        talent: talent.id,
        comment: comment
      });
    }

    event.preventDefault();

    ClientAPI.addSharedProfiles(data, this.handleResponseShareProfiles);
  };

  handleResponseShareProfiles = (response, isFailed) => {
    const { talent, checked, teamMembers } = this.state;
    if(isFailed) {

    } else {
      this.props.globalNotificationActions.notify(true, 'success', 'Shared profiles successfully.');
      // Get teamMembers you checked
      let newTeamMembers = [];
      for (let i = 1; i < checked.length; i ++) {
        let teamMember = teamMembers.find(tm => {
          return tm.id === checked[i];
        });
        newTeamMembers.push(teamMember);
      }
      this.props.history.push('/client/shared_profile/confirm', {talent, teamMembers: newTeamMembers});
    }
  };
  
  renderAlreadyTeamMembers = () => {
    const { alreadySharedTeamMembers } = this.state;
    const { classes } = this.props;
    let listItems = alreadySharedTeamMembers.map(teamMember => {
      return (
        <ListItem key={teamMember.id}>
          <ListItemText primary={teamMember.member_email} />
        </ListItem>
      )
    });

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="flex-start">
        <Grid item xs={12} >
          <Typography align="center" className={classes.clientFromTalentName} >
            Profile already shared with:
          </Typography>
        </Grid>
        <Grid item xs={12} >
        {
          listItems.length > 0 ? (
            <List className={classes.leftText}>
              {listItems}
            </List>
          ) : (
            <Typography align="center" className={classNames(classes.descriptionText, classes.italicText)} >
              No items
            </Typography>
          )
        }
        </Grid>
      </Grid>
    );
  };

  renderAdditionalTeamMembers = () => {
    const { classes } = this.props;
    const { additionalTeamMembers, checked } = this.state;
    let listItems = additionalTeamMembers.map(teamMember => {
      return (
        <ListItem key={teamMember.id} role={undefined} button onClick={this.handleToggle(teamMember.id)}>
          <Checkbox
            checked={checked.indexOf(teamMember.id) !== -1}
            tabIndex={-1}
            disableRipple
            color="primary"
          />
          <ListItemText primary={teamMember.member_email} />
        </ListItem>
      )
    });

    return (
      <Grid container spacing={24} justify="flex-start" alignItems="flex-start">
        <Grid item xs={12} >
          <Typography align="center" className={classes.clientFromTalentName} >
            Please select which additional team member(s) with whom you would like to share this profile:
          </Typography>
        </Grid>
        <Grid item xs={12} >
          {
            listItems.length > 0 ? (
              <List className={classes.leftText}>
                {listItems}
              </List>
            ) : (
              <Typography align="center" className={classNames(classes.descriptionText, classes.italicText)} >
                No items
              </Typography>
            )
          }
        </Grid>
      </Grid>
    );
  };

  renderComments = () => {
    const { classes } = this.props;
    const { comment } = this.state;

    return (
      <Grid container spacing={16} justify="flex-start" alignItems="flex-start">
        <Grid item xs={12} >
          <Typography align="center" className={classes.clientFromTalentName} >
            Feel free to add any comments you would like to your share...
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-name"
            label=""
            value={comment}
            type="text"
            onChange={this.onChangeComment('comment')}
            margin="normal"
            variant="outlined"
            placeholder="Type comments here..."
            multiline
            rows={5}
            rowsMax={2}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    );
  };

  renderDescription = () => {
    const { clientInfo, classes } = this.props;
    const { talent } = this.state;

    return (

        <div className={classes.centerText}>
          <Typography className={classNames(classes.clientFromTalentName, classes.inlineText)} >
            {`Don't see a team member listed? Click `}
          </Typography>
          <Link to={{
            pathname: '/client/shared_profile/invitation',
            state: {talent, team: (clientInfo && clientInfo.client_teams[0]) ? clientInfo.client_teams[0].id : 0}
          }}
          >
            <Typography color="primary" className={classNames(classes.clientFromTalentName, classes.boldUnderlineText)}>
              here
            </Typography>
          </Link>
          <Typography className={classNames(classes.clientFromTalentName, classes.inlineText)}>
            {` to send an invitation to create a ShipTalent.com account`}
          </Typography>
        </div>

    );
  };


  renderContents = () => {
    const { classes } = this.props;

    return (
      <Panel>
        <Grid container spacing={40} justify="center" alignItems="center">
          <Grid item xs={12} >
            <Spacer size={10} />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={10} >
            {this.renderAlreadyTeamMembers()}
          </Grid>
          <Grid item xs={1} />

          <Grid item xs={1} />
          <Grid item xs={10} >
            {this.renderAdditionalTeamMembers()}
          </Grid>
          <Grid item xs={1} />

          <Grid item xs={1} />
          <Grid item xs={10} >
            {this.renderComments()}
          </Grid>
          <Grid item xs={1} />

          <ColumnButton
            link='/client/shared_profile/confirm'
            itemClass={classes.clientTalentViewMoreInfoButtonGridItem}
            buttonClass={classNames(classes.clientTalentViewVideoButton, classes.centerText)}
            title={'Share Profile'} titleClass={classes.clientTalentViewVideoButtonText}
            xl={5} md={5} xs={8} fullWidth={true}
            onClickButton={this.handleShareProfiles}
          />

          <Grid item xs={12} >
            {this.renderDescription()}
          </Grid>


        </Grid>
      </Panel>
    );
  };


  render() {
    const { talent } = this.state;

    return(
      <ClientForm
        formTitle="Share Profile"
        nextLink="/client/home"
        nextButtonTitle="Back to My Home Page"
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectTeamMembers));
