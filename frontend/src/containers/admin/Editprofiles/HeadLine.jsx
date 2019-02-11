import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import OverviewResume from './Resume/OverviewResume';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';


class HeadLine extends React.Component  {

  state = {
    profile: null,
    headLine: '',
    bio: '',
    isChanged: false
  };

  getInfoFromProps = (props) => {
    const { location } = props;
    let profile = (location && location.state && location.state.profile) ? location.state.profile : null;
    let headLine = '';
    let bio = '';
    if (profile) {
      headLine = profile.head_line;
      bio = profile.bio;
    }

    return { profile, headLine, bio, isChanged: false };
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({...this.getInfoFromProps(nextProps)});
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      isChanged: true
    });
  };

  handleClickSave = () => {
    const { profile, headLine, bio } = this.state;
    let data = {
      head_line: headLine,
      bio
    };
    AdminAPI.saveProfile(profile.user.id, data, this.handleSaveResponse);
  }

  handleSaveResponse = (response, isFailed) => {
    if (!isFailed) this.setState({ isChanged: false });
  };

  handleClickCancel = () => {
    this.setState({
      ...this.getInfoFromProps(this.props)
    })
  }

  renderContent() {
    const { classes } = this.props;
    const { headLine, bio, isChanged, profile } = this.state;

    return (
      <Panel>
        <Grid container spacing={24}>
          <Grid item md={8} xs={12} style={{textAlign: 'left'}}>
            <Grid container spacing={24}>
              <Grid item xs={12} container spacing={0} style={{textAlign: 'left'}}>
                <b>HEADLINE</b>
                <TextField id="outlined-full-width" style={{ margin: 8 }} fullWidth margin="normal" variant="outlined" InputLabelProps={{shrink: true,}}
                  value={headLine}
                  onChange={this.handleChange('headLine')}
                />
              </Grid>
              <Grid item xs={12} container spacing={0} style={{textAlign: 'left'}}>
                <b>BIO</b>
                <TextField id="outlined-full-width" style={{ margin: 8 }} fullWidth margin="normal" variant="outlined" InputLabelProps={{shrink: true,}}
                  multiline
                  rowsMax="10"
                  value={bio}
                  onChange={this.handleChange('bio')}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={8} direction="row" justify="flex-end" alignItems="center"> 
                  <Grid item xs></Grid>
                  <Grid item xs className={classes.rightText}>
                    <Button variant="outlined" color="primary" disabled={!isChanged} className={[classes.button, classes.adminSaveButton]} onClick={this.handleClickSave}>
                      Save
                    </Button>
                    <Button variant="outlined" color="primary" disabled={!isChanged} className={[classes.button, classes.adminSaveButton]} onClick={this.handleClickCancel}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} xs={12}>
            <OverviewResume profile={profile} showStatus link={{pathname: "/admin/resume", state: {profile: profile}}}/>
          </Grid>
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
        formSubTitle="HEADLINE, BIO & RESUME"
        nextLink={{pathname: "/admin/edit-profiles/edit-profile", state: {profileId: profile ? profile.id : null}}}
        nextButtonTitle="Back to Profile"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

export default withStyles(adminStyles)(HeadLine);
