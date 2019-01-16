import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Panel from 'components/general/panel';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { styles } from 'styles';
import Spacer from "components/general/spacer";
import VideoPlayer from 'components/shiptalent/videos/videoPlayer';
import { findVideoByPriority, findVideoIndexByPriority } from 'utils/appUtils';


class AuditionVideoType0Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subSkill: {},
      openImageModal: false,
      responseCallback: null,
      talent_video_sub_skills: [],
      checkedOptOut: false,
      id: 0,
      name: '',
      video_counts: 0,
      video_audition_button_title: '',
      video_audition_title: '',
      video_audition_sub_title: '',
      helpful_hint: false,
      download_link: '',
      introduction_title: '',
      introduction_link: '',
      instruction_button_title: '',
      instruction_button_link: '',
      opts_in: false,
      is_special_video_audition: false,
      is_required_all: false,
      is_required: false,
      is_video_interview_button: ''
    };
  }

  getInfoFromProps(props) {
    const { talent, subSkill } = props;
    let talent_video_sub_skills = [];

    if (subSkill && talent && talent.talent_video_sub_skills &&
      talent.talent_video_sub_skills.length > 0) {
      talent_video_sub_skills = talent.talent_video_sub_skills.filter(function(video_sub_skill, index, array){
        return video_sub_skill.sub_skill === subSkill.id
      })
    }

    if (subSkill) {
      const {
        id,
        name,
        video_counts,
        video_audition_button_title,
        video_audition_title,
        video_audition_sub_title,
        helpful_hint,
        download_link,
        introduction_title,
        introduction_link,
        instruction_button_title,
        instruction_button_link,
        opts_in,
        video_audition_type,
        is_special_video_audition,
        is_required_all,
        is_required,
        is_video_interview_button,
      } = subSkill;

      return {
        subSkill,
        talent_video_sub_skills,
        id,
        name,
        video_counts,
        video_audition_button_title,
        video_audition_title,
        video_audition_sub_title,
        helpful_hint,
        introduction_title,
        introduction_link,
        instruction_button_title,
        instruction_button_link,
        opts_in,
        video_audition_type,
        is_special_video_audition,
        is_required_all,
        is_required,
        is_video_interview_button,
      }
    }

    return {
      subSkill,
      talent_video_sub_skills
    }
  }

  componentWillMount() {
    this.setState({...this.getInfoFromProps(this.props)});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.getInfoFromProps(nextProps)});
  }

  renderOneVideo = () => {
    const {
      talent_video_sub_skills,
      name,
    } = this.state;
    let video = findVideoByPriority(talent_video_sub_skills, 1);

    return (
      <Grid container spacing={24} justify="center" alignItems="center">
        <Grid item lg={4} md={4} sm={12} xs={12} />
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <VideoPlayer
            key={`video-player-1`}
            title={`${name}`}
            url={video ? video.url : '' }
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}/>
      </Grid>
    );
  };

  renderTwoVideos = () => {
    const {
      talent_video_sub_skills, name
    } = this.state;
    let videoPlayers = [];

    for (let i = 0; i < 2; i ++) {
      let video = findVideoByPriority(talent_video_sub_skills, i + 1);
      videoPlayers.push(
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <VideoPlayer
            key={`video-player-${i}`}
            title={`${name} ${i + 1}`}
            url={video ? video.url : ''}
          />
        </Grid>
      );
    }

    return (
      <Grid container spacing={24} justify="center" alignItems="center">
        { videoPlayers }
      </Grid>
    )
  };

  renderFourVideos = () => {
    const {
      talent_video_sub_skills, name
    } = this.state;
    let videoPlayers = [];

    for (let i = 0; i < 4; i ++) {
      let video = findVideoByPriority(talent_video_sub_skills, i + 1);
      videoPlayers.push(
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <VideoPlayer
            key={`video-player-${i}`}
            title={`${name} ${i + 1}`}
            url={video ? video.url : ''}
          />
        </Grid>
      );
    }

    return (
      <Grid container spacing={24} justify="center" alignItems="center">
        { videoPlayers }
      </Grid>
    );
  };

  renderVideos() {
    const { classes, talent } = this.props
    const {
      subSkill,
      talent_video_sub_skills,
      id,
      name,
      video_counts,
      video_audition_button_title,
      video_audition_title,
      video_audition_sub_title,
      introduction_title,
      introduction_link,
      instruction_button_title,
      instruction_button_link,
      download_link,
      is_special_video_audition
    } = this.state;

    let renderVideosStep = this.renderOneVideo;
    switch (video_counts) {
      case 1:
        renderVideosStep = this.renderOneVideo;
        break;
      case 2:
        renderVideosStep = this.renderTwoVideos;
        break;
      case 4:
        renderVideosStep = this.renderFourVideos;
        break;
      default:
        renderVideosStep = this.renderOneVideo;
        break;
    }

    let title = video_audition_title;

    return (
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          { renderVideosStep() }
        </Grid>
      </Grid>
    )
  }

  renderContents() {
    const { classes, contentTitle, allPositionTypes } = this.props
    const { subSkill } = this.state
    let name = subSkill ? subSkill.name : ''

    return (
      <Panel title={contentTitle}>
        { this.renderVideos() }
        <Spacer size={20}/>
      </Panel>
    )
  }

  render() {
    return (
      <div>
        {this.renderContents()}
      </div>
    )
  }
}

export default withStyles(styles)(AuditionVideoType0Form);
