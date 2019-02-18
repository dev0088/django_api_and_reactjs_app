import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Panel from 'components/general/panel';
import VideoPlayer from 'components/shiptalent/videos/videoPlayer';
import AdminForm from 'components/shiptalent/forms/adminForm';
import QuestionSelection from './QuestionSelection';
import { getLiveVideos } from 'utils/appUtils';
import defaultValues from 'constants/defaultValues';
import * as talentActions from 'actions/talentActions';
import { adminStyles } from 'styles';
import TechnicianQuestionSelection from './TechnicianQuestionSelection';


class LiveInterviewVideo extends Component  {

  state = {
    videos: null,
    selectedQuestionId: 0
  };

  getInfoFromProps = (props) => {
    const { profile } = props;
    let videos = (profile && profile.talent_videos) ? getLiveVideos(profile.talent_videos) : [];
    return { videos };
  };

  componentWillMount = () => {
    this.setState({...this.getInfoFromProps(this.props)});
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({...this.getInfoFromNextProps(nextProps)});
  };

  handleChange = selectedQuestionId => {
    this.setState({ selectedQuestionId: selectedQuestionId });
  };

  renderContent() {
    const { selectedQuestionId, videos } = this.state;
    const { profile, classes } = this.props;
    const video = videos ? videos[selectedQuestionId] : 0;
    const positionType = (profile && profile.talent_position_types && profile.talent_position_types[0]) 
                          ? profile.talent_position_types[0] : null;
    const subPositionType = (profile && profile.talent_position_sub_types && profile.talent_position_sub_types[0]) 
                          ? profile.talent_position_sub_types[0].position_sub_type : null;
    return (
      <Panel>
        <Grid container spacing={24}>
          <Grid item md={1} xs />
          <Grid item md={10} xs={12}>
            { (positionType === defaultValues.DEFAULT_TECHNICIAN_POSITION_TYPE) 
              ? <QuestionSelection positionType={positionType} selectedQuestionId={`${selectedQuestionId}`} onChange={this.handleChange} />
              : <TechnicianQuestionSelection subPositionType={subPositionType} selectedQuestionId={`${selectedQuestionId}`} onChange={this.handleChange} />
            }
          </Grid>
          <Grid item md={1} xs />

          <Grid item xs={12} >
            <Grid container spacing={8} alignItems="center">
              <Grid item sm={6} xs={12}>
                { video && video.question }
              </Grid>
              <Grid item sm={6} xs={12} className={classes.centerText}>
                <VideoPlayer url={video ? video.url : ''} />
              </Grid>
              <Grid item xs />
            </Grid>
          </Grid>
        </Grid>
      </Panel>
    );
  }

  render() {
    const { video } = this.state;
    const { profile } = this.props;
    return (
      <AdminForm
        talent={profile}
        showName
        formSubTitle={video ? `VIDEO GREETING (${video.language})` : ''}
        nextLink={{pathname: "/admin/edit-profiles/profile-videos/greetings"}}
        nextButtonTitle="Back to Video Greetings"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    talentActions: bindActionCreators(talentActions, dispatch),
  };
};

const mapStateToProps = state => {
  const { auth, talentInfo } = state;
  return {
    auth,
    profile: talentInfo.value
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(LiveInterviewVideo));