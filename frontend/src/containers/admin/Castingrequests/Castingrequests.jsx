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
    width :'300px',
    height :'200px',
  }

})

function Castingrequests(props) {
  const { classes } = props;
  return (
    <Card>
      <CardBody>
        <GridContainer>
          <Grid item xs={12}>
            <Grid item xs={12} style={{textAlign: 'center'}}>
                <h1> CASTING REQUESTES</h1>
            </Grid>
          </Grid>
          <Grid container xs={12} spacing={24} style={{textAlign: 'center'}}>
           <Grid item xs={12} md={4} > 
            <Link to="/admin/new-casting">   
              <Button variant="contained" size="large" className={classes.button} >
                NEW<br></br>2
              </Button>
            </Link>  
           </Grid>
           <Grid item xs={12} md={4} >    
            <Button variant="contained" size="large" className={classes.button} >
              IN PROGRESS<br></br>4
            </Button>
           </Grid>
           <Grid item xs={12} md={4} >    
            <Button variant="contained" size="large" className={classes.button} >
              ARCHIVE<br></br>
            </Button>
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
         </GridContainer>
      </CardBody>
    </Card>
  );
}

Castingrequests.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Castingrequests);
