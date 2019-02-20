import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import * as adminActions from 'actions/adminActions';
import defaultValues from 'constants/defaultValues';
import { adminStyles } from 'styles';
import UserNote from "../UserNote/UserNote";


class Blocks extends React.Component  {
  state = {
    profileId: 0,
    userIds: [],
    noteTypes: [defaultValues.USER_NOTE_TYPE.BLOCK]
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

  renderContent() {
    const { profile } = this.props;
    const { userIds, noteTypes } = this.state;

    return (
      <Panel>
        <Grid container spacing={0} justify="flex-start" alignItems="flex-start">
          <Grid item xs={12}>
            <UserNote 
              userIds={userIds} 
              noteTypes={noteTypes} 
              objectId={null}
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
        formSubTitle="BLOCKS"
        nextLink={{pathname: "/admin/edit-profiles/edit-profile", state: {profileId: profile ? profile.id : null}}}
        nextButtonTitle="Back to Profile"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}


const mapStateToProps = state => {
  const { talentInfo } = state;
  return {
    profile: talentInfo.value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    adminActions: bindActionCreators(adminActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(Blocks));
