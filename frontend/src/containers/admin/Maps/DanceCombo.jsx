import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from  "components/admin/Grid/GridItem.jsx";
import GridContainer from  "components/admin/Grid/GridContainer.jsx";
import Card from  "components/admin/Card/Card.jsx";
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from  "components/admin/Card/CardBody.jsx";
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

function DanceCombo(props) {
  const { classes } = props;
  return (
   <Grid container spacing={40}>
      <Grid item xs={12}>
        <Grid item xs={12} style={{textAlign: 'center'}}>
                <h1> DANCE COMBO METRICS</h1>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={16}>          
            <Grid item xs={12} md={4} >  
             <Button variant="contained" size="large" className={classes.button} >
               COMPLETION<br></br>PERCENTAGE
               </Button>
            </Grid>
            <Grid item xs={12} md={4} >  
              <Button variant="contained" size="large" className={classes.button} >
              NUMBER OF<br></br>ASSIGNMENTS
              </Button>
            </Grid>
            <Grid item xs={12} md={4} >    
             <Button variant="contained" size="large" className={classes.button} >
              SORT COMBOS<br></br>BY UPLOAD DATE
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
  );
}

DanceCombo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DanceCombo);