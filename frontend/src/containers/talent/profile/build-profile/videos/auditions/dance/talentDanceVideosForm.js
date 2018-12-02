import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Panel from 'components/general/panel';
import Snackbar from '@material-ui/core/Snackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from 'components/shiptalent/snackbars/alert';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import * as talentActions from 'actions/talentActions';
import { styles } from 'styles';
import Spacer from "components/general/spacer";
import VideoUploader from 'components/shiptalent/uploaders/videoUploader';
import HelpfulHintForm from 'components/shiptalent/forms/helpfulHintForm';
import TalentAPI from 'apis/talentAPIs';
import apiConfig from 'constants/api';
import { findVideoByPriority, findVideoIndexByPriority } from 'utils/appUtils';


class TalentDanceVideosForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subSkill: {},
      openImageModal: false,
      responseCallback: null,
      talent_video_sub_skills: [],
      checkedOptOut: false
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
      TalentAPI.deleteVideoSubSkill(videoID, this.onResponseHandler)
    })
  };

  onResponseHandler = (response, fail) => {
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

  handleClickDownload = (event, url) => {
    event.preventDefault();
    window.open(url, '_blank');
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
    const { classes, talentInfo } = this.props
    const { subSkill, talent_video_sub_skills } = this.state
    let signApi = ''
    let completeApi = ''
    let name = ''
    let id = -1

    if (talentInfo) {
      signApi = `${apiConfig.url}/talent_video_sub_skills/upload/${talentInfo.user.id}/policy/`
      completeApi = `${apiConfig.url}/talent_video_sub_skills/upload/${talentInfo.user.id}/complete/`
    }

    if (subSkill) {
      id = subSkill.id
      name = subSkill.name
    }

    return (
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.talentProfileGuideButtonItem}>
          <Typography className={classes.talentProfileVideoAuditionSubTitleText}>
            {`Create and upload a ${name} Demonstration Video`}
          </Typography>
          <Typography className={classes.talentProfileVideoAuditionHelpfulHintTitle}>
            {`(video length - three minutes max)`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.talentProfileGuideButtonItem}>
          <Link to="#">
            <Button
              variant="contained"
              color="primary"
              fullWidth={false}
              className={classes.talentProfileGuideDownloadButton}
            >
              <Typography className={classes.talentProfileGuideButtonTitle}>
                {`${name} Demonstration Video Instructions`}
              </Typography>
            </Button>
          </Link>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={24} justify="center" alignItems="center">
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <HelpfulHintForm/>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <VideoUploader
                title={`${name} 2 Video`}
                noVideoTitle={`Current ${name} 2 Video`}
                subTitle={"(click to play)"}
                videoData={findVideoByPriority(talent_video_sub_skills, 1)}
                optionsData={{sub_skill_id: id, priority: 1}}
                showCheckbox={false}
                preCheckFunc={this.onPreCheckValidation}
                signApi={signApi}
                completeApi={completeApi}
                deleteApiFunc={(videoID, responseCallback) => this.onDelete(videoID, responseCallback)}
                onFinishUploadingCallbackFunc={this.onFinishUploading}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}/>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderVideosForTwoStep() {
    const { classes, talentInfo } = this.props
    const { subSkill, talent_video_sub_skills } = this.state
    let signApi = ''
    let completeApi = ''
    let name = ''
    let downloadVideoLink = ''
    let id = -1

    if (talentInfo) {
      signApi = `${apiConfig.url}/talent_video_sub_skills/upload/${talentInfo.user.id}/policy/`
      completeApi = `${apiConfig.url}/talent_video_sub_skills/upload/${talentInfo.user.id}/complete/`
    }

    if (subSkill) {
      id = subSkill.id
      name = subSkill.name
      downloadVideoLink = subSkill.download_video_link
    }

    return (
      <Grid container spacing={16} direction="column" justify="center" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography className={classes.talentProfileVideoAuditionSubTitleText}>
            {`Step 1: Download Audition Materials for ${name} Videos (pick 2 songs)`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} className={classes.talentProfileGuideButtonItem}>
          <Link to="#" onClick={(event) => this.handleClickDownload(event, downloadVideoLink)}>
            <Button
              variant="contained"
              color="primary"
              fullWidth={false}
              className={classes.talentProfileGuideButton}
            >
              <Typography className={classes.talentProfileGuideButtonTitle}>
                {"Click here to download"}
              </Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography className={classes.talentProfileVideoAuditionSubTitleText}>
            {`Step 2: Upload completed ${name} Videos to My Profile`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={24} justify="center" alignItems="center">

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <VideoUploader
                title={`Current ${name} 1 Video`}
                noVideoTitle={`Current ${name} 1 Video`}
                subTitle={"(click to play)"}
                videoData={findVideoByPriority(talent_video_sub_skills, 1)}
                optionsData={{sub_skill_id: id, priority: 1}}
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
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <VideoUploader
                title={`${name} 2 Video`}
                noVideoTitle={`Current ${name} 2 Video`}
                subTitle={"(click to play)"}
                videoData={findVideoByPriority(talent_video_sub_skills, 2)}
                optionsData={{sub_skill_id: id, priority: 2}}
                showCheckbox={false}
                preCheckFunc={this.onPreCheckValidation}
                signApi={signApi}
                completeApi={completeApi}
                deleteApiFunc={(videoID, responseCallback) => this.onDelete(videoID, responseCallback)}
                onFinishUploadingCallbackFunc={this.onFinishUploading}
              />
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    )
  }

  renderVideos() {
    const { subSkill } = this.state
    const video_counts = subSkill ? subSkill.video_counts : 0

    switch (video_counts) {
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
    const { subSkill, checkedOptOut } = this.state
    let name = subSkill ? subSkill.name : ''

    return (
      <Panel title={contentTitle}>
        { this.renderVideos() }

        <Spacer size={40}/>

        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item lg={1} md={1} xs={12}/>
          <Grid item lg={10} md={10} xs={12}>
            <Typography
              gutterBottom
              variant='Subheading'
              className={classes.talentProfileVideoAuditionDescriptionText}
            >
              {`NOTE: You will see your uploaded ${name} Videos and Introduction
                in your Profile imediately. However, before casting directors can see the
                uploaded ${name} Videos and Introduction in your Profile, it must
                be reviewed and approved by ShipTalent.com.`}
              <br/>
              {`(usually within 24 hours)`}
            </Typography>
          </Grid>
          <Grid item lg={1} md={1} xs={12}/>
        </Grid>

        <Spacer size={20} />
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item lg={1} md={1} xs={12}/>
          <Grid item lg={10} md={10} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedOptOut}
                  value="checkedOptOut"
                  color="primary"
                  disabled
                />
              }
              label={`I am not an actor and choose to opt out of this category.
              I'll not be uploading any ${name} Audition Videos (you may opt back in at any time by unchecking the box)`}
            />
          </Grid>
          <Grid item lg={1} md={1} xs={12}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentDanceVideosForm));
