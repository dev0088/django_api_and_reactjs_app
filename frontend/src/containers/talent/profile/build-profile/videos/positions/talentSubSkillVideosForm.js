import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Panel from 'components/general/panel';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from 'components/shiptalent/snackbars/alert';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import * as talentActions from 'actions/talentActions';
import { styles } from 'styles';
import Spacer from "components/general/spacer";
import VideoUploader from 'components/shiptalent/uploaders/videoUploader';
import HelpfulHintForm from 'components/shiptalent/forms/helpfulHintForm';
import TalentAPI from 'apis/talentAPIs';
import apiConfig from 'constants/api';
import { findVideoByPriority, findVideoIndexByPriority } from 'utils/appUtils';


class TalentSubSkillVideosForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subSkill: {},
      openImageModal: false,
      responseCallback: null,
      talent_video_sub_skills: []
    }
    this.onFinishUploading = this.onFinishUploading.bind(this)
  }

  getInfoFromProps(props) {
    const {talentInfo, subSkill } = props
    let talent_video_sub_skills = []

    if (subSkill && talentInfo && talentInfo.talent_video_sub_skills &&
      talentInfo.talent_video_sub_skills.length > 0) {
      talent_video_sub_skills = talentInfo.talent_video_sub_skills.filter(function(video_sub_skill, index, array){
        return video_sub_skill.sub_skill === subSkill.id
      })
    }
    return {
      subSkill,
      talent_video_sub_skills
    }
  }

  componentWillMount() {
    this.props.talentActions.getCurrentTalentInfo()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    })
  }

  onFinishUploading = () => {
    this.props.talentActions.getCurrentTalentInfo()
  };

  onDelete = (videoID, responseCallback) => {
    this.setState({
      responseCallback: responseCallback
    }, () => {
      TalentAPI.deleteVideoSubSkill(videoID, this.onResponseHanlder)
    })
  };

  onResponseHanlder = (response, fail) => {
    const { responseCallback } = this.state
    if (responseCallback) {
      this.props.talentActions.getCurrentTalentInfo()
      responseCallback(response, fail)
    }
  };

  onPreCheckValidation = (optionsData) => {
    if (optionsData && optionsData.sub_skill_id) {
      return true
    }
    return false
  }

  renderNotification = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!this.state.notification}
        autoHideDuration={6000}
        onClose={() => this.setState({notification: false})}
      >
        <Alert
          onClose={() => this.setState({notification: false})}
          variant="error"
          message={this.state.notification}
        />
      </Snackbar>
    )
  };

  renderVideosForOneStep() {
    return (<div/>)
  }

  renderVideosForTwoStep() {
    const { classes, talentInfo } = this.props
    const { subSkill, talent_video_sub_skills } = this.state
    if (talentInfo) {
      const signApi = `${apiConfig.url}/talent_video_sub_skills/upload/${talentInfo.user.id}/policy/`
      const completeApi = `${apiConfig.url}/talent_video_sub_skills/upload/${talentInfo.user.id}/complete/`

      return (
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={0} sm={0} xs={0}/>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <VideoUploader
              title={`Current ${subSkill.name} 1 Video`}
              noVideoTitle={`Current ${subSkill.name} 1 Video`}
              subTitle={"(click to play)"}
              videoData={findVideoByPriority(talent_video_sub_skills, 1)}
              optionsData={{sub_skill_id: subSkill.id, priority: 1}}
              preCheckFunc={this.onPreCheckValidation}
              signApi={signApi}
              completeApi={completeApi}
              deleteApiFunc={(videoID, responseCallback) => this.onDelete(videoID, responseCallback)}
              onFinishUploadingCallbackFunc={this.onFinishUploading}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <HelpfulHintForm/>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <VideoUploader
              title={`${subSkill.name} 2 Video`}
              noVideoTitle={`Current ${subSkill.name} 2 Video`}
              subTitle={"click to play"}
              videoData={findVideoByPriority(talent_video_sub_skills, 2)}
              optionsData={{sub_skill_id: subSkill.id, priority: 2}}
              showCheckbox={false}
              preCheckFunc={this.onPreCheckValidation}
              signApi={signApi}
              completeApi={completeApi}
              deleteApiFunc={(videoID, responseCallback) => this.onDelete(videoID, responseCallback)}
              onFinishUploadingCallbackFunc={this.onFinishUploading}
            />
          </Grid>
          <Grid item lg={1} md={0} sm={0} xs={0}/>
        </Grid>
      )
    }

    return (<div/>)
  }

  renderVideos() {
    const { subSkill } = this.state
    const video_step = subSkill ? subSkill.video_steps : 0

    switch (video_step) {
      case 1:
        return this.renderVideosForOneStep()
      case 2:
        return this.renderVideosForTwoStep()
      default:
        return (<div/>)
    }
  }

  renderContents() {
    const { classes, contentTitle, allPositionTypes } = this.props
    const { subSkill } = this.state
    return (
      <Panel title={contentTitle}>
        <Grid container spacing={24} direction="column" justify="center" alignItems="center">
          <ColumnButton
            link = {'/talent/video-sub-skills/introduction'}
            color="primary"
            itemClass = {classes.talentProfileGuideButtonItem}
            buttonClass = {classes.talentProfileGuideButton}
            title = {"INSTRUCTIONS"}
            titleClass = {classes.talentProfileGuideButtonTitle}
            size = {12}
            fullWidth = {false}
          />
        </Grid>

        <Spacer size={40}/>

        { this.renderVideos() }


        <Spacer size={40}/>

        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item lg={1} md={1} xs={0}/>
          <Grid item lg={10} md={10} xs={12}>
            <Typography
              gutterBottom
              variant='Subheading'
              className={classes.talentProfileVideoAuditionDescriptionText}
            >
              {`NOTE: You will see your uploaded ${subSkill.name} Videos and Introduction
                in your Profile imediately. However, before casting directors can see the
                uploaded ${subSkill.name} Videos and Introduction in your Profile, it must
                be reviewed and approved by ShipTalent.com.`}
              <br/>
              {`(usually within 24 hours)`}
            </Typography>
          </Grid>
          <Grid item lg={1} md={1} xs={0}/>
        </Grid>

      </Panel>
    )
  }

  render() {
    return (
      <div>
        {this.renderNotification()}
        {this.renderContents()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { talentInfo } = state;
  return {
    talentInfo: talentInfo.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentSubSkillVideosForm));
