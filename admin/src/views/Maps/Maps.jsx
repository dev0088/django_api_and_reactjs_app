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
    width :'200px',
    height :'100px',
  }

})



function Metrics(props) {
  const { classes } = props;
  return (
   <Grid container spacing={40}>
      <Grid item xs={12}>
        <Grid item xs={12} style={{textAlign: 'center'}}>
                <h1> METRICS & TOOLS</h1>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={16}>          
            <Grid item xs={12} md={4} >  
              <Link to="/metric-tool">
               <Button variant="contained" size="large" className={classes.button} >
                    TELENT<br></br>METRICS
               </Button>
              </Link> 
            </Grid>
            <Grid item xs={12} md={4} >  
             <Link to="/choose-client">  
               <Button variant="contained" size="large" className={classes.button} >
                    CLIENT<br></br>METRICS
               </Button>
             </Link>
            </Grid>
            <Grid item xs={12} md={4} >
             <Link to="/dance-combo">    
              <Button variant="contained" size="large" className={classes.button} >
                  DANCE COMBO<br></br>METRICS
              </Button>
             </Link>
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={16}>          
            <Grid item xs={12} md={6} >
              <Link to="/add-edit" >
                <Button variant="contained" size="large" className={classes.button} >
                  ADD/EDIT<br></br>DANCE COMBO<br></br>VIDEOS
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={6} >
              <Link to="/add-video">    
                <Button variant="contained" size="large" className={classes.button} >
                  ADD/EDIT<br></br>INTERVIEW<br></br>QUESTIONS
                </Button>
              </Link>
            </Grid>
          </Grid>
      </Grid>      
      <Grid item xs={12}>
        <Grid container spacing={16}>          
            <Grid item xs={12} md={3} alignContent="flex-start"> 
              <Link to="/client-look">   
                <Button variant="contained" size="large" className={classes.button} >
                  CLIENT LOOKUP
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={3}>  
              <Link to="/client-mainten"> 
                <Button variant="contained" size="large" className={classes.button} >
                  CLIENT<br></br>MAINTENACE
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={3}> 
              <Link to="/add-client">  
                <Button variant="contained" size="large" className={classes.button} >
                  ADD CLIENT
                </Button>
              </Link>
             </Grid>
              <Grid item xs={12} md={3} >    
                <Button variant="contained" size="large" className={classes.button} >
                  VIEW<br></br>INVITATIONS
                </Button>
             </Grid>
          </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={16}>          
            <Grid item xs={12} md={6} alignContent="flex-end">    
                <Button variant="contained" size="large" className={classes.button} >
                  CLIENT<br></br>VIEW
                </Button>
            </Grid>
            <Grid item xs={12} md={6} >    
                <Button variant="contained" size="large" className={classes.button} >
                  TALENT VIEW
                </Button>
            </Grid>
          </Grid>
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
  );
}

Metrics.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Metrics);