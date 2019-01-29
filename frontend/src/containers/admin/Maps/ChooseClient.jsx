import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from "components/Card/CardBody.jsx";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = ({
  root: {
    flexGrow: 1,

  },

  button: {
    width :'400px',
    height :'40px',
  }

})



function ChooseClient(props) {
  const { classes } = props;
  return (
   <Grid container spacing={40}>
      <Grid item xs={12}>
        <Grid item xs={12} style={{textAlign: 'center'}}>
                <h1> CHOOSE CLIENT</h1>
        </Grid>
      </Grid>
      <Grid container spacing={24}>
       <Grid item xs={12}>
        <Grid container spacing={16}>          
          <Grid item xs={12} >    
            <Button variant="contained" size="large" className={classes.button} >
              Aida Cruises
            </Button>
          </Grid>
          <Grid item xs={12} >    
            <Button variant="contained" size="large" className={classes.button} >
              Celebrity Cruises
            </Button>
          </Grid>
          <Grid item xs={12} >    
            <Button variant="contained" size="large" className={classes.button} >
              Carnival Cruise Line
            </Button>
          </Grid>
          <Grid item xs={12} >    
            <Button variant="contained" size="large" className={classes.button} >
              Costa Cruises
            </Button>
          </Grid>
          <Grid item xs={12} >    
            <Button variant="contained" size="large" className={classes.button} >
              Crystal Cruises
            </Button>
          </Grid>
          <Grid item xs={12} >    
            <Button variant="contained" size="large" className={classes.button} >
              Cunard Line
            </Button>
          </Grid>
          <Grid item xs={12} >    
            <Button variant="contained" size="large" className={classes.button} >
              MSC Cruises
            </Button>
          </Grid>
          <Grid item xs={12} >    
            <Button variant="contained" size="large" className={classes.button} >
              Norwegian Cruise Line
            </Button>
          </Grid>
          <Grid item xs={12} >    
            <Button variant="contained" size="large" className={classes.button} >
             P&O Cruises
            </Button>
          </Grid>
          <Grid item xs={12} >    
            <Button variant="contained" size="large" className={classes.button} >
              Princess Cruises
            </Button>
          </Grid>
          <Grid item xs={12} >    
            <Button variant="contained" size="large" className={classes.button} >
             Royal Caribbean International
            </Button>
          </Grid>
          <Grid item xs={12} >    
            <Button variant="contained" size="large" className={classes.button} >
              RSW Productions
            </Button>
          </Grid>
        </Grid>
       </Grid>
      <Grid item xs={3} style={{textAlign:'center'}}/>
      <Grid item xs={3} style={{textAlign:'center'}}/>
      <Grid item xs={3} style={{textAlign:'center'}}/>
      <Grid item xs={3} style={{textAlign:'right'}}>
       <Link to="/admin/metrics-tools">
        <Button variant="contained" style={{width: '250px'}}>
          Metric & Tools
        </Button>
       </Link>
      </Grid>
    </Grid> 
   </Grid>
  );
}

ChooseClient.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChooseClient);