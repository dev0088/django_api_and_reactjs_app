import React from "react";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Panel from "components/general/panel";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AdminForm from 'components/shiptalent/forms/adminForm';
import Spacer from 'components/general/spacer';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';


class Dashboard extends React.Component {
  
  state = {
    newProfiles: 0,
    editProfiles: 0,
    castingRequests: 0,
    danceComboLockouts: 0,
    medicalDisclosures: 0
  };

  switchRoutes(path){
    this.props.history.push(path)
  }

  componentWillMount = () => {
    AdminAPI.getAgencyOverview((response, isFailed) => {
      if (isFailed) {}
      else this.setState({
        newProfiles: response.new_profiles,
        editProfiles: response.edit_profiles,
        castingRequests: response.casting_requests,
        danceComboLockouts: response.dance_combo_lockouts,
        medicalDisclosures: response.medical_disclousures,
      })
    })
  };
 
  renderContent(){
    const { classes } = this.props;
    const { newProfiles, editProfiles, castingRequests, danceComboLockouts, medicalDisclosures } = this.state;

    return(
        <div>
        <Grid container spacing={16}>
          <Grid item xs={12}><Spacer size={10} /></Grid>
          <Grid xs={1}/>
          <Grid item xs={10}>
            <Grid container spacing={32} direction="row" justify="column" alignItems="center">
              <Grid item xs={12}>
                <Link to='/admin/profile-search'>   
                  <Panel>
                    <Typography className={classes.adminCastingRequestGroupButtonTitle}>
                      PROFILE SEARCH
                    </Typography>
                  </Panel>
                </Link>
              </Grid>

              <Grid item xs={6}>
                <Link to={'/admin/new-profiles'}>   
                  <Panel>
                    <Typography className={classes.adminCastingRequestGroupButtonTitle}>
                      NEW PROFILE
                    </Typography>
                    <Spacer size={10} />
                    <Typography className={classNames(classes.adminCastingRequestGroupButtonSubTitle, classes.red)}>
                      {newProfiles}
                    </Typography>
                  </Panel>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link to='/admin/edit-profiles'>   
                  <Panel>
                    <Typography className={classes.adminCastingRequestGroupButtonTitle}>
                      EDIT PROFILE
                    </Typography>
                    <Spacer size={10} />
                    <Typography className={classNames(classes.adminCastingRequestGroupButtonSubTitle, classes.red)}>
                      {editProfiles}
                    </Typography>
                  </Panel>
                </Link>
              </Grid>

              <Grid item xs={6}>
                <Link to={'/admin/casting-requests'}>   
                  <Panel>
                    <Typography className={classes.adminCastingRequestGroupButtonTitle}>
                      CASTING REQUESTS
                    </Typography>
                    <Spacer size={10} />
                    <Typography className={classNames(classes.adminCastingRequestGroupButtonSubTitle, classes.red)}>
                      {castingRequests}
                    </Typography>
                  </Panel>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link to='/admin/metrics-tools'>   
                  <Panel>
                    <Typography className={classes.adminCastingRequestGroupButtonTitle}>
                      METRICS TOOLS
                    </Typography>
                    <Spacer size={10} />
                    <Typography className={classNames(classes.adminCastingRequestGroupButtonSubTitle, classes.red)}>
                    <Spacer size={24} />
                    </Typography>
                  </Panel>
                </Link>
              </Grid>

              <Grid item xs={6}>
                <Link to={'/admin/dance-combo-lockouts'}>   
                  <Panel>
                    <Typography className={classes.adminCastingRequestGroupButtonTitle}>
                      DANCE COMBO LOCKOUTS
                    </Typography>
                    <Spacer size={10} />
                    <Typography className={classNames(classes.adminCastingRequestGroupButtonSubTitle, classes.red)}>
                      {danceComboLockouts}
                    </Typography>
                  </Panel>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link to='/admin/medicial-disclosure'>   
                  <Panel>
                    <Typography className={classes.adminCastingRequestGroupButtonTitle}>
                      MEDICIAL DISCLOSURE
                    </Typography>
                    <Spacer size={10} />
                    <Typography className={classNames(classes.adminCastingRequestGroupButtonSubTitle, classes.red)}>
                      {medicalDisclosures}
                    </Typography>
                  </Panel>
                </Link>
              </Grid>

            </Grid>
          </Grid>
          <Grid xs={1}/>
        </Grid>
      </div>
    )
  }

  renderContentOld() {
    const { classes } = this.props;
    const { newProfiles, editProfiles, castingRequests, danceComboLockouts, medicalDisclosures } = this.state;
    return (
      <Panel>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12} style={{textAlign: 'center'}}>
                <h1>AGENT DASHBOARD</h1>
              </Grid>
              <Grid item xs={12} style={{textAlign: 'center'}}>
                <Button color="primary" className={classes.dashboardButton}  onClick={()=>{this.switchRoutes('/admin/profile-search')}}>
                  PROFILE <br></br> SEARCH
                </Button>
              </Grid>
              <Grid item xs={6} size={300} style={{textAlign: 'right'}}>
                <Button color="primary" className={classes.dashboardButton} onClick={()=>{this.switchRoutes('/admin/new-profiles')}}>
                  NEW <br></br> PROFILES
                </Button>
              </Grid>
              <Grid item xs={6} size={300} style={{textAlign: 'left'}}>
                <Button color="primary" className={classes.dashboardButton} onClick={()=>{this.switchRoutes('/admin/edit-profiles')}}>
                  EDITED <br></br> PROFILES
                </Button>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'right'}}>
                <Button color="primary" className={classes.dashboardButton} onClick={()=>{this.switchRoutes('/admin/casting-requests')}}>
                  CASTING <br></br> REQUESTS
                </Button>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'left'}}>
                <Button color="primary" className={classes.dashboardButton} onClick={()=>{this.switchRoutes('/admin/metrics-tools')}}>
                  METRICS & <br></br> TOOLS
                </Button>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'right'}}>
                <Button color="primary" className={classes.dashboardButton} onClick={()=>{this.switchRoutes('/admin/dance-combo-lockouts')}}>
                  DANCE COMBO <br></br> LOCKOUTS
                </Button>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'left'}}>
                <Button color="primary" className={classes.dashboardButton} onClick={()=>{this.switchRoutes('/admin/medicial-disclosure')}}>
                  MEDICIAL <br></br> DISCLOSURE
                </Button>
              </Grid>
              {/* <Grid item xs={12} style={{textAlign: 'right'}}>
                <Button color="primary" className={classes.backBtn}>Back to <br></br> Developer Overview</Button>
                <Button color="primary" className={classes.backBtn}>Back to <br></br> Portal Features</Button>
                <Button color="primary" className={classes.backBtn}>Back to <br></br> Portal Selection</Button>
              </Grid> */}
            </Grid>
          </div>
        </Panel>
    )
  }

  render() {
    return (
      <AdminForm
        formTitle="AGENT DASHBOARD"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}


export default withStyles(adminStyles)(Dashboard);
