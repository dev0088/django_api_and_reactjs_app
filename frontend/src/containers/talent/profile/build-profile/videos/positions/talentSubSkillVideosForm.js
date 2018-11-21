import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Panel from 'components/general/panel';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from 'components/shiptalent/snackbars/alert';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import * as talentActions from 'actions/talentActions';
import { styles } from 'styles';
import Spacer from "components/general/spacer";
import defaultValues from 'constants/defaultValues';
import VideoUploader from 'components/shiptalent/uploaders/videoUploader';
import TalentAPI from 'apis/talentAPIs';
import apiConfig from 'constants/api';
import { getLanguageIndex } from 'utils/appUtils';

const LANGUAGE_KEYS = ['0', '1', '2', '3']

class TalentSubSkillVideosForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openImageModal: false,
      responseCallback: null,
      talent_video_greetings: [],
      selectedLanguage: {'0': '', '1': '', '2': '', '3': ''}
    }
    this.onFinishUploading = this.onFinishUploading.bind(this)
  }

  getInfoFromProps(props) {
    const {talentInfo} = props
    let selectedLanguage = {'0': '', '1': '', '2': '', '3': ''}
    let talent_video_greetings = []

    if (talentInfo && talentInfo.talent_video_greetings && talentInfo.talent_video_greetings.length > 0) {
      talent_video_greetings = talentInfo.talent_video_greetings
      for (let i = 0; i < talent_video_greetings.length; i ++) {
        let language = talent_video_greetings[i].language
        selectedLanguage[i.toString()] = language ? getLanguageIndex(language) : ''
      }
    }
    return {
      talent_video_greetings,
      selectedLanguage
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
      TalentAPI.deleteVideoGreeting(videoID, this.onResponseHanlder)
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
    if (optionsData && optionsData.language) {
      return true
    }
    return false
  }

  handleLanguageChange = (event) => {
    console.log('===== handleLanguageChange: ', event.target.name)
    const { selectedLanguage } = this.state
    selectedLanguage[event.target.name] = event.target.value
    this.setState({ selectedLanguage });
  };

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
  }

  renderLanguageSelection(key) {
    const { classes } = this.props
    const { selectedLanguage } = this.state

    return (
      <FormControl className={classes.formControl}>
        <Select
          value={selectedLanguage[key]}
          onChange={this.handleLanguageChange}
          name={key}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {defaultValues.LANGUAGES.map((language, index) => {
            return (<MenuItem value={index}>{language}</MenuItem>)
          })}
        </Select>
        <FormHelperText>Select Language</FormHelperText>
      </FormControl>
    )
  }

  renderVideos() {
    const { classes, talentInfo } = this.props
    const { selectedLanguage, talent_video_greetings } = this.state
    if (talentInfo) {
      const signApi = `${apiConfig.url}/talent_video_greetings/upload/${talentInfo.user.id}/policy/`
      const completeApi = `${apiConfig.url}/talent_video_greetings/upload/${talentInfo.user.id}/complete/`

      return (
        <Grid container spacing={16} justify="center" alignItems="center">
          {
            Object.keys(selectedLanguage).map((key, index) => {
              let strLanguage = defaultValues.LANGUAGES[selectedLanguage[key]]
              return (
                <Grid item lg={3} md={6} sm={6} xs={12}>
                  <Grid container spacing={8} direction="column" justify="center" alignItems="center">
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      { this.renderLanguageSelection(key) }
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <VideoUploader
                        title={`${strLanguage} Video Greeting`}
                        subTitle={"click to play"}
                        videoData={talent_video_greetings[index]}
                        optionsData={{language: strLanguage}}
                        preCheckFunc={this.onPreCheckValidation}
                        signApi={signApi}
                        completeApi={completeApi}
                        deleteApiFunc={(videoID, responseCallback) => this.onDelete(videoID, responseCallback)}
                        onFinishUploadingCallbackFunc={this.onFinishUploading}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )
            })
          }
        </Grid>
      )
    }

    return (<div/>)

  }

  renderContents() {
    const { classes, contentTitle, allPositionTypes } = this.props

    return (
      <Panel title={contentTitle}>
        <Grid container spacing={24} direction="column" justify="center" alignItems="center">
          <ColumnButton
            link = {'/talent/video-greetings/introduction'}
            color="primary"
            itemClass = {classes.talentProfileGuideButtonItem}
            buttonClass = {classes.talentProfileGuideButton}
            title = {"INSTRUCTIONS"}
            titleClass = {classes.talentProfileGuideButtonTitle}
            size = {12}
            fullWidth = {false}
          />
          <ColumnButton
            link = {'#'}
            color="primary"
            itemClass = {classes.talentProfileGuideButtonItem}
            buttonClass = {classes.talentProfileGuideButton}
            title = {"Sample Videos"}
            titleClass = {classes.talentProfileGuideButtonSubTitle}
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
            <Typography gutterBottom variant='Subheading' className={classes.talentProfileVideoAuditionDescriptionText}>
              {`NOTE: You will see your uploaded Video Greeting and Introduction in your Profile imediately. However, before casting directors can see the uploaded Video Greeting and Introduction in your Profile, it must be reviewed and approved by ShipTalent.com.`}
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
