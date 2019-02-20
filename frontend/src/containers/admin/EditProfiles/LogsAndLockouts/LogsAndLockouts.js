import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import UserNote from "../UserNote/UserNote";
import * as adminActions from 'actions/adminActions';
import * as talentActions from 'actions/talentActions';
import defaultValues from 'constants/defaultValues';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';


class LogsAndLockouts extends React.Component  {
  state = {
    profileId: 0,
    userIds: [],
    noteTypes: [defaultValues.USER_NOTE_TYPE.DANCE_COMBINATION]
  };

  getInfoFromProps = (props) => {
    const { profile } = props;
    const { noteTypes } = this.state;
    let profileId = profile && profile.user.id;
    let userIds = [];

    if (profile) userIds.push(profile.user.id);
    if (userIds.length > 0) {
      let searchCondition = {
        receivers: userIds,
        note_types: noteTypes,
      };
      this.props.adminActions.searchNotes(searchCondition);
    }

    return { profileId, userIds };
  };

  componentWillMount = () => this.setState({...this.getInfoFromProps(this.props)});

  componentWillReceiveProps = (nextProps) => this.setState({...this.getInfoFromProps(nextProps)});

  handleClickResetLockOut = () => {
    const { profile } = this.props;
    let data = {
      locked_dance_combination: !profile.locked_dance_combination
    };
    AdminAPI.saveProfile(profile.user.id, data, this.handleResetLockOutResponse);
  };

  handleResetLockOutResponse = () => {
    const { profile } = this.props;
    const { userIds, noteTypes } = this.state;
    let searchCondition = {
      receivers: userIds,
      note_types: noteTypes,
    }
    this.props.adminActions.searchNotes(searchCondition)
    this.props.talentActions.getTalentInfo(profile.id);
  }

  renderContent() {
    const { profile, classes } = this.props;
    const { userIds, noteTypes } = this.state;

    return (
      <Panel>
        <Grid container spacing={0} justify="flex-start" alignItems="flex-start">
          <Grid item xs={12} className={classes.rightText}>
            <Button variant="contained" size="small" 
              className={classNames(classes.button, classes.adminAddNoteButton)}
              onClick={this.handleClickResetLockOut}
            >
              <Typography className={classes.adminAddNoteButtonTitle}>
                RESET LOCKOUT
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <UserNote 
              userIds={userIds} 
              noteTypes={noteTypes} 
              objectId={[]}
              enableAdd={false}
            />
          </Grid>
        </Grid>
      </Panel>
    );
  }

  render() {
    const { profile } = this.props;

    return (
      <AdminForm
        talent={profile}
        showName
        formSubTitle="DANCE COMBINATION LOG"
        nextLink={{pathname: "/admin/edit-profiles/edit-profile", state: {profileId: profile ? profile.id : null}}}
        nextButtonTitle="Back to Profile"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}


const mapStateToProps = state => {
  const { talentInfo, notes } = state;
  return {
    profile: talentInfo.value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    adminActions: bindActionCreators(adminActions, dispatch),
    talentActions: bindActionCreators(talentActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(LogsAndLockouts));
