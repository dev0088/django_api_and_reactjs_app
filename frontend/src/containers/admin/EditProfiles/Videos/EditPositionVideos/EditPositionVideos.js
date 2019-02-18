import React from "react";
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import OverviewVideo from '../OverviewVideo';
import Spacer from 'components/general/spacer';
import { filterSubSkillVideosByPosition, findPositionTypeById, getSubSkillsWithVideoByPositionType } from 'utils/appUtils';
import { adminStyles } from 'styles';


class EditPositionVideos extends React.Component  {

  state = {
    positionType: null
  };

  getInfoFromProps = (props) => {
    const { location } = props;
    let positionType = (location && location.state && location.state.positionType) ? location.state.positionType : null;
    return { positionType };
  };

  componentWillMount = () => {
    this.setState({...this.getInfoFromProps(this.props)});
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({...this.getInfoFromProps(nextProps)});
  };

  renderContent() {
    const { allPositionTypes, allSkills, profile, classes } = this.props;
    const { positionType } = this.state;
    // let positionType = findPositionTypeById(allPositionTypes, positionId);
    
    let subSkillsWithVideo = getSubSkillsWithVideoByPositionType(allSkills, positionType);
    let currentVideos = profile ? filterSubSkillVideosByPosition(allSkills, profile.talent_video_sub_skills, positionType) : [];
    
    let videos = [];
    for (let i = 0; i < subSkillsWithVideo.length; i ++) {
      const subSkill = subSkillsWithVideo[i];
      const subSkillVideos = currentVideos.filter(v => {
        return v.sub_skill === subSkill.id
      });
      
      for (let j = 0; j < subSkill.video_counts; j ++) {
        const video = subSkillVideos.find(v => { return v.priority === (j + 1)});
        const caption = `${subSkillsWithVideo[i].name}${subSkill.video_counts > 1 ? ' ' + (j + 1) : ''}`;
        videos.push(
          <Grid item lg={3} md={4} xs={12} className={classes.centerText}>
            <OverviewVideo
              showStatus showCaption
              video={video}
              caption={caption}
              link={{pathname: "/admin/edit-profiles/profile-videos/edit-position-video", state: {video, positionType, caption}}}
              key={`${subSkillsWithVideo[i].video_audition_button_title}-${i}`}
            />
          </Grid>
        );  
      }
      
    }

    return (
      <Panel>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item xs={12}><Spacer size={30} /></Grid>
          <Grid item lg={2} md={1} xs={12}/>
          <Grid item lg={8} md={10} xs={12} >
            <Grid container spacing={24} justify="center" alignItems="center">
              {videos}
            </Grid>
          </Grid>
          <Grid item lg={2} md={1} xs={12}/>
          <Grid item xs={12}><Spacer size={30} /></Grid>
        </Grid>
      </Panel>
    );
  }

  render() {
    const { profile } = this.props;
    const { positionType } = this.state;
    return (
      <AdminForm
        talent={profile}
        showName
        formSubTitle={`${positionType ? positionType.name : ''} VIDEOS`}
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
  const { allPositionTypes, allSkills, talentInfo } = state;
  return {
    allPositionTypes: allPositionTypes.value,
    allSkills: allSkills.value,
    profile: talentInfo.value
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(EditPositionVideos));