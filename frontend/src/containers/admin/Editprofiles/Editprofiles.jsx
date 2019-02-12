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
import EditProfileDescription from './EditProfileDescription';
import EditProfileDescriptionCastingRequest from './EditProfileDescriptionCastingRequest';
import * as clientActions from 'actions/clientActions';
import { adminStyles } from 'styles';


class EditProfiles extends React.Component {
  
  state = {
    isLoading: true,
    profiles: []
  }

  getInfoFromProps(props) {
    const { talentSearchResult } = props;
    let loading = true;
    let profiles = [];

    if (talentSearchResult.value) profiles = talentSearchResult.value;
    loading = talentSearchResult.isFetching;

    return { loading, profiles };
  }

  componentWillMount() {
    let data = {};
    this.props.clientActions.setSearchCondition(data);
    this.props.clientActions.talentSearch(data);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    });
  }

  renderContent = () => {
    const { classes } = this.props;
    const { loading, profiles } = this.state;

    if ( loading ) {
      return 
    }

    return (
      <Panel>
        <Grid container spacing={16}>
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <Spacer size={10} />
          </Grid>
          <Grid item xl={2} lg={2} md={1} xs/>
          <Grid item xl={3} lg={3} md={4} xs={12}>
            { loading ? <CircularProgress className={classes.progress} /> : <ProfileTable profiles={profiles} path='/admin/edit-profiles/edit-profile'/>}
          </Grid>
          <Grid item xl={1} lg={1} md xs/>
          <Grid item xl={4} lg={4} md={5} xs={12}>
            <EditProfileDescriptionCastingRequest />
          </Grid>
          <Grid item xs></Grid>

          <Grid item xs={12}><Spacer size={10} /></Grid>

          <Grid item xs={12}>
            <Grid container spacing={16}>
              <Grid item xl={3} lg={3} md={2} xs />
              <Grid item xl={6} lg={6} md={8} xs={10}>
                <EditProfileDescription />
              </Grid>
              <Grid item xl={3} lg={3} md={2} xs />
            </Grid>
          </Grid>
          
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <Spacer size={10} />
          </Grid>
        </Grid>
      </Panel>
    );
  }  

  render = () => {
    return (
      <AdminForm
        formTitle="EDIT PROFILES"
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
    talentSearchResult
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(EditProfiles));
