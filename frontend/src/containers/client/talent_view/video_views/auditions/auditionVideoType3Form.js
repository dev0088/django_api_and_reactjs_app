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


class AuditionVideoType3Form extends Component {

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
      helpful_hint: false,
      download_link: '',
      video_audition_button_title: '',
      video_audition_title: '',
      video_audition_sub_title: '',
      step1_title: '',
      step1_sub_title: '',
      step1_button_title: '',
      step1_link: '',
      step2_title: '',
      step2_sub_title: '',
      step2_button_title: '',
      step2_link: '',
      introduction_title: '',
      introduction_link: '',
      instruction_button_title: '',
      instruction_button_link: '',
      opts_in: false,
      is_special_video_audition: false,
      is_required_all: false,
      is_required: false,
      is_video_interview_button: ''
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

    if (subSkill) {
      const {
        id,
        name,
        video_counts,
        helpful_hint,
        download_video_link,
        video_audition_title,
        video_audition_sub_title,
        step1_title,
        step1_sub_title,
        step1_button_title,
        step1_link,
        step2_title,
        step2_sub_title,
        step2_button_title,
        step2_link,
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
      } = subSkill

      return {
        subSkill,
        talent_video_sub_skills,
        id,
        name,
        video_counts,
        helpful_hint,
        download_video_link,
        video_audition_title,
        video_audition_sub_title,
        step1_title,
        step1_sub_title,
        step1_button_title,
        step1_link,
        step2_title,
        step2_sub_title,
        step2_button_title,
        step2_link,
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

  renderVideos() {
    const { classes, talentInfo } = this.props
    const {
      talent_video_sub_skills,
      id,
      name,
      video_counts,
      helpful_hint,
      step1_title,
      step1_sub_title,
      step1_button_title,
      step1_link,
      step2_title,
      step2_sub_title,
      step2_button_title,
      step2_link,
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
    } = this.state
    let signApi = ''
    let completeApi = ''

    if (talentInfo) {
      signApi = `${apiConfig.url}/talent_video_sub_skills/upload/${talentInfo.user.id}/policy/`
      completeApi = `${apiConfig.url}/talent_video_sub_skills/upload/${talentInfo.user.id}/complete/`
    }

    return (
      <Grid container spacing={24} direction="row" justify="space-evenly" alignItems="center">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Link to={introduction_link}>
            <Typography className={classes.talentProfileVideoAuditionInstructionLinkedText}>
              {introduction_title}
            </Typography>
          </Link>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Grid container spacing={8} direction="column" justify="center" alignItems="center">
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography className={classes.talentProfileVideoAuditionSubTitleText}>
                {`${step1_title}`}
              </Typography>
              <Typography className={classes.talentProfileVideoAuditionDescriptionText}>
                {`${step1_sub_title}`}
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <VideoUploader
                title={`Current ${name} Demonstration Video`}
                noVideoTitle={`Current ${name} Demonstration Video`}
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
          </Grid>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Grid container spacing={8} direction="row" justify="center" alignItems="flex-end">
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.talentProfileGuideButtonItem}>
              { (instruction_button_title && instruction_button_link) && (
                <Link to={'#'} onClick={(event) => this.handleClickDownload(event, instruction_button_link)}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth={false}
                    className={classes.talentProfileGuideButton}
                  >
                    <Typography className={classes.talentProfileGuideButtonTitle}>
                      {instruction_button_title}
                    </Typography>
                  </Button>
                </Link>
              )}
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              { helpful_hint && <HelpfulHintForm/> }
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Grid container spacing={8} direction="column" justify="center" alignItems="center">
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography className={classes.talentProfileVideoAuditionSubTitleText}>
                {`${step2_title}`}
              </Typography>
              <Typography className={classes.talentProfileVideoAuditionDescriptionText}>
                {`${step2_sub_title}`}
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <VideoUploader
                title={`Current ${name} Dance Combination Video`}
                noVideoTitle={`Current ${name} Dance Combination Video`}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AuditionVideoType3Form));
