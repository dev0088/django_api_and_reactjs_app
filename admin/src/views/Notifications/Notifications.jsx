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
import { Link } from 'react-router-dom';

const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    // fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
   button:{
    // backgroundColor: '#007bff',
    width: '500px',
    // fontSize: '25px'
  },
  
};
function TypographyPage(props) {
  const { classes } = props;
  return (
    <Card>
      <CardBody>
        <div>
          <Grid container spacing={24}>
             <Grid item xs={12} style={{textAlign: 'center'}}>
              <h1> DANCE COMBO LOCK OUTS</h1>
             </Grid>
             <Grid item xs={12} style={{textAlign: 'left'}}>
              <Link to="/admin/edit-profiles/edit-profile">    
                <Button variant="contained" size="large" className={classes.button} >
                  Philip LaVerne(VDA222)
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} style={{textAlign: 'left'}}>    
                <Button variant="contained" size="large" className={classes.button} >
                  Frank Delroy(VD102)
                </Button>
            </Grid>
            <Grid item xs={12} style={{textAlign: 'left'}}>    
                <Button variant="contained" size="large" className={classes.button} >
                  Kimberly Jhnston(DSA113)
                </Button>
             </Grid>
             <Grid item xs={12} style={{textAlign: 'left'}}>    
                <Button variant="contained" size="large" className={classes.button} >
                  Missy Elliott(ESDA179)
                </Button>
             </Grid>
             <Grid item xs={12} style={{textAlign: 'left'}}>    
                <Button variant="contained" size="large" className={classes.button} >
                 JJ Abrams(VMA223)
                </Button>
             </Grid>
             <Grid item xs={12} style={{textAlign: 'left'}}>    
                <Button variant="contained" size="large" className={classes.button} >
                  Jonathan Smith(VM135)
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
        </div>
      </CardBody>
    </Card>
  );
}

export default withStyles(style)(TypographyPage);
