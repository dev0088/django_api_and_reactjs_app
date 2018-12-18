import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";

import CardBody from "components/Card/CardBody.jsx";
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const style = {
  
   button:{
     width: '500px',
    // fontSize: '25px'
  },
};

function CastingRequest(props) {
  const { classes } = props;
  return (
      <Grid container spacing={40}>
        <Grid item xs={12} style={{textAlign:'center'}}>
          <h1>CASTING REQUEST</h1><h1>CARNIVAL CRUISE LINE 020818</h1>
        </Grid> 
        <Grid container item xs={12} spacing={16}>
          <Grid item xs={12} style={{textAlign:'left'}}>
           <Link to="/admin/casting-detail">
            <Button variant="contained" className={classes.button} style={{backgroundColor:'yellow'}}>
              Philip LaVerne(VDA222)
            </Button>
           </Link>
          </Grid>
          <Grid item xs={12} style={{textAlign:'left'}}>
           <Button variant="contained"  className={classes.button} >
              Chirstine Culpepper(VDA214)
           </Button>
          </Grid>
          <Grid itme xs={12} style={{textAlign:'left'}}> 
           <Button variant="contained"  className={classes.button} >
              Katrina Karst-Melroy(DSA176)
           </Button>
          </Grid>
          <Grid item xs={12} style={{textAlign:'left'}}>
           <Button variant="contained"  className={classes.button} >
            Jacob Julian Smith (ESD169)
           </Button>
          </Grid>          
        </Grid>
        <Grid container spacing={8}>
         <Grid item xs={12}>
          <Button variant="contained" className={classes.add} style={{width:'100px', height:'10px'}}>
            Add Note
          </Button>
         </Grid>
         <Grid item xs={12}>
           <div style={{border: '1px solid black'}} >
            <p> 02/08/2018 09:48Z(BB): Called Client to confirm request. Spoke to Dmitri Zolynski.</p>
            <p> 02/08/2018 13:26Z(BB): Emailed Dmitri with update. Philp accepted; Katrina considering; Chirstine not yet reached; Jacob</p>
            <p> processed and ticked</p>
           </div>
         </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox value="checkedC" />} label="Client Contacted to Confirm Receipt of Reuest (date) " />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox value="checkedC" />} label="Request Completed (date) " />
          </Grid>
        </Grid>
        <Grid container spacing={8}> 
         <Grid item xs={3} style={{textAlign:'center'}}/>
         <Grid item xs={3} style={{textAlign:'center'}}/>
         <Grid item xs={3} style={{textAlign:'center'}}/>
         <Grid item xs={3} style={{textAlign:'right'}}>
          <Link to="/admin/casting-requests">
           <Button variant="contained" style={{width: '250px'}}>
            Casting Requests
           </Button>
          </Link>
         </Grid>  
         <Grid item xs={3} style={{textAlign:'center'}}/>
         <Grid item xs={3} style={{textAlign:'center'}}/>
         <Grid item xs={3} style={{textAlign:'center'}}/>
         <Grid item xs={3} style={{textAlign:'right'}}>
          <Link to="/admin/dashboard">
           <Button variant="contained" style={{width: '250px'}}>
             Agetn Dashbord
           </Button>
          </Link>
         </Grid> 
        </Grid> 
       </Grid>  
     
  );
}
CastingRequest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(CastingRequest);
