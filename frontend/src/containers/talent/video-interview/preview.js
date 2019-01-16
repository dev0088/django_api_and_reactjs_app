import React from 'react';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
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

let videoResolution = {
  1: [480, 360],    // Default
  2: [1280, 720],    // 1080
  3: [1280, 720],    // 720
  4: [858, 480],    // 480
}
class VideoPreview extends React.Component {
  constructor(props) {
    super();
    this.state = {
      position: null,
      settingDlg: false,
      resolution: 1,
      frameRate: 0,
      bitRate: 0,
      selectedAudio: "",
      selectedVideo: "",
      audioDevices: [],
      videoDevices: [],
      has_sub_position_type: props.talentInfo.value && props.talentInfo.value.talent_position_sub_type ? true : false
    }
  }

  componentWillMount() {
    let { deviceSettings, talentInfo } = this.props;
    this.setState({
      position: getValueFromLocation(this.props, 'position'),
      resolution: deviceSettings.resolution,
      frameRate: deviceSettings.frameRate,
      bitRate: deviceSettings.bitRate,
      selectedAudio: deviceSettings.audio,
      selectedVideo: deviceSettings.video,
      has_sub_position_type: !!(talentInfo.value && talentInfo.value.talent_position_sub_type)
    }, () => {
      this.props.talentActions.getCurrentTalentInfo();
    });
  }

  componentWillReceiveProps(nextProps) {
    const { talentInfo } = nextProps;
    
    if (talentInfo.value && 
        talentInfo.value.talent_position_sub_type && 
        talentInfo.value.talent_position_sub_type.talent_position_type) {
      this.setState({
        has_sub_position_type: true
      })
    } else {
      this.setState({
        has_sub_position_type:false
      })
    }
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
      has_sub_position_type
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
    // let positionName = "";
    // if (talentInfo.value){
    //   const { talent_position_sub_type } = talentInfo.value;
    //   if (talent_position_sub_type)
    //     positionName = talent_position_sub_type.talent_position_type.toLowerCase();
    // }

    return (
      <Panel className="video-interview">
        <Grid container spacing={16} direction="column" justify="center" alignItems="center">
          <Grid item>
            <Spacer size={10} />
          </Grid>
          <Grid item>
            <VideoInterViewControl
              width={videoResolution[resolution][0]}
              height={videoResolution[resolution][1]}
              audioMeterWidth={"450px"}
            />
          </Grid>
          <Grid item>
            <Spacer size={20} />
          </Grid>
          <Grid item>
            <div className="col-md-12">
            <Link to={{pathname: "/video-practice", state: {position: position}}}>
              <RaisedButton
                label="Start Practice Questions"
                className="btn-video-buttons"
                style={customStyles.raisedButton}
                primary={true}
              />
            </Link>
          </div>
          </Grid>
          <Grid item>
            <div className="col-md-12">
          {
            has_sub_position_type ? (
              <Link to={{pathname: "/interview-instruction-live", state: {position: position}}}>
                <Button
                  variant="contained" color="secondary"
                  className="btn-video-buttons"
                  style={customStyles.raisedButton}
                >
                  <Typography className={classes.talentProfileGuideButtonTitle}>
                    {"Start Live Questions"}
                  </Typography>
                </Button>
              </Link>
            ) : (
              <RaisedButton
                label="Start Live Questions"
                className="btn-video-buttons btnn-not-ready disabled_raied_button"
                style={customStyles.disabledRaisedButton}
                secondary={true}
              />
            )
          }
          </div>
          </Grid>
          <Grid item>
            <div className="col-md-12">
            <RaisedButton
              className="btn-video-buttons btnn-adjust-settings"
              style={customStyles.raisedButton}
              label="Adjust Video and Audio Settings"
              onClick={this.adjustSettings}
              primary={true}
            />
          </div>
          </Grid>
          <Grid item>
            <div className="col-md-12">
          {
            has_sub_position_type ? (
                <RaisedButton
                  className="btn-video-buttons btnn-not-ready"
                  style={customStyles.raisedButton}
                  label="I’m Not Ready. Take Me Back to My Cruise Staff Audition Videos"
                  primary={true}
                  disabled={true}
                />
            ) : (
              <Link to="/edit-profile">
                <RaisedButton
                  style={customStyles.raisedButton}
                  className="btn-video-buttons btnn-adjust-settings"
                  label="I’m Not Ready. Take Me Back to My Cruise Staff Audition Videos"
                  primary={true}
                />
              </Link>
            )
          }


          </div>
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
          <MenuItem value={1} primaryText="Default" />
          <MenuItem value={2} primaryText="1080p" />
          <MenuItem value={3} primaryText="720p" />
          <MenuItem value={4} primaryText="480p" />
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
    const position = getValueFromLocation(this.props);
    const positionName = position ? position.name : '';

    return (
      <TalentForm
        formTitle={`My Video Interview Introductions (${positionName})`}
        formSubTitle={"Video and Audio Preview"}
        nextLink={{pathname: "/interview-start", state: {position: position}}}
        nextButtonTitle={`Back to My Video Interview`}
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