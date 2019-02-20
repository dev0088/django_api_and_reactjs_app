import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import Spacer from 'components/general/spacer';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';
import defaultValues from "constants/defaultValues";


class CastingRequests extends React.Component  {

  state = {
    newCrFilterCondition: {status: [
      defaultValues.CASTING_REQUEST_STATUS.REQUESTED, 
      defaultValues.CASTING_REQUEST_STATUS.REVIEWING
    ]},
    progressCrFilterCondition: {status: [
      defaultValues.CASTING_REQUEST_STATUS.IN_PROGRESS,
      defaultValues.CASTING_REQUEST_STATUS.ACCEPTED
    ]},
    archiveCrFilterCondition: {status: [
      defaultValues.CASTING_REQUEST_STATUS.COMPLETED,
      defaultValues.CASTING_REQUEST_STATUS.DECLINED,
      defaultValues.CASTING_REQUEST_STATUS.CANCELED
    ]},
    newCrs: 0,
    progressCrs: 0,
    archiveCrs: 0
  };

  componentWillMount = () => {
    const { newCrFilterCondition, progressCrFilterCondition, archiveCrFilterCondition } = this.state;
    AdminAPI.searchCastingRequest(newCrFilterCondition, (response, isFailed) => {
      if (!isFailed) this.setState({newCrs: response.length});
    });
    AdminAPI.searchCastingRequest(progressCrFilterCondition, (response, isFailed) => {
      if (!isFailed) this.setState({progressCrs: response.length});
    });
    AdminAPI.searchCastingRequest(archiveCrFilterCondition, (response, isFailed) => {
      if (!isFailed) this.setState({archiveCrs: response.length});
    });
  }

  renderContent = () => {
    const { classes } = this.props;
    const { 
      newCrFilterCondition, progressCrFilterCondition, archiveCrFilterCondition,
      newCrs, progressCrs, archiveCrs
    } = this.state;
    return (
      <Panel>
        <Grid container spacing={16}>
          <Grid item xs={12}><Spacer size={10} /></Grid>

          <Grid xs={1}/>
          <Grid item xs={10}>
            <Grid container spacing={32} direction="row" justify="column" alignItems="center">
              <Grid item xl={4} lg={4} md={4} xs={12}>
                <Link to={{ pathname: "/admin/new-casting", state: {filterCondition: newCrFilterCondition, title: 'NEW CASTING REQUEST'} }}>   
                  <Button variant="contained" size="large"  fullWidth 
                    className={classNames(classes.button, classes.adminCastingRequestGroupButton)}
                  >
                    <Typography className={classes.adminCastingRequestGroupButtonTitle}>
                      NEW
                    </Typography>
                    <Typography className={classNames(classes.adminCastingRequestGroupButtonSubTitle, classes.red)}>
                      { newCrs }
                    </Typography>
                  </Button>
                </Link>
              </Grid>
              <Grid item xl={4} lg={4} md={4} xs={12}>
                <Link to={{ pathname: "/admin/new-casting", state: {filterCondition: progressCrFilterCondition, title: 'IN PROGRESS CASTING REQUEST'} }}>
                  <Button variant="contained" size="large"  fullWidth 
                    className={classNames(classes.button, classes.adminCastingRequestGroupButton)}
                  >
                    <Typography className={classes.adminCastingRequestGroupButtonTitle}>
                      IN PROGRESS
                    </Typography>
                    <Typography className={classNames(classes.adminCastingRequestGroupButtonSubTitle)}>
                      { progressCrs }
                    </Typography>
                  </Button>
                </Link>
              </Grid>
              <Grid item xl={4} lg={4} md={4} xs={12}>
                <Link to={{ pathname: "/admin/new-casting", state: {filterCondition: archiveCrFilterCondition, title: 'ARCHIVE CASTING REQUEST'} }}>
                  <Button variant="contained" size="large"  fullWidth 
                    className={classNames(classes.button, classes.adminCastingRequestGroupButton)}
                  >
                    <Typography className={classes.adminCastingRequestGroupButtonTitle}>
                      ARCHIVE
                    </Typography>
                    <Typography className={classNames(classes.adminCastingRequestGroupButtonSubTitle)}>
                      { archiveCrs }
                    </Typography>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={1}/>
          
          <Grid item xs={12}><Spacer size={10} /></Grid>
        </Grid>
      </Panel>
    );
  }

  render() {
    const { profile } = this.props;

    return (
      <AdminForm
        formTitle="CASTING REQUEST"
        nextLink="/admin/dashboard"
        nextButtonTitle="Agent Dashboard"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}


export default withStyles(adminStyles)(CastingRequests);
