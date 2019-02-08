import React from "react";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import ProfileTable from "containers/admin/ProfileSearch/ProfileTable";
import Spacer from 'components/general/spacer';
import Grid from '@material-ui/core/Grid';
import GridItem from  "components/admin/Grid/GridItem.jsx";
import GridContainer from  "components/admin/Grid/GridContainer.jsx";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ProfileStatusButtons from './ProfileStatusButtons';
import ProfileCurrentStatus from './ProfileCurrentStatus';
import * as talentActions from 'actions/talentActions';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';

class EditProfile extends React.Component {

  state = {
    isLoading: false,
    profile: null,
    profileId: null
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

  renderContent = () => {
    const { classes } = this.props;
    const { profile, isLoading } = this.state;

    return (
      <Panel>
         <Grid container spacing={40}>
            <Grid item lg md={12} xs={12} />
            <Grid item lg={7} md={12} xs={12}>
              <Spacer size={43} />
              <ProfileStatusButtons profile={profile} loading={isLoading} /> 
            </Grid>
            <Grid item lg md={12} xs={12} />
            <Grid item lg={3} md={12} xs={12} >
              <ProfileCurrentStatus profile={profile} loading={isLoading} />
            </Grid> 
          </Grid>
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
        showMale
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(EditProfile));
