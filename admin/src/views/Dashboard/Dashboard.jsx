import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
// import dashboardRoutes from "../../routes/dashboard.jsx";

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
                <Button color="primary" className={classes.menuBtn} onClick={()=>{this.switchRoutes('/profile-search')}}>
                  PROFILE <br></br> SEARCH
                </Button>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'center'}}>
                <Button color="primary" className={classes.menuBtn} onClick={()=>{this.switchRoutes('/new-profiles')}}>
                  NEW <br></br> PROFILES
                </Button>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'center'}}>
                <Button color="primary" className={classes.menuBtn} onClick={()=>{this.switchRoutes('/edited-profiles')}}>
                  EDITED <br></br> PROFILES
                </Button>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'center'}}>
                <Button color="primary" className={classes.menuBtn} onClick={()=>{this.switchRoutes('/casting-requests')}}>
                  CASTING <br></br> REQUESTS
                </Button>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'center'}}>
                <Button color="primary" className={classes.menuBtn} onClick={()=>{this.switchRoutes('/metrics-tools')}}>
                  METRICS & <br></br> TOOLS
                </Button>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'center'}}>
                <Button color="primary" className={classes.menuBtn} onClick={()=>{this.switchRoutes('/dance-combo-lockouts')}}>
                  DANCE COMBO <br></br> LOCKOUTS
                </Button>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'center'}}>
                <Button color="primary" className={classes.menuBtn} onClick={()=>{this.switchRoutes('/medicial-disclosure')}}>
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

export default withStyles(style)(Dashboard);
