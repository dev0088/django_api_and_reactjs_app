import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from '@material-ui/core/Button';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Grid from '@material-ui/core/Grid';
import avatar from "assets/img/faces/marc.jpg";
import { Link } from 'react-router-dom';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  // const style = ({
  button:{
    // backgroundColor: '#007bff',
    width: '500px',
    fontSize: '25px'
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
class UserProfile extends React.Component {
  
  switchRoutes(path){
    this.props.history.push(path)
  }

  render(){
    const { classes } = this.props;
    return(
// function UserProfile(props) {
//   const { classes } = props;
  // return (
        <Card>
          <CardBody>
            <div>
              <Grid container spacing={24}>
                <Grid item xs={12} style={{textAlign: 'center'}}>
                  <h1> NEW PORFILES FOR APPROVAL</h1>
                </Grid>
                <Grid item xs={12} style={{textAlign: 'left'}}>  
                 <Link to="/view-profile">
                  <Button variant="contained" size="large" className={classes.button} >
                    Thomas Tomasello(VM213)
                  </Button>
                 </Link>
                </Grid>
                <Grid item xs={12} style={{textAlign: 'left'}}>    
                  <Button variant="contained" size="large" className={classes.button} >
                    Kirsten Mallow(VM213)
                  </Button>
                </Grid>
                <Grid item xs={12} style={{textAlign: 'left'}}>    
                  <Button variant="contained" size="large" className={classes.button} >
                    Tristan Turnbull(TU147)
                  </Button>
                 </Grid>
                 <Grid item xs={12} style={{textAlign: 'left'}}>    
                  <Button variant="contained" size="large" className={classes.button} >
                    Candy Cooke(C148)
                  </Button>
                 </Grid>
                 <Grid item xs={12} style={{textAlign: 'left'}}>    
                  <Button variant="contained" size="large" className={classes.button} >
                    D'Arcy Dell(DSA197)
                  </Button>
                 </Grid>
                 <Grid item xs={12} style={{textAlign: 'left'}}>    
                  <Button variant="contained" size="large" className={classes.button} >
                    Amy Arello(VMA229)
                  </Button>
                 </Grid>
                 <Grid item xs={12} style={{textAlign: 'left'}}>    
                  <Button variant="contained" size="large" className={classes.button} onClick={()=>{this.switchRoutes('/profile-search')}}>
                    Francine Funicello(ED116)
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
//   );
// }
    )
  }  
}

export default withStyles(styles)(UserProfile);
