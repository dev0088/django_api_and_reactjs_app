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


class DanceComboLockOuts extends React.Component  {

  state = {
    profiles: null
  };

  getInfoFromProps(props) {
    const { talentSearchResult } = props;
    let profiles = [];

    if (talentSearchResult) profiles = talentSearchResult;
    return { profiles };
  }

  componentWillMount() {
    let data = {
      locked_dance_combination: true,
    }
    this.props.clientActions.setSearchCondition(data);
    this.props.clientActions.talentSearch(data);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    });
  }

  renderContent = () => {
    const { isLoading, classes } = this.props;
    const { profiles } = this.state;

    return (
      <Panel>
        <Grid container spacing={16}>
          <Grid item xs={12}><Spacer size={10} /></Grid>

          <Grid item lg={4} md={2} xs={1}/>
          <Grid item lg={4} md={8} xs={10}>
            { isLoading ? 
              <CircularProgress className={classes.progress} /> : 
              <ProfileTable profiles={profiles} path='/admin/edit-profiles/profile-logs-locks'/>
            }
          </Grid>
          <Grid item lg={4} md={2} xs={1}/>

          <Grid item xs={12}><Spacer size={10} /></Grid>
        </Grid>
      </Panel>
    );
  }  

  render() {
    return (
      <AdminForm
        formTitle="DANCE COMBO LOCK OUTS"
        nextLink={"/admin"}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(DanceComboLockOuts));
