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
import * as talentActions from  '../../actions/talentActions';

import './styles.css'
import * as deviceActions from  '../../actions/deviceSettings';
import AudioMeter from "../../components/audio-meter/index";

const styles={
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
const title = {
  "cruise": "Cruise Staff",
  "audio": "Audio Technician",
  "light-technician": "Lighting Technician",
  "vocalist": "Vocalist",
  "dancer": "Dancer",
  "actor": "Actor",
  "aerialist": "Aerialist",
  "solo-musician": "Solo Musician",
  "music-group-leader": "Musical Group Leader",
  "video-technician": "Video Technician",
  "youth-staff": "Youth Staff"
}

var videoResolution = {
  1: [480, 360],    // Default
  2: [1280, 720],    // 1080
  3: [1280, 720],    // 720
  4: [858, 480],    // 480
}
class VideoPreview extends React.Component {
  constructor(props) {
    super();
    this.state = {
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

  componentDidMount() {
    let __this = this;
    setTimeout(function() {
      let { access } = __this.props.auth;
      if (access.user_id){
        __this.props.talentActions.getTalentInfo(access.user_id);
      }
    }, 400);
  }

  componentWillMount() {
    let { deviceSettings, talentInfo } = this.props;
    this.setState({ 
      resolution: deviceSettings.resolution,
      frameRate: deviceSettings.frameRate,
      bitRate: deviceSettings.bitRate,
      selectedAudio: deviceSettings.audio,
      selectedVideo: deviceSettings.video,
      has_sub_position_type: talentInfo.value && talentInfo.value.talent_position_sub_type ? true : false
    });
  }

  componentWillReceiveProps(nextProps) {
    const { 
      talentInfo
    } = nextProps;
    
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
      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var obj = {};
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
  }

  handleDialogClose = () => {
    this.setState({ settingDlg: false });
  }

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
      {resolution: resolution, frameRate: frameRate1, bitRate: bitRate, audio: selectedAudio, video: selectedVideo}
    );
    this.setState({frameRate: frameRate1});
  }

  handleBitRateChange = (event, index, bitRate1) => {
    const { resolution, frameRate, selectedAudio, selectedVideo } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate, bitRate: bitRate1, audio: selectedAudio, video: selectedVideo}
    );
    this.setState({bitRate: bitRate1});
  }

  handleAudioChange = (event, index, audio) => {
    const { resolution, frameRate, bitRate, selectedVideo } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate, bitRate: bitRate, audio: audio, video: selectedVideo}
    );
    this.setState({selectedAudio: audio});
  }
  handleVideoChange = (event, index, video) => {
    const { resolution, frameRate, bitRate, selectedAudio } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate, bitRate: bitRate, audio: selectedAudio, video: video}
    );
    this.setState({selectedVideo: video});
  }

  render () {
    const { pageId } = this.props.match.params;
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
    const { talentInfo } = this.props;
    let positionName = "";
    if (talentInfo.value){
      const { talent_position_sub_type } = talentInfo.value;
      if (talent_position_sub_type)
        positionName = talent_position_sub_type.talent_position_type.toLowerCase();
    }

    return <div className="video-interview">
      <div className="video-interview-header">
        <h1>My Video Interview ({title[pageId] && title[pageId]})</h1>
        <h3>Video and Audio Preview</h3>
      </div>

      <div className="col-md-12 camera-box">
        <Webcam height={videoResolution[resolution][1]} width={videoResolution[resolution][0]}/>
      </div>

      <div className="audio-box">
        <AudioMeter/>
      </div>

      <div className="col-md-12">
        <Link to={"/video-practice/" + pageId}>
          <RaisedButton
            label="Start Practice Questions"
            className="btnn-video-buttons"
            style={styles.raisedButton}
            primary={true}
          />
        </Link>
      </div>
      <div className="col-md-12">
      {
        has_sub_position_type ? (
          <Link to={"/interview-instruction-live/" + positionName}>
            <RaisedButton
              label="Start Live Questions"
              className="btnn-video-buttons"
              style={styles.raisedButton}
              secondary={true}
            />
          </Link>
        ) : (
          <RaisedButton
            label="Start Live Questions"
            className="btnn-video-buttons btnn-not-ready disabled_raied_button"
            style={styles.disabledRaisedButton}
            secondary={true}
          />
        )
      }
      </div>
      <div className="col-md-12">
        <RaisedButton
          className="btnn-video-buttons btnn-adjust-settings"
          style={styles.raisedButton}
          label="Adjust Video and Audio Settings"
          onClick={this.adjustSettings}
          primary={true}
        />
      </div>
      <div className="col-md-12">
      {
        has_sub_position_type ? (
            <RaisedButton
              className="btnn-video-buttons btnn-not-ready"
              style={styles.raisedButton}
              label="I’m Not Ready. Take Me Back to My Cruise Staff Audition Videos"
              primary={true}
              disabled={true}
            />
        ) : (
          <Link to="/edit-profile">
            <RaisedButton
              style={styles.raisedButton}
              className="btnn-video-buttons btnn-adjust-settings"
              label="I’m Not Ready. Take Me Back to My Cruise Staff Audition Videos"
              primary={true}
            />
          </Link>
        )
      }


      </div>

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
              floatingLabelStyle={styles.floatingLabelStyle}
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
              floatingLabelStyle={styles.floatingLabelStyle}
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
          floatingLabelStyle={styles.floatingLabelStyle}
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
          floatingLabelStyle={styles.floatingLabelStyle}
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
          floatingLabelStyle={styles.floatingLabelStyle}
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
    </div>
  }
}

function mapStateToProps(state) {
  const { auth, getTalentInfo, deviceSettings } = state;
  return {
    auth: auth,
    talentInfo: getTalentInfo,
    deviceSettings: deviceSettings
  }
}
function mapDispatchToProps(dispatch) {
  return {
    deviceActions: bindActionCreators(deviceActions, dispatch),
    talentActions: bindActionCreators(talentActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoPreview);