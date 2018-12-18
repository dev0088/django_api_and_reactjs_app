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
import TextField from '@material-ui/core/TextField';

const styles = ({
  root: {
    flexGrow: 1,

  },

  button: {
    width :'400px',
    height :'40px',
  }

})

function ClientMainten(props) {
  const { classes } = props;
  return (
   <Grid container spacing={8}>
      <Grid item xs={12}>
        <Grid item xs={12} style={{textAlign: 'center'}}>
                <h1>ADD CLIENT</h1>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid itme xs={2}>
          <p><b>Client Name:</b></p>
        </Grid>
        <Grid item xs={10}>
          <TextField id="outlined-bare" className={classes.textField} margin="normal" variant="outlined" style={{textAlign: 'left', width:'700px', height:'30px'}}/>
        </Grid>
        <Grid itme xs={2}>
          <p><b>Contact Name:</b></p>
        </Grid>
        <Grid item xs={10}>
          <TextField id="outlined-bare" className={classes.textField} margin="normal" variant="outlined" style={{textAlign: 'left', width:'700px', height:'30px'}}/>
        </Grid>
        <Grid itme xs={2}>
          <p><b>Contact Email:</b></p>
        </Grid>
        <Grid item xs={10}>
          <TextField id="outlined-bare" className={classes.textField} margin="normal" variant="outlined" style={{textAlign: 'left', width:'700px', height:'30px'}}/>
        </Grid>
        <Grid itme xs={2}>
          <p><b>Contact Phone:</b></p>
        </Grid>
        <Grid item xs={10}>
          <TextField id="outlined-bare" className={classes.textField} margin="normal" variant="outlined" style={{textAlign: 'left', width:'700px', height:'30px'}}/>
        </Grid>
        <Grid itme xs={2}>
          <p><b>Client Address Line 1:</b></p>
        </Grid>
        <Grid item xs={10}>
          <TextField id="outlined-bare" className={classes.textField} margin="normal" variant="outlined" style={{textAlign: 'left', width:'700px', height:'30px'}}/>
        </Grid>
        <Grid itme xs={2}>
          <p><b>Client Address Line 2:</b></p>
        </Grid>
        <Grid item xs={10}>
          <TextField id="outlined-bare" className={classes.textField} margin="normal" variant="outlined" style={{textAlign: 'left', width:'700px', height:'30px'}}/>
        </Grid>
        <Grid itme xs={2}>
          <p><b>Client Address Line 3:</b></p>
        </Grid>
        <Grid item xs={10}>
          <TextField id="outlined-bare" className={classes.textField} margin="normal" variant="outlined" style={{textAlign: 'left', width:'700px', height:'30px'}}/>
        </Grid>
        <Grid container >
          <Grid item xs={12}>
            <p><b>PRIMARY LOGIN INFROMATION</b></p>
          </Grid>
          <Grid itme xs={2}>
            <p><b>Primary User Name:</b></p>
          </Grid>
          <Grid item xs={10}>
            <TextField id="outlined-bare" className={classes.textField} margin="normal" variant="outlined" style={{textAlign: 'left', width:'500px', height:'30px'}}/>
          </Grid>
          <Grid itme xs={2}>
            <p><b>Primary User Title:</b></p>
          </Grid>
          <Grid item xs={10}>
            <TextField id="outlined-bare" className={classes.textField} margin="normal" variant="outlined" style={{textAlign: 'left', width:'500px', height:'30px'}}/>
          </Grid>
          <Grid itme xs={2}>
            <p><b>Primary User Email:</b></p>
          </Grid>
          <Grid item xs={10}>
            <TextField id="outlined-bare" className={classes.textField} margin="normal" variant="outlined" style={{textAlign: 'left', width:'500px', height:'30px'}}/>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
           
           
          </Grid>
          <Grid item xs={6}>
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

ClientMainten.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClientMainten);