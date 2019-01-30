import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Quote from  "components/admin/Typography/Quote.jsx";
import Muted from  "components/admin/Typography/Muted.jsx";
import Primary from  "components/admin/Typography/Primary.jsx";
import Info from  "components/admin/Typography/Info.jsx";
import Success from  "components/admin/Typography/Success.jsx";
import Warning from  "components/admin/Typography/Warning.jsx";
import Danger from  "components/admin/Typography/Danger.jsx";
import Card from  "components/admin/Card/Card.jsx";

import CardBody from  "components/admin/Card/CardBody.jsx";
import Grid from '@material-ui/core/Grid';
import GridItem from  "components/admin/Grid/GridItem.jsx";
import GridContainer from  "components/admin/Grid/GridContainer.jsx";
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
  // cardCategoryWhite: {
  //   color: "rgba(255,255,255,.62)",
  //   margin: "0",
  //   fontSize: "14px",
  //   marginTop: "0",
  //   marginBottom: "0"
  // },
  // cardTitleWhite: {
  //   color: "#FFFFFF",
  //   marginTop: "0px",
  //   minHeight: "auto",
  //   fontWeight: "300",
  //   fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  //   marginBottom: "3px",
  //   textDecoration: "none"
  // }
};
function Editprofiles(props) {
  const { classes } = props;
  return (
    <Card>
      <CardBody>
        <div>
          <Grid container spacing={24}>
             <Grid item xs={12} style={{textAlign: 'center'}}>
              <h1> EDITOR PROFILES</h1>
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
                  Katrina Karst-Melroy(DSA176)
                </Button>
             </Grid>
             <Grid item xs={12} style={{textAlign: 'left'}}>    
                <Button variant="contained" size="large" className={classes.button} >
                  Jacob Julian Smith(ESD169)
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

export default withStyles(style)(Editprofiles);
