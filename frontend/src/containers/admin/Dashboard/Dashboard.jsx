import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from  "components/admin/Card/Card.jsx";
import CardBody from  "components/admin/Card/CardBody.jsx";
import Button from  "components/admin/CustomButtons/Button.jsx";
import { adminStyles } from "styles/adminStyles";

const style = ({
  menuBtn:{
    backgroundColor: '#007bff',
    width: '300px',
    fontSize: '25px'
  },
  // backBtn:{
  //   backgroundColor: '#fda6a2',
  //   width: '150px',
  //   fontSize: '10px',
  //   color:'#000000'
  // },
  root: {
    flexGrow: 1,
  },
});

class Dashboard extends React.Component {
  
  switchRoutes(path){
    this.props.history.push(path)
  }

  render(){
    const { classes } = this.props;
    return(
      <Card>
        <CardBody>
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
                <Button color="primary" className={classes.dashboardButton} onClick={()=>{this.switchRoutes('/admin/edited-profiles')}}>
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
        </CardBody>
      </Card>
    )
  }  
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(adminStyles)(Dashboard);
