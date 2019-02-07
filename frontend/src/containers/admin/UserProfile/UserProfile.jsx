import React from "react";
// @material-ui/core components
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from  "components/admin/Grid/GridItem.jsx";
import GridContainer from  "components/admin/Grid/GridContainer.jsx";
import CustomInput from  "components/admin/CustomInput/CustomInput.jsx";
import Button from '@material-ui/core/Button';
import Card from  "components/admin/Card/Card.jsx";
import CardHeader from  "components/admin/Card/CardHeader.jsx";
import CardAvatar from  "components/admin/Card/CardAvatar.jsx";
import CardBody from  "components/admin/Card/CardBody.jsx";
import CardFooter from  "components/admin/Card/CardFooter.jsx";
import Panel from "components/general/panel";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AdminForm from 'components/shiptalent/forms/adminForm';
import ProfileTable from "containers/admin/ProfileSearch/ProfileTable";
import Spacer from 'components/general/spacer';
import * as clientActions from 'actions/clientActions';
import { Link } from 'react-router-dom';
import { adminStyles } from 'styles';


class UserProfile extends React.Component {
  
  state = {
    isLoading: true,
    profiles: []
  }

  componentWillMount() {
    let data = {
      approved: false,
    }
    this.props.clientActions.setSearchCondition(data);
    this.props.clientActions.talentSearch(data);
  }

  getInfoFromProps(props) {
    const { talentSearchResult } = props;
    let loading = true;
    let profiles = [];

    if (talentSearchResult.value) profiles = talentSearchResult.value;
    loading = talentSearchResult.isFetching;

    return { loading, profiles };
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
            { loading ? <CircularProgress className={classes.progress} /> : <ProfileTable profiles={profiles} />}
          </Grid>
          <Grid item xl={1} lg={1} md={1} xs/>
          <Grid item xl={4} lg={4} md={5} xs={12}>
            <img 
              src={require('assets/img/new_profile_for_approval.png')} 
              alt='new_profile_for_approval'
              className={classes.adminUserProfileApprovalImage}
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
    talentSearchResult
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(UserProfile));
