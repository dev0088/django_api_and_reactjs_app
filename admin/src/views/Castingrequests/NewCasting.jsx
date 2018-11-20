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
import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";

const styles = ({
  root: {
    flexGrow: 1,

  },

  button: {
    width :'600px',
    height :'50px',
  }

})

function NewCasting(props) {
  const { classes } = props;
  return (
    <Card>
      <CardBody>
        <Grid item xs={12}>
          <Grid item xs={12} style={{textAlign: 'center'}}>
            <h1> NEW CASTING REQUESTS</h1>
           </Grid>
        </Grid>
        <Grid container item xs={12} spacing={16}>
          <Grid item xs={12}>
           <Link to="/casting-request">
            <Button variant="contained" size="large" className={classes.button} >
             Carnival Cruise Line 020418
            </Button>
           </Link> 
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" size="large" className={classes.button} >
             Norwegian Cruise Line 0204108
            </Button> 
          </Grid> 
          <Grid container spacing={8}> 
            <Grid item xs={3} style={{textAlign:'center'}}/>
            <Grid item xs={3} style={{textAlign:'center'}}/>
            <Grid item xs={3} style={{textAlign:'center'}}/>
            <Grid item xs={3} style={{textAlign:'right'}}>
             <Link to="/casting-requests">
              <Button variant="contained" style={{width: '250px'}}>
               Casting Requests
              </Button>
             </Link>
            </Grid>  
            <Grid item xs={3} style={{textAlign:'center'}}/>
            <Grid item xs={3} style={{textAlign:'center'}}/>
            <Grid item xs={3} style={{textAlign:'center'}}/>
            <Grid item xs={3} style={{textAlign:'right'}}>
             <Link to="/dashboard">
              <Button variant="contained" style={{width: '250px'}}>
                Agetn Dashbord
              </Button>
             </Link>
            </Grid> 
           </Grid>          
        </Grid>
     </CardBody>
    </Card>
  );
}

NewCasting.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewCasting);
