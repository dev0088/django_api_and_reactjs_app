import React from "react";
import { connect } from 'react-redux';
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
    castingRequestTalents: null,
    isLoading: false
  };

  getInfoFromProps = (props) => {
    // const { profile } = props;
    // let profile = (location && location.state && location.state.profile) ? location.state.profile : null;
    return {};
  };

  handleGetAllCastingRequestResponse = (response, isFailed) => {
    console.log('==== handleGetProfileResponse: response: ', response);
    if(isFailed) {
      this.setState({isLoading: false});
    } else {
      this.setState({castingRequestTalents: response, isLoading: false});
    }
  };

  componentWillMount = () => {
    this.setState({...this.getInfoFromProps(this.props), isLoading: true}, () => {
      const { profile } = this.props;
      if (profile) {
        let data = { talent_id: profile.id };
        AdminAPI.searchCastingRequestTalent(data, this.handleGetAllCastingRequestResponse);
      }
    });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({...this.getInfoFromProps(nextProps)});
  };

  renderContent() {
    const { castingRequestTalents } = this.state;

    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item xs={12}><Spacer size={30} /></Grid>
          <Grid lg={2} md={1} xs={12} />

          <Grid lg={8} md={10} xs={12} >
            <CastingRequestTable castingRequests={castingRequestTalents} path={'/admin/casting-request'} />
          </Grid>

          <Grid lg={2} md={1} xs={12} />
          <Grid item xs={12}><Spacer size={30} /></Grid>
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
        formSubTitle="CASTING REQUEST"
        nextLink={{pathname: "/admin/edit-profiles/edit-profile", state: {profileId: profile ? profile.id : null}}}
        nextButtonTitle="Back to Profile"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { };
};

const mapStateToProps = state => {
  const { talentInfo } = state;
  return {
    profile: talentInfo.value
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(ProfileCastingRequests));
