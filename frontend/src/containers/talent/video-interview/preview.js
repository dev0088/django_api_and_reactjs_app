import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TalentForm from 'components/shiptalent/forms/talentForm';
import Panel from 'components/general/panel';
import Spacer from 'components/general/spacer';
import * as talentActions from 'actions/talentActions';
import { getValueFromLocation } from 'utils/appUtils';
import * as deviceActions from  'actions/deviceSettings';
import VideoInterViewControl from "./VideoInterViewControl";
import { styles } from 'styles';
import './styles.css'


const customStyles={
  raisedButton: {
    whiteSpace: "normal",
    width: "240px",
  },
  disabledRaisedButton: {
    whiteSpace: "normal",
    width: "240px",
    backgroundColor: 'gray'
  },
  floatingLabelStyle: {
    color: "#258df2",
  },
}

let VideoResolutions = [
  {width: 4096, height:2160},
  {width: 3840, height:2160},
  {width: 2560, height:1440},
  {width: 1920, height:1200},
  {width: 1920, height:1080},
  {width: 1280, height:1000},
  {width: 1280, height:900},
  {width: 1280, height:800},
  {width: 1280, height:768},
  {width: 1280, height:720},
  {width: 1024, height:576},
  {width: 768, height:576},
  {width: 640, height:480},
  {width: 640, height:360},
  {width: 320, height:240},
  {width: 320, height:180},
  {width: 160, height:120}
];

let MAX_RESOLUTION = {width: 1280, height: 768};

class VideoPreview extends React.Component {
  constructor(props) {
    super();
    this.state = {
      position: null,
      settingDlg: false,
      resolution: -1,
      frameRate: 0,
      bitRate: 0,
      selectedAudio: "",
      selectedVideo: "",
      audioDevices: [],
      videoDevices: [],
      has_sub_position_type: false,
      startingResolution: 0,
      maxWidth: 0,
      maxHeight: 0,
    }
  }

  getInfoFromProps = (props) => {
    let { deviceSettings, talentInfo } = props;
    return {
      position: getValueFromLocation(props, 'position'),
      resolution: deviceSettings.resolution,
      frameRate: deviceSettings.frameRate,
      bitRate: deviceSettings.bitRate,
      selectedAudio: deviceSettings.audio,
      selectedVideo: deviceSettings.video,
      has_sub_position_type: !!(talentInfo && talentInfo.value && talentInfo.value.talent_position_sub_type)
    };
  };

  componentWillMount() {
    this.setState({...this.getInfoFromProps(this.props)}, () => {
      this.props.talentActions.getCurrentTalentInfo();
    });
    this.checkAvailableCamera();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.getInfoFromProps(nextProps)})
  }

  componentWillUnmount() {
    this.stopDevice();
  }

  checkAvailableCamera = () => {
    const __this = this;
    let constraints = {
      audio: false,
      video: {
        width: { ideal: VideoResolutions[0]['width'] },
        height: { ideal: VideoResolutions[0]['height'] },
      }
    };
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      let {width, height} = stream.getTracks()[0].getSettings();
      VideoResolutions.map((each, key) => {
        if (each.width === width && each.height === height) {
          __this.setState({ startingResolution: key, maxWidth: width, maxHeight: height });
        }
      })
    }).catch(function(err) {
      console.log(err.name + ': ' + err.message);
    });
  }

  stopDevice = () => {
    if (this.videoStream) {
      this.videoStream.stop();
    }
    if (this.audioStream) {
      this.audioStream.stop();
    }
  }

  setAudioStream = (audio) => {
    this.audioStream = audio;
  }

  setVideoStream = (video) => {
    this.videoStream = video;
  }

  adjustSettings = () => {
    let __this = this;
    let aDevice = [], vDevice = [];
    navigator.mediaDevices.enumerateDevices()
      .then(gotDevices)
      .catch(errorCallback);
    function gotDevices(deviceInfos) {
      for (let i = 0; i !== deviceInfos.length; ++i) {
        let deviceInfo = deviceInfos[i];
        let obj = {};
        obj.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput') {
          obj.text = deviceInfo.label || 'Microphone ' + i;
          aDevice.push(obj);
        } else if (deviceInfo.kind === 'videoinput') {
          obj.text = deviceInfo.label || 'Camera ' + i;
          vDevice.push(obj);
        }
      }
      if (__this.state.selectedAudio === "" && aDevice.length > 0)
        __this.setState({ selectedAudio: aDevice[0].value });
      if (__this.state.selectedVideo === "" && vDevice.length > 0)
        __this.setState({ selectedVideo: vDevice[0].value });
      __this.setState({ 
        audioDevices: aDevice, 
        videoDevices: vDevice
      }, function() {
        __this.setState({ settingDlg: true });
      });
    }
    function errorCallback(error) {
      __this.setState({ audioDevices: [], videoDevices: [], selectedAudio: 0, selectedVideo: 0 }, function() {
        __this.setState({ settingDlg: true });
      });
      // console.log('Error: ', error);
    }
  };

  handleDialogClose = () => {
    this.setState({ settingDlg: false });
  };

  handleResolutionChange = (event, index, resolution1) => {
    const { frameRate, bitRate, selectedAudio, selectedVideo } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution1, frameRate: frameRate, bitRate: bitRate, audio: selectedAudio, video: selectedVideo}
    );
    this.setState({resolution: resolution1});
  }

  handleFrameChange = (event, index, frameRate1) => {
    const { resolution, bitRate, selectedAudio, selectedVideo } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {
        resolution: resolution,
        frameRate: frameRate1,
        bitRate: bitRate,
        audio: selectedAudio,
        video: selectedVideo
      }
    );
    this.setState({frameRate: frameRate1});
  };

  handleBitRateChange = (event, index, bitRate1) => {
    const { resolution, frameRate, selectedAudio, selectedVideo } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {
        resolution: resolution,
        frameRate: frameRate,
        bitRate: bitRate1,
        audio: selectedAudio,
        video: selectedVideo
      }
    );
    this.setState({bitRate: bitRate1});
  };

  handleAudioChange = (event, index, audio) => {
    const { resolution, frameRate, bitRate, selectedVideo } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate, bitRate: bitRate, audio: audio, video: selectedVideo}
    );
    this.setState({selectedAudio: audio});
  };

  handleVideoChange = (event, index, video) => {
    const { resolution, frameRate, bitRate, selectedAudio } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate, bitRate: bitRate, audio: selectedAudio, video: video}
    );
    this.setState({selectedVideo: video});
  };

  onClickPractice = (event) => {

  };

  renderContents (position) {
    const { positionName } = position ? position.name : '';
    const {
      settingDlg, 
      resolution, 
      frameRate, 
      bitRate, 
      audioDevices, 
      videoDevices, 
      selectedAudio, 
      selectedVideo, 
      has_sub_position_type,
      startingResolution,
      maxWidth,
      maxHeight,
    } = this.state;
    const selectItemStyle = {
      'whiteSpace': 'preWrap'
    }
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDialogClose}
      />,
    ];
    const { talentInfo, classes } = this.props;
    const resolutions = VideoResolutions.slice(startingResolution);
    const videoWidth = Math.min(resolution === -1 ? maxWidth : VideoResolutions[resolution]['width'], MAX_RESOLUTION.width);
    const videoHeight = Math.min(resolution === -1 ? maxHeight : VideoResolutions[resolution]['height'], MAX_RESOLUTION.height);

    return (
      <Panel className="video-interview">
        <Grid container spacing={16} direction="column" justify="center" alignItems="center">
          <Grid item>
            <Spacer size={10} />
          </Grid>
          <Grid item>
            <VideoInterViewControl
              width={videoWidth}
              height={videoHeight}
              audioMeterWidth={"450px"}
              setAudioStream={this.setAudioStream}
              setVideoStream={this.setVideoStream}
            />
          </Grid>
          <Grid item>
            <Spacer size={20} />
          </Grid>

          <Grid item>
            <Link to={{pathname: "/video-practice", state: {position: position}}} onClick={this.onClickPractice}>
              <Button
                variant="contained" color="primary"
                className={classes.generalButtonClass}
                fullWidth
              >
                <Typography className={classes.talentProfileGuideButtonTitle}>
                  {"Start Practice Questions"}
                </Typography>
              </Button>
            </Link>
          </Grid>

          <Grid item>
            { /*has_sub_position_type ? (
              <Link to={{pathname: "/interview-instruction-live", state: {position: position}}}>
                <Button variant="contained" color="secondary" className={classes.generalButtonClass} fullWidth>
                  <Typography className={classes.talentProfileGuideButtonTitle}>
                    Start Live Questions
                  </Typography>
                </Button>
              </Link>
            ) : (
              <Button variant="contained" color="secondary" className={classes.generalButtonClass} fullWidth disabled>
                <Typography className={classes.talentProfileGuideButtonTitleDisabled}>
                  Start Live Questions
                </Typography>
              </Button>
            )*/}
          </Grid>

          <Grid item>
            <Button
              variant="contained" color="primary" fullWidth className={classes.generalButtonClass}
              onClick={this.adjustSettings}
            >
              <Typography className={classes.talentProfileGuideButtonTitle}>
                Adjust Video and Audio Settings
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Dialog
        actions={actions}
        title="Video and Audio Settings"
        modal={false}
        open={settingDlg}
        onRequestClose={this.handleDialogClose}
      >
        {
          audioDevices.length > 0 && (
            <SelectField
              floatingLabelText="Audio Source"
              floatingLabelStyle={customStyles.floatingLabelStyle}
              className="dlg-select"
              value={selectedAudio}
              onChange={this.handleAudioChange}
              menuItemStyle={selectItemStyle}
            >
              {
                audioDevices.map((obj, index) => {
                  return (<MenuItem key={index} value={obj.value} primaryText={obj.text} />);
                })
              }
            </SelectField>
          )
        }

        {
          videoDevices.length > 0 && (
            <SelectField
              floatingLabelText="Audio Source"
              floatingLabelStyle={customStyles.floatingLabelStyle}
              className="dlg-select"
              value={selectedVideo}
              onChange={this.handleVideoChange}
              menuItemStyle={selectItemStyle}
            >
              {
                videoDevices.map((obj, index) => {
                  return (<MenuItem key={index} value={obj.value} primaryText={obj.text} />);
                })
              }
            </SelectField>
          )
        }

        <SelectField
          floatingLabelText="Resolutions"
          floatingLabelStyle={customStyles.floatingLabelStyle}
          className="dlg-select"
          value={resolution}
          onChange={this.handleResolutionChange}
          menuItemStyle={selectItemStyle}
        >
          <MenuItem value={-1} primaryText="Default" />
          {resolutions.map((each, key) => (
            (<MenuItem key={key} value={key+startingResolution} primaryText={`${each.width}*${each.height}`} />)
          ))}
        </SelectField>
        <SelectField
          floatingLabelText="Frame Rate"
          floatingLabelStyle={customStyles.floatingLabelStyle}
          className="dlg-select"
          value={frameRate}
          onChange={this.handleFrameChange}
          menuItemStyle={selectItemStyle}
        >
          <MenuItem value={0} primaryText="Default" />
          <MenuItem value={5} primaryText="5 fps" />
          <MenuItem value={15} primaryText="15 fps" />
          <MenuItem value={24} primaryText="24 fps" />
          <MenuItem value={30} primaryText="30 fps" />
          <MenuItem value={60} primaryText="60 fps" />
        </SelectField>
        <SelectField
          floatingLabelText="Media BitRate"
          floatingLabelStyle={customStyles.floatingLabelStyle}
          className="dlg-select"
          value={bitRate}
          onChange={this.handleBitRateChange}
          menuItemStyle={selectItemStyle}
        >
          <MenuItem value={0} primaryText="Default" />
          <MenuItem value={8000000000} primaryText="1 GB bps" />
          <MenuItem value={800000000} primaryText="100 MB bps" />
          <MenuItem value={8000000} primaryText="1 MB bps" />
          <MenuItem value={800000} primaryText="100 KB bps" />
          <MenuItem value={8000} primaryText="1 KB bps" />
          <MenuItem value={800} primaryText="100 Bytes bps" />
        </SelectField>
      </Dialog>
    </Panel>
    );
  }

  render() {
    const position = getValueFromLocation(this.props, 'position');
    const positionName = position ? position.name : '';
    const { has_sub_position_type } = this.state;

    return (
      <TalentForm
        formTitle={`My Video Interview Introductions (${positionName})`}
        formSubTitle={"Video and Audio Preview"}
        nextLink={{pathname: "/video-positions", state: {position: position}}}
        nextButtonTitle={`I’m Not Ready. Take Me Back to My ${positionName} Audition Videos`}
      >
        {this.renderContents(position)}
      </TalentForm>
    );
  }
}

function mapStateToProps(state) {
  const { auth, talentInfo, deviceSettings } = state;
  return {
    auth: auth,
    talentInfo: talentInfo,
    deviceSettings: deviceSettings
  }
}
function mapDispatchToProps(dispatch) {
  return {
    deviceActions: bindActionCreators(deviceActions, dispatch),
    talentActions: bindActionCreators(talentActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VideoPreview));