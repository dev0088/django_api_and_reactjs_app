import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import ProfilePicture from './ProfilePicture';
import Spacer from 'components/general/spacer';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';


class ProfilePcitures extends React.Component  {

  state = {
    profile: null,
    pictures: null
  };

  getInfoFromProps = (props) => {
    const { location } = props;
    let profile = (location && location.state && location.state.profile) ? location.state.profile : null;
    let pictures = null;
    if (profile) {
      pictures = profile.talent_pictures;
    }

    return { profile, pictures };
  };

  componentWillMount = () => {
    this.setState({...this.getInfoFromProps(this.state)});
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({...this.getInfoFromProps(nextProps)});
  };

  renderContent() {
    const { classes } = this.props;
    const { pictures, profile } = this.state;

    return (
      <Panel>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item xs={12}><Spacer size={30} /></Grid>
          <Grid xs={12} >
            <Grid container spacing={24} justify="center" alignItems="center">
              <Grid item lg md={12} xs={12} />
              <Grid item lg={2} md={4} xs={12} className={classes.centerText}>
                <ProfilePicture profile={profile} showStatus showCaption picture={pictures ? pictures[0] : null} />
              </Grid>
              <Grid item lg={2} md={4} xs={12} className={classes.centerText}>
                <ProfilePicture profile={profile} showStatus showCaption picture={pictures ? pictures[1] : null} />
              </Grid>
              <Grid item lg={2} md={4} xs={12} className={classes.centerText}>
                <ProfilePicture profile={profile} showStatus showCaption picture={pictures ? pictures[2] : null} />
              </Grid>
              <Grid item lg md={12} xs={12} />
            </Grid>
          </Grid>

          <Grid item xs={12}><Spacer size={30} /></Grid>
         
          <Grid xs={12} >
            <Grid container spacing={24} justify="center" alignItems="center">
              <Grid item lg md={12} xs={12} />
              <Grid item lg={2} md={3} xs={12} className={classes.centerText}>
                <ProfilePicture profile={profile} showStatus showCaption picture={pictures ? pictures[3] : null} />
              </Grid>
              <Grid item lg={2} md={3} xs={12} className={classes.centerText}>
                <ProfilePicture profile={profile} showStatus showCaption picture={pictures ? pictures[4] : null} />
              </Grid>
              <Grid item lg={2} md={3} xs={12} className={classes.centerText}>
                <ProfilePicture profile={profile} showStatus showCaption picture={pictures ? pictures[5] : null} />
              </Grid>
              <Grid item lg={2} md={3} xs={12} className={classes.centerText}>
                <ProfilePicture profile={profile} showStatus showCaption picture={pictures ? pictures[6] : null} />
              </Grid>
              <Grid item lg={2} md={3} xs={12} className={classes.centerText}>
                <ProfilePicture profile={profile} showStatus showCaption picture={pictures ? pictures[7] : null} />
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
    const { profile } = this.state;
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

export default withStyles(adminStyles)(ProfilePcitures);
