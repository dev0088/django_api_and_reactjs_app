import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import OverviewVideo from '../OverviewVideo';
import Spacer from 'components/general/spacer';
import { adminStyles } from 'styles';


class EditGreetingVideos extends React.Component  {

  state = {
    profile: null,
    videos: null,
    isLoading: false,
  };

  getInfoFromProps = (props) => {
    const { location } = props;
    let profile = (location && location.state && location.state.profile) ? location.state.profile : null;
    let videos = profile ? profile.talent_video_greetings : null;

    return { profile, videos };
  };

  // handleGetProfileResponse = (response, isFailed) => {
  //   console.log('==== handleGetProfileResponse: response: ', response);
  //   if(isFailed) {
  //     this.setState({sLoading: false});
  //   } else {
  //     this.setState({profile: response, pictures: response.talent_pictures, isLoading: false});
  //   }
  // };

  // componentWillReceiveProps = (nextProps) => {
  //   this.setState({...this.getInfoFromProps(nextProps), isLoading: true}, () => {
  //     const { profile } = this.state;
  //     if (profile) AdminAPI.getProfile(profile.id, this.handleGetProfileResponse);
  //   });
  // };

  renderContent() {
    const { classes } = this.props;
    const { videos, profile } = this.state;
    let emptyVideos = [];
    if (videos) {
      for (let i = 0; i < (4 - videos.length); i ++) {
        emptyVideos.push(
          <Grid item lg={3} md={4} xs={12} className={classes.centerText}>
            <OverviewVideo
              profile={profile}
              showStatus showCaption
              video={null}
              caption={'Other'} 
              link={"#"}
              key={`Other${i}`}
            />
          </Grid>
        )
      }
    }

    return (
      <Panel>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item xs={12}><Spacer size={30} /></Grid>
          <Grid item lg={2} md={1} xs={12}/>
          <Grid item lg={8} md={10} xs={12} >
            <Grid container spacing={24} justify="center" alignItems="center">
              {videos && videos.map(video => {
                <Grid item lg={3} md={4} xs={12} className={classes.centerText}>
                  <OverviewVideo
                    profile={profile}
                    showStatus showCaption
                    video={video}
                    caption={video.language} 
                    link={"#"}
                    key={video.language}
                  />
                </Grid>
              })}
              {emptyVideos}
            </Grid>
          </Grid>
          <Grid item lg={2} md={1} xs={12}/>
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
        formSubTitle="Video Greetings"
        nextLink={{pathname: "/admin/edit-profiles/edit-profile", state: {profileId: profile ? profile.id : null}}}
        nextButtonTitle="Back to Profile"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

export default withStyles(adminStyles)(EditGreetingVideos);
