import React from "react";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import Spacer from 'components/general/spacer';
import ProfileStatusButtons from 'containers/admin/EditProfiles/ProfileStatusButtons';
import ProfileCurrentStatus from 'containers/admin/EditProfiles/ProfileCurrentStatus';
import ConfirmProfileApprovedDialog from 'components/admin/dialogs/ConfirmProfileApprovedDialog';
import * as talentActions from 'actions/talentActions';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';

class NewProfile extends React.Component {

  state = {
    isLoading: false,
    profile: null,
    profileId: null,
    openConfirmApproved: false,
  };

  getInfoFromProps = (props) => {
    const { location } = props;
    let profileId = (location && location.state && location.state.profileId) ? location.state.profileId : null;
    return { profileId };
  };

  handleGetProfileResponse = (response, isFailed) => {
    console.log('==== handleGetProfileResponse: response: ', response);
    if(isFailed) {

    } else {
      const { allPositionTypes, allSkills } = this.props;
      this.setState({profile: response, isLoading: false});
    }
  };

  componentWillMount() {
    const { profileId } = this.getInfoFromProps(this.props);
    
    if (profileId) {
      this.setState({isLoading: true}, () => {
        this.props.talentActions.getAllPositionTypes();
        this.props.talentActions.getAllSkills();
        AdminAPI.getProfile(profileId, this.handleGetProfileResponse);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    });
  }

  onClickProfileApproved = () => {
    this.setState({openConfirmApproved: true});
  };

  onClickNewProfiles = () => {
    this.setState({openConfirmApproved: false}, () => {
      this.props.history.push('/admin/new-profiles');
    })
  };

  onClickAgentDashboard = () => {
    this.setState({openConfirmApproved: false}, () => {
      this.props.history.push('/admin/dashboard');
    })
  };

  renderContent = () => {
    const { classes } = this.props;
    const { profile, isLoading, openConfirmApproved } = this.state;

    return (
      <Panel>
         <Grid container spacing={40}>
            <Grid item lg md={12} xs={12} />
            <Grid item lg={7} md={12} xs={12}>
              <Spacer size={38} />
              <ProfileStatusButtons profile={profile} loading={isLoading} /> 
            </Grid>
            <Grid item lg md={12} xs={12} />
            <Grid item lg={3} md={12} xs={12} >
              <ProfileCurrentStatus profile={profile} loading={isLoading} />
              <Button variant="contained" className={classes.adminNewProfileApprovedButton} onClick={this.onClickProfileApproved}>
                PROFILE APPROVED
              </Button>
              <Button variant="contained" className={classes.adminNewProfileApprovedButton}>
                PROFILE PENDING
              </Button>
            </Grid> 
          </Grid>
          <ConfirmProfileApprovedDialog 
            open={openConfirmApproved}
            onClickNewProfiles={this.onClickNewProfiles}
            onClickAgentDashboard={this.onClickAgentDashboard}
          />
        </Panel>
    );
  }

  render = () => {
    const { profile, isLoading } = this.state;
    const { allPositionTypes, allSkills } = this.props;
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
    talentActions: bindActionCreators(talentActions, dispatch)
  };
};

const mapStateToProps = state => {
  const { allPositionTypes, allSkills } = state;
  return {
    allPositionTypes, 
    allSkills
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(NewProfile));

