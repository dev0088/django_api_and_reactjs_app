import React from "react";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Panel from "components/general/panel";
import Grid from '@material-ui/core/Grid';
import AdminForm from 'components/shiptalent/forms/adminForm';
import ProfileTable from "containers/admin/ProfileSearch/ProfileTable";
import Spacer from 'components/general/spacer';
import * as clientActions from 'actions/clientActions';
import { adminStyles } from 'styles';


class NewProfiles extends React.Component {
  
  state = {
    profiles: []
  }

  getInfoFromProps(props) {
    const { talentSearchResult } = props;
    let profiles = [];

    if (talentSearchResult) profiles = talentSearchResult;
    return { profiles };
  }

  componentWillMount() {
    let data = {
      approved: false,
    }
    this.props.clientActions.setSearchCondition(data);
    this.props.clientActions.talentSearch(data);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    });
  }

  switchRoutes(path){
    this.props.history.push(path)
  }

  renderContent = () => {
    const { isLoading, classes } = this.props;
    const { profiles } = this.state;

    return (
      <Panel>
        <Grid container spacing={16}>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Spacer size={10} />
        </Grid>
        <Grid item xl={2} lg={2} md={1} xs/>
          <Grid item xl={3} lg={3} md={4} xs={12}>
            { isLoading ? <CircularProgress className={classes.progress} /> : <ProfileTable profiles={profiles} path='/admin/new-profiles/new-profile'/>}
          </Grid>
          <Grid item xl={1} lg={1} md={1} xs/>
          <Grid item xl={4} lg={4} md={5} xs={12}>
            <img 
              src={require('assets/img/new_profile_for_approval.png')} 
              alt='new_profile_for_approval'
              className={classes.adminNewProfilesApprovalImage}
            />
            <Grid item xl={2} lg={2} md={1} xs></Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Spacer size={10} />
        </Grid>
      </Panel>
    );
  }  

  render = () => {
    return (
      <AdminForm
        formTitle="NEW PROFILES FOR APPROVAL"
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
    clientActions: bindActionCreators(clientActions, dispatch)
  }
};

const mapStateToProps = state => {
  const { talentSearchResult } = state;
  return {
    talentSearchResult: talentSearchResult.value,
    isLoading: talentSearchResult.isFetching
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(NewProfiles));
