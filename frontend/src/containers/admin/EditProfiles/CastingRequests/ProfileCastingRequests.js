import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import CastingRequestTable from './CastingRequestTable';
import Spacer from 'components/general/spacer';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';


class ProfileCastingRequests extends React.Component  {

  state = {
    profile: null,
    castingRequestTalents: null,
    isLoading: false,
  };

  getInfoFromProps = (props) => {
    const { location } = props;
    let profile = (location && location.state && location.state.profile) ? location.state.profile : null;
    return { profile};
  };

  handleGetAllCastingRequestResponse = (response, isFailed) => {
    console.log('==== handleGetProfileResponse: response: ', response);
    if(isFailed) {
      this.setState({sLoading: false});
    } else {
      this.setState({castingRequestTalents: response, isLoading: false});
    }
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({...this.getInfoFromProps(nextProps), isLoading: true}, () => {
      const { profile } = this.state;
      if (profile) {
        let data = { talent_id: profile.id };
        AdminAPI.getProfileCastingRequests(data, this.handleGetAllCastingRequestResponse);
      }
    });
  };

  renderContent() {
    const { classes } = this.props;
    const { castingRequestTalents, profile } = this.state;

    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item xs={12}><Spacer size={30} /></Grid>
          <Grid lg={2} md={1} xs={12} />

          <Grid lg={8} md={10} xs={12} >
            <CastingRequestTable castingRequests={castingRequestTalents} profile={profile} />
          </Grid>

          <Grid lg={2} md={1} xs={12} />
          <Grid item xs={12}><Spacer size={30} /></Grid>
        </Grid>
      </Panel>
    );
  }

  render() {
    const { profile } = this.state;
    return (
      <AdminForm
        talent={profile}
        showName
        formSubTitle="CASTING REQUEST"
        nextLink={{pathname: "/admin/edit-profiles/edit-profile", state: {profileId: profile ? profile.id : null}}}
        nextButtonTitle="Back to Profile"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

export default withStyles(adminStyles)(ProfileCastingRequests);
