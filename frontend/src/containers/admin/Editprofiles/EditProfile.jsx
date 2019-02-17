import React from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import { withStyles } from '@material-ui/core/styles';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import Spacer from 'components/general/spacer';
import Grid from '@material-ui/core/Grid';
import ProfileStatusButtons from './ProfileStatusButtons';
import ProfileCurrentStatus from './ProfileCurrentStatus';
import * as talentActions from 'actions/talentActions';
import * as adminActions from 'actions/adminActions';
import { adminStyles } from 'styles';

class EditProfile extends React.Component {

  state = {
    profileId: null
  };

  getInfoFromProps = (props) => {
    const { location } = props;
    let profileId = (location && location.state && location.state.profileId) ? location.state.profileId : null;
    return { profileId };
  };

  componentWillMount() {
    const { profileId } = this.getInfoFromProps(this.props);
    
    if (profileId) {
      this.props.talentActions.getAllPositionTypes();
      this.props.talentActions.getAllSkills();
      this.props.talentActions.getTalentInfo(profileId);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    });
  }

  renderContent = () => {
    const { isLoading } = this.props;

    return (
      <Panel>
         <Grid container spacing={40}>
            <Grid item lg md={12} xs={12} />
            <Grid item lg={7} md={12} xs={12}>
              <Spacer size={38} />
              <ProfileStatusButtons loading={isLoading} /> 
            </Grid>
            <Grid item lg md={12} xs={12} />
            <Grid item lg={3} md={12} xs={12} >
              <ProfileCurrentStatus loading={isLoading} />
            </Grid> 
          </Grid>
        </Panel>
    );
  }

  render = () => {
    const { allPositionTypes, allSkills, profile, isLoading } = this.props;
    return (
      <AdminForm
        talent={profile}
        allPositionTypes={allPositionTypes}
        allSkills={allSkills}
        loading={isLoading}
        showName
        showGender
        showPosition
        backLink="/admin/new-profiles"
        backButtonTitle="New Profiles"
        nextLink="/admin/dashboard"
        nextButtonTitle="Agent Dashboard"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    talentActions: bindActionCreators(talentActions, dispatch),
    adminActions: bindActionCreators(adminActions, dispatch)
  };
};

const mapStateToProps = state => {
  const { allPositionTypes, allSkills, talentInfo } = state;
  return {
    allPositionTypes, 
    allSkills,
    profile: talentInfo.value,
    isLoading: talentInfo.isFetching
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(EditProfile));
