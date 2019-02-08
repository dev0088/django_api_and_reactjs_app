import React from "react";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import ProfileTable from "containers/admin/ProfileSearch/ProfileTable";
import Spacer from 'components/general/spacer';
import Card from  "components/admin/Card/Card.jsx";
import CardBody from  "components/admin/Card/CardBody.jsx";
import Grid from '@material-ui/core/Grid';
import GridItem from  "components/admin/Grid/GridItem.jsx";
import GridContainer from  "components/admin/Grid/GridContainer.jsx";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import * as talentActions from 'actions/talentActions';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';

class EditProfile extends React.Component {

  state = {
    isLoading: false,
    profile: null,
    profileId: null
  };

  getInfoFromProps = (props) => {
    const { location } = props;
    let profileId = (location && location.state && location.state.profileId) ? location.state.profileId : null;
    return { profileId };
  };

  handleGetProfileResponse = (response, isFailed) => {
    console.log('==== handleGetProfileResponse: response: ', response);
    if(isFailed) {

    } else {
      const { allPositionTypes, allSkills } = this.props;
      this.setState({profile: response, isLoading: false});
    }
  };

  componentWillMount() {
    const { profileId } = this.getInfoFromProps(this.props);
    
    if (profileId) {
      this.setState({isLoading: true}, () => {
        this.props.talentActions.getAllPositionTypes();
        this.props.talentActions.getAllSkills();
        AdminAPI.getProfile(profileId, this.handleGetProfileResponse);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    });
  }

  renderContent = () => {
    const { classes } = this.props;
    const { profile, isLoading } = this.state;

    return (
      <Panel>
         <Grid container spacing={40}>
            <Grid item xs={6}>
              <Grid container item xs={12} spacing={16}  >
               <Grid item xs={4} >
                <Link to="/admin/head-line">
                 <Button variant="contained" size="large" className={classes.agent}>
                    Headline, Bio& Resume
                 </Button>
                </Link>
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
                <Button variant="contained" size="large" className={classes.agent} style={{backgroundColor: 'yellow'}}>
                  Casting Requests
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent}>
                  Profile Notes
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent}>
                  Logs & Lockouts
                </Button>
              </Grid> 
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent}>
                  Search/Views
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent}>
                  Shares
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent}>
                  Blocks
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent}>
                  Ratings
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent}>
                  Contracts
                </Button>
              </Grid>
              <Grid item xs={4}> 
                <Button variant="contained" size="large" className={classes.agent} style={{backgroundColor: 'red'}}>
                  Medical
                </Button>
              </Grid>
              <Grid item xs={4}> 
                <Button variant="contained" size="large" className={classes.agent}>
                  Credentials
                </Button>
              </Grid>
              <Grid item xs={4}> 
                <Button variant="contained" size="large" className={classes.agent}>
                  Personal Info
                </Button>
              </Grid>
              <Grid item xs={4}> 
                <Button variant="contained" size="large" className={classes.agent}>
                  Immigration
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent}>
                  Languages
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent}>
                  Finance
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" size="large" className={classes.agent}>
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
        </Panel>
    );
  }

  render = () => {
    const { profile, isLoading } = this.state;
    const { allPositionTypes, allSkills } = this.props;
    console.log('==== isLoading: ', isLoading);
    return (
      <AdminForm
        talent={profile}
        allPositionTypes={allPositionTypes}
        allSkills={allSkills}
        loading={ isLoading /*!(allPositionTypes.isFetched && allSkills.isFetched)*/}
        showMale
        showPosition
        backLink="/admin/new-profiles"
        backButtonTitle="New Profiles"
        nextLink="/admin/dashboard"
        nextButtonTitle="Agent Dashboard"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  };
};

const mapStateToProps = state => {
  const { allPositionTypes, allSkills } = state;
  return {
    allPositionTypes, 
    allSkills
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(EditProfile));
