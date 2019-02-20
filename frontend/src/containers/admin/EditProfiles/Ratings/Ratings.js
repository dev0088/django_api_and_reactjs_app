import React from "react";
import { connect } from 'react-redux';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import CastingRequestTable from './CastingRequestTable';
import Spacer from 'components/general/spacer';
import AdminAPI from 'apis/adminAPIs';
import deefaultValues from 'constants/defaultValues';
import { adminStyles } from 'styles';
import defaultValues from "../../../../constants/defaultValues";


class Ratings extends React.Component  {

  state = {
    castingRequestTalents: null,
    isLoading: false,
  };

  getInfoFromProps = (props) => {
    // const { profile } = props;
    // let profile = (location && location.state && location.state.profile) ? location.state.profile : null;
    return {};
  };

  handleGetAllCastingRequestResponse = (response, isFailed) => {
    if(isFailed) {
      this.setState({isLoading: false});
    } else {
      // Filter completed castingRequestTalents
      let castingRequestTalents = response.filter(crt => crt.casting_request.status === defaultValues.CASTING_REQUEST_STATUS.COMPLETED);      
      this.setState({castingRequestTalents, isLoading: false});
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
    const { profile, classes } = this.props;

    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography className={classNames(classes.h4SmallMargin, classes.bold, classes.centerText)}>
              { profile ? Math.round(profile.average_rating * 100) / 100 : '' }
            </Typography>
          </Grid>

          <Grid item xs={12}><Spacer size={15} /></Grid>

          <Grid lg={2} md={1} xs={12} />

          <Grid lg={8} md={10} xs={12} >
            <CastingRequestTable castingRequests={castingRequestTalents} path={'/admin/edit-profiles/profile-ratings/casting-request'} />
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
        formSubTitle="Ratings & Comments"
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(Ratings));
