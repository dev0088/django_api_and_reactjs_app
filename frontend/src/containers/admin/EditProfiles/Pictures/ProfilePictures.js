import React from "react";
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import ProfilePicture from './ProfilePicture';
import Spacer from 'components/general/spacer';
import { getPictureByCaption } from 'utils/appUtils';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';


class ProfilePcitures extends React.Component  {

  state = {
    pictures: null,
    isLoading: false,
  };

  getInfoFromProps = (props) => {
    const { profile, location } = props;
    let pictures = null;
    if (profile) {
      pictures = profile.talent_pictures;
    }

    return { pictures };
  };


  componentWillMount = () => {
    this.setState({...this.getInfoFromProps(this.props)});
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({...this.getInfoFromProps(nextProps)});
  };

  renderContent() {
    const { classes } = this.props;
    const { pictures } = this.state;

    return (
      <Panel>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item xs={12}><Spacer size={30} /></Grid>
          <Grid xs={12} >
            <Grid container spacing={24} justify="center" alignItems="center">
              <Grid item lg md={12} xs={12} />
              <Grid item lg={2} md={4} xs={12} className={classes.centerText}>
                <ProfilePicture showStatus showCaption picture={getPictureByCaption(pictures, 'My Current Headshot')} caption='My Current Headshot' />
              </Grid>
              <Grid item lg={2} md={4} xs={12} className={classes.centerText}>
                <ProfilePicture showStatus showCaption picture={getPictureByCaption(pictures, 'My Current Body Shot 1')} caption='My Current Body Shot 1' />
              </Grid>
              <Grid item lg={2} md={4} xs={12} className={classes.centerText}>
                <ProfilePicture showStatus showCaption picture={getPictureByCaption(pictures, 'My Current Body Shot 2')} caption='My Current Body Shot 2' />
              </Grid>
              <Grid item lg md={12} xs={12} />
            </Grid>
          </Grid>

          <Grid item xs={12}><Spacer size={30} /></Grid>
         
          <Grid xs={12} >
            <Grid container spacing={24} justify="center" alignItems="center">
              <Grid item lg md={12} xs={12} />
              <Grid item lg={2} md={3} xs={12} className={classes.centerText}>
                <ProfilePicture showStatus showCaption picture={getPictureByCaption(pictures, 'My Other Pic 1')} caption='My Other Pic 1' />
              </Grid>
              <Grid item lg={2} md={3} xs={12} className={classes.centerText}>
                <ProfilePicture howStatus showCaption picture={getPictureByCaption(pictures, 'My Other Pic 2')} caption='My Other Pic 2' />
              </Grid>
              <Grid item lg={2} md={3} xs={12} className={classes.centerText}>
                <ProfilePicture showStatus showCaption picture={getPictureByCaption(pictures, 'My Other Pic 3')} caption='My Other Pic 3' />
              </Grid>
              <Grid item lg={2} md={3} xs={12} className={classes.centerText}>
                <ProfilePicture showStatus showCaption picture={getPictureByCaption(pictures, 'My Other Pic 4')} caption='My Other Pic 4' />
              </Grid>
              <Grid item lg={2} md={3} xs={12} className={classes.centerText}>
                <ProfilePicture showStatus showCaption picture={getPictureByCaption(pictures, 'My Other Pic 5')} caption='My Other Pic 5' />
              </Grid>
              <Grid item lg md={12} xs={12} />
            </Grid>
          </Grid>
          <Grid item xs={12}><Spacer size={30} /></Grid>
        </Grid>
      </Panel>
    );
  }

  render() {
    const { profile } = this.props;
    return (
      <AdminForm
        talent={profile}
        showName
        formSubTitle="Pictures"
        nextLink={{pathname: "/admin/edit-profiles/edit-profile", state: {profileId: profile ? profile.id : null}}}
        nextButtonTitle="Back to Profile"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

const mapStateToProps = state => {
  const { auth, talentInfo } = state;
  return {
    auth,
    profile: talentInfo.value
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(ProfilePcitures));
