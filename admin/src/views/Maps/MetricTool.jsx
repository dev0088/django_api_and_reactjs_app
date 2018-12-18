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



function MetricTool(props) {
  const { classes } = props;
  return (
   <Grid container spacing={40}>
      <Grid item xs={12}>
        <Grid item xs={12} style={{textAlign: 'center'}}>
                <h1> TALENT METRICS</h1>
        </Grid>
      </Grid>
      <Grid container spacing={24}>
       <Grid item xs={12}>
        <Grid container spacing={16}>          
          <Grid item xs={12} md={3} alignContent="flex-start">    
            <Button variant="contained" size="large" className={classes.button} >
              LIST ALL TALENT<br></br>(ALPHA)
            </Button>
          </Grid>
          <Grid item xs={12} md={3} >    
            <Button variant="contained" size="large" className={classes.button} >
              LIST ALL TALENT<br></br>(ALPHA)
            </Button>
          </Grid>
          <Grid item xs={12} md={3} >    
            <Button variant="contained" size="large" className={classes.button} >
              SORT TALENT BY<br></br>LOGIN DATE
            </Button>
           </Grid>
           <Grid item xs={12} md={3} >    
            <Button variant="contained" size="large" className={classes.button} >
              SORT TALENT BY<br></br>TIME ONLINE
            </Button>
           </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <Grid container spacing={16}>          
          <Grid item xs={12} md={3} alignContent="flex-start">    
            <Button variant="contained" size="large" className={classes.button} >
              SORT TALENT BY<br></br>SEARCH<br></br>RETURNS
            </Button>
          </Grid>
          <Grid item xs={12} md={3} >    
            <Button variant="contained" size="large" className={classes.button} >
              SORT TALENT BY<br></br>VIEWS
            </Button>
          </Grid>
          <Grid item xs={12} md={3} >    
            <Button variant="contained" size="large" className={classes.button} >
              SORT TALENT<br></br>SHARES
            </Button>
          </Grid>
          <Grid item xs={12} md={3} >    
            <Button variant="contained" size="large" className={classes.button} >
              SORT TALENT BY<br></br>BLOCKS
            </Button>
          </Grid>
         </Grid>
        </Grid>
        <Grid item xs={12}>
        <Grid container spacing={16}>          
          <Grid item xs={12} md={3} alignContent="flex-start">    
            <Button variant="contained" size="large" className={classes.button} >
              SORT TALENT BY<br></br>RATING
            </Button>
          </Grid>
          <Grid item xs={12} md={3} >    
            <Button variant="contained" size="large" className={classes.button} >
              SORT TALENT BY<br></br>BLOCKS
            </Button>
          </Grid>
          <Grid item xs={12} md={3} >    
            <Button variant="contained" size="large" className={classes.button} >
              SORT TALENT BY<br></br>NATIONALITY
            </Button>
           </Grid>
           <Grid item xs={12} md={3} >    
            <Button variant="contained" size="large" className={classes.button} >
              SORT TALENT BY<br></br>CASTING<br></br>REQUESTS
            </Button>
           </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <Grid container spacing={16}>          
          <Grid item xs={12} md={3} alignContent="flex-start">    
            <Button variant="contained" size="large" className={classes.button} >
              SHOW TALENT<br></br>WITH MEICAL
            </Button>
          </Grid>
          <Grid item xs={12} md={3} >    
            <Button variant="contained" size="large" className={classes.button} >
              SPROT TALENT BY<br></br>COMBO<br></br>LOCKOUTS
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

MetricTool.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MetricTool);