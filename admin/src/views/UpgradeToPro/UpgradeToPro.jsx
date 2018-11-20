import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
// core components
import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Success from "components/Typography/Success.jsx";
import Button from '@material-ui/core/Button';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { Link } from 'react-router-dom';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  button:{
    // backgroundColor: '#007bff',
    width: '500px',
    // fontSize: '25px'
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  tableUpgradeWrapper: {
    display: "block",
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    MsOverflowStyle: "-ms-autohiding-scrollbar"
  },
  table: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: "1rem",
    backgroundColor: "transparent",
    borderCollapse: "collapse",
    display: "table",
    borderSpacing: "2px",
    borderColor: "grey",
    "& thdead tr th": {
      fontSize: "1.063rem",
      padding: "12px 8px",
      verticalAlign: "middle",
      fontWeight: "300",
      borderTopWidth: "0",
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      textAlign: "inherit"
    },
    "& tbody tr td": {
      padding: "12px 8px",
      verticalAlign: "middle",
      borderTop: "1px solid rgba(0, 0, 0, 0.06)"
    },
    "& td, & th": {
      display: "table-cell"
    }
  },
  center: {
    textAlign: "center"
  }
};

function UpgradeToPro(props) {
  const { classes } = props;
  return (
     <Card>
      <CardBody>
        <div>
          <Grid container spacing={24}>
             <Grid item xs={12} style={{textAlign: 'center'}}>
              <h1> MEDICAL DISCLOSURE</h1>
             </Grid>
             <Grid item xs={12} style={{textAlign: 'left'}}>
              <Link to="/edit-profiles/edit-profile">    
                <Button variant="contained" size="large" className={classes.button} >
                  Philip LaVerne(VDA222)
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} style={{textAlign: 'left'}}>    
                <Button variant="contained" size="large" className={classes.button} >
                  Justin Tomberlake(ESDA144)
                </Button>
            </Grid>
            <Grid item xs={12} style={{textAlign: 'left'}}>    
                <Button variant="contained" size="large" className={classes.button} >
                  Liberty Franklin(DSA266)
                </Button>
             </Grid>
             <Grid item xs={12} style={{textAlign: 'left'}}>    
                <Button variant="contained" size="large" className={classes.button} >
                  Candice Clearwater(VSDA211)
                </Button>
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
        </div>
      </CardBody>
    </Card>
  );
}

export default withStyles(styles)(UpgradeToPro);
