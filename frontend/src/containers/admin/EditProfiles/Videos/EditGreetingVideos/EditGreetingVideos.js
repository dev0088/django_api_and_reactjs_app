import React from "react";
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Panel from "components/general/panel";
import Spacer from 'components/general/spacer';
import AdminForm from 'components/shiptalent/forms/adminForm';
import OverviewVideo from '../OverviewVideo';
import IntervewVideoItem from '../InterviewVideos/InterviewVideoItem';
import { getLiveVideosByPositionName, getCurrentTalentPositionName } from 'utils/appUtils';
import { adminStyles } from 'styles';


class EditGreetingVideos extends React.Component  {

  state = {
  };

  getInfoFromProps = (props) => {
    // const { profile, location } = props;
    // let profile = (location && location.state && location.state.profile) ? location.state.profile : null;
    // let videos = profile ? profile.talent_video_greetings : null;

    return {};
  };

  componentWillMount = () => {
    this.setState({...this.getInfoFromProps(this.props)});
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({...this.getInfoFromProps(nextProps)});
  };

  renderContent() {
    const { profile, classes } = this.props;
    let videos = profile ? profile.talent_video_greetings : null;
    let emptyVideos = [];

    if (videos) {
      for (let i = 0; i < (4 - videos.length); i ++) {
        emptyVideos.push(
          <Grid item lg={3} md={4} xs={12} className={classes.centerText}>
            <OverviewVideo
              showStatus showCaption
              video={null}
              caption={`Other ${i + 1}`} 
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
                return (
                  <Grid item lg={3} md={4} xs={12} className={classes.centerText}>
                    <OverviewVideo
                      showStatus showCaption
                      video={video}
                      caption={video.language} 
                      link={{pathname: "/admin/edit-profiles/profile-videos/edit-greeting-video", state: {video}}}
                      key={video.language}
                    />
                  </Grid>
                )
              })}
              {emptyVideos}
            </Grid>
          </Grid>
          <Grid item lg={2} md={1} xs={12}/>
          <Grid item xs={12}><Spacer size={15} /></Grid>
          <Grid item xs={12}>
            <IntervewVideoItem videos={profile && getLiveVideosByPositionName(profile.talent_videos, getCurrentTalentPositionName(profile))} />
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
        formSubTitle="Video Greetings"
        nextLink={{pathname: "/admin/edit-profiles/profile-videos"}}
        nextButtonTitle="Back to VIDEOS"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  const { talentInfo } = state;
  return {
    profile: talentInfo.value
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(EditGreetingVideos));