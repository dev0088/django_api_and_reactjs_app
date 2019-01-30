import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from  "components/admin/Card/Card.jsx";

import CardBody from  "components/admin/Card/CardBody.jsx";
import Grid from '@material-ui/core/Grid';
import GridItem from  "components/admin/Grid/GridItem.jsx";
import GridContainer from  "components/admin/Grid/GridContainer.jsx";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';

const style = {
   button:{
    // backgroundColor: '#007bff',
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
function ViewProfile(props) {
  const { classes } = props;
  return (
           <Grid container spacing={40}>
             <Grid item xs={12} style={{textAlign: 'center'}}>
                <Button variant="contained" size="large" className={classes.button} >
                  Thomas Tomasello(ASD166)
                </Button>
             </Grid>
             <Grid container item xs={12} spacing={16}>
               <Grid item xs={12} style={{textAlign: 'center'}} >    
                <Button variant="contained" className={classes.small} >
                  Vocalist
                </Button>
                <Button variant="contained" className={classes.small} >
                  Dancer
                </Button>
                <Button variant="contained" className={classes.small} style={{backgroundColor: 'green'}}>
                  Actor
                </Button>
                <Button variant="contained"  className={classes.small} >
                  Aerial
                </Button>
                <Button variant="contained"  className={classes.small} style={{backgroundColor: 'green'}}>
                  +sing
                </Button>
                <Button variant="contained"  className={classes.small} style={{backgroundColor: 'green'}}>
                  +dance
                </Button>
                <Button variant="contained" className={classes.small} >
                  +move
                </Button>
                <Button variant="contained"  className={classes.small} >
                  +act
                </Button>
                <Button variant="contained"  className={classes.small} >
                  +play
                </Button>
                <Button variant="contained"  className={classes.small} >
                  Music
                </Button>
                <Button variant="contained"  className={classes.small} >
                  Staff
                </Button>
                <Button variant="contained"  className={classes.small} >
                  Youth
                </Button>
                 <Button variant="contained"  className={classes.small} >
                  Tech
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container item xs={12} spacing={16}  >
               <Grid item xs={4} >
                <Button variant="contained" size="large" className={classes.agent} style={{backgroundColor: 'red'}}>
                  Headline, Bio& Resume
                </Button>
               </Grid>
               <Grid item xs={4} >
                <Button variant="contained" size="large" className={classes.agent} style={{backgroundColor: 'red'}}>
                  Pictures
                </Button>
               </Grid>
               <Grid item xs={4} >
                <Button variant="contained" size="large" className={classes.agent} style={{backgroundColor: 'red'}}>
                  Videos
                </Button>
               </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent} >
                  Casting Requests
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent} >
                  Profile Notes
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent} >
                  Logs & Lockouts
                </Button>
              </Grid> 
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent} >
                  Search/Views
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent} >
                  Shares
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent} >
                  Blocks
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent} >
                  Ratings
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent} >
                  Contracts
                </Button>
              </Grid>
              <Grid item xs={4}> 
                <Button variant="contained" size="large" className={classes.agent} style={{backgroundColor: 'red'}}>
                  Medical
                </Button>
              </Grid>
              <Grid item xs={4}> 
                <Button variant="contained" size="large" className={classes.agent} >
                  Credentials
                </Button>
              </Grid>
              <Grid item xs={4}> 
                <Button variant="contained" size="large" className={classes.agent} style={{backgroundColor: 'red'}}>
                  Personal Info
                </Button>
              </Grid>
              <Grid item xs={4}> 
                <Button variant="contained" size="large" className={classes.agent} style={{backgroundColor: 'red'}}>
                  Immigration
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent} style={{backgroundColor: 'red'}}>
                  Languages
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent} >
                  Finance
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent} >
                  Calendar
                </Button>
              </Grid>
             </Grid>  
            </Grid>   
            <Grid item xs={6} >
              <Grid container spacing={0}> 
                <Grid item xs={12} style={{textAlign:'left'}}>
                  <h3> CURRENT STATUS</h3>
                </Grid>
                <Grid container spacing={0}>
                 <Grid item xs={12}>
                  <Checkbox value="checkedC" />Avaliable
                 </Grid>
                 <Grid item xs={12}>
                  <Checkbox value="checkedC" />Not Avaliable(Talent Calendar)
                 </Grid>
                 <Grid item xs={12}>  
                  <Checkbox value="checkedC" />Active Casting Request
                 </Grid>
                 <Grid item xs={12}>
                  <Checkbox value="checkedC" />Contracted
                 </Grid>
                 <Grid item xs={12}>  
                  <Checkbox value="checkedC" />Deployed until
                 </Grid>
                </Grid> 
                <Grid container spacing={24}> 
                  <Grid item xs={12} >
                    <Button variant="contained" size="large" className={classes.profile} style={{backgroundColor: '#007bff'}}>
                      PROFILE APPROVED
                    </Button>
                  </Grid>
                  <Grid item xs={12} >
                    <Button variant="contained" size="large" className={classes.profile} style={{backgroundColor: '#007bff'}}>
                      PROFILE PENDING
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid> 
            <Grid container spacing={8}> 
              <Grid item xs={3} style={{textAlign:'center'}}/>
              <Grid item xs={3} style={{textAlign:'center'}}/>
              <Grid item xs={3} style={{textAlign:'center'}}/>
              <Grid item xs={3} style={{textAlign:'right'}}>
               <Link to="/admin/new-profiles">
                <Button variant="contained" style={{width: '250px'}}>
                  New Profiles
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

export default withStyles(style)(ViewProfile);
