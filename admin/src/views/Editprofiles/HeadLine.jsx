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
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

const style = {
   button:{
     width: '500px',
    // fontSize: '25px'
  },
   small:{
    width: '15px',

   },
   agent:{
    width: '200px',
    height:'50px'
   },
   profile:{
    width: '300px'
   }
  
};
function EditProfile(props) {
  const { classes } = props;
  return (
          <Grid container spacing={24}>
            <Grid container spacing={8}>
             <Grid item xs={12} style={{textAlign: 'center'}}>
                <Button variant="contained" size="large" className={classes.button} >
                  Philip LaVerne(VDA222)
                </Button>
             </Grid>
             <Grid item xs={12} style={{textAlign: 'center'}}>
              <b>HEADLINE , BIO & RESUME</b>
             </Grid>
            </Grid>
            <Grid item xs={12} container spacing={0} style={{textAlign: 'left'}}>
              <b>HEADLINE</b>
              <TextField id="outlined-full-width" style={{ margin: 8 }} fullWidth margin="normal" variant="outlined" InputLabelProps={{shrink: true,}}/>
            </Grid>
            <Grid item xs={12} container spacing={0} style={{textAlign: 'left'}}>
              <b>BIO</b>
              <TextField id="outlined-full-width" style={{ margin: 8 }} fullWidth margin="normal" variant="outlined" InputLabelProps={{shrink: true,}}/>
            </Grid>
             <Grid container spacing={8}> 
              <Grid item xs={3} style={{textAlign:'center'}}/>
              <Grid item xs={3} style={{textAlign:'center'}}/>
              <Grid item xs={3} style={{textAlign:'center'}}/>
              <Grid item xs={3} style={{textAlign:'right'}}>
               <Link to="/admin/edit-profiles/edit-profile">
                <Button variant="contained" style={{width: '250px'}}>
                  Back to Profile
                </Button>
               </Link>
             </Grid>       
           </Grid>
         </Grid>  
  );
}

export default withStyles(style)(EditProfile);
