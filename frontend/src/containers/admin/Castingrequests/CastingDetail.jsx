import React from "react";
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

const style = {
  
   button:{
    // backgroundColor: '#007bff',
    width: '500px',
    // fontSize: '25px'
  },
  pending:{
    // backgroundColor: '#007bff',
    width: '500px',
    backgroundColor:'yellow'
    // fontSize: '25px'
  },
  advise:{
    //backgroundColor: 'marron',
    width: '500px',
    // fontSize: '25px'
  },
    
};
function CastingRequest(props) {
  const { classes } = props;
  return (
      <Grid container spacing={16}>
        <Grid item xs={12} style={{textAlign:'center'}} spacing={8}>
          <h1>CASTING REQUEST DETAIL</h1><h2>CARNIVAL CRUISE LINE 020818</h2>
        </Grid> 
        <Grid item xs={12} spacing={8}>
          <Grid xs={12}>
           <Link to="/admin/edit-profiles/edit-profile">
            <Button variant="contained"  className={classes.pending} >
              Philip LaVerne(VDA222)
            </Button>
           </Link>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
         <Grid item xs={12}>
          <b><u> OFFER DETAILS</u></b><br></br>
          <b>Position:</b>Vocalist Who Dances and Acts<br></br>
          <b>Date Requested:</b>02/08/2018<br></br>
          <b>Full Employment Dates:</b>03/14/2018-09/12/2018<br></br>
          <b>Rehearsal Dates:</b>03/13/2018 - 04/16/2018<br></br>
          <b>Rehearsal Location:</b>Miami, FullSjip: Carnival Sensation<br></br>
          <b>Ship Development Date:</b>04/17/2018<br></br>
          <b>Rehearsal Wage:</b>$5,500/mo <br></br>
          <b>Performance Wage:</b> %5,500/mo<br></br>
          <b>Visa Requirements:</b> C1/D; Schenghen<br></br>
          <b>Comments:</b> Needs to cut hair to shoulder length.<br></br>
         </Grid>
        </Grid>
        <Grid container spacing={8}>
         <Grid item xs={12}>
          <Button variant="contained" className={classes.add} style={{width:'150px', height:'10px',border: '1px solid black'}}>
            Add Note
          </Button>
         </Grid>
         <Grid item xs={12}>
           <div style={{border: '1px solid black'}} >
            <p> 02/08/2018 09:48Z(BB): Philip emailed ST. Accetped position.</p>
            <p> 02/08/2018 13:26Z(BB): Philip contacted. Will double check schedule. Advised him that he needs to keep him </p>
            <p> Calendar updated at all times.</p>
           </div>
         </Grid>
        </Grid>
        <Grid item xs={3} style={{textAlign:'center'}}/>
        <Grid item xs={3} style={{textAlign:'center'}}/>
        <Grid item xs={3} style={{textAlign:'center'}}/>
        <Grid item xs={3} style={{textAlign:'right'}}>
         <Link to="/admin/casting-request">
          <Button variant="contained" style={{width: '250px'}}>
            Casting Request
          </Button>
         </Link>
        </Grid> 
      </Grid>  
      
  );
}

export default withStyles(style)(CastingRequest);
