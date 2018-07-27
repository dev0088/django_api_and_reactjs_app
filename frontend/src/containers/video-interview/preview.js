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
  constructor() {
    super();
    this.state = {
      settingDlg: false,
      resolution: 1,
      frameRate: 0,
      bitRate: 0,
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

  adjustSettings = () => {
    this.setState({ settingDlg: true });
  }

  handleDialogClose = () => {
    this.setState({ settingDlg: false });
  }

  handleResolutionChange = (event, index, resolution1) => {
    const { frameRate, bitRate } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution1, frameRate: frameRate, bitRate: bitRate}
    );
    this.setState({resolution: resolution1});
  }

  handleFrameChange = (event, index, frameRate1) => {
    const { resolution, bitRate } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate1, bitRate: bitRate}
    );
    this.setState({frameRate: frameRate1});
  }

  handleBitRateChange = (event, index, bitRate1) => {
    const { resolution, frameRate } = this.state;
    this.props.deviceActions.setDeviceSettingsActions(
      {resolution: resolution, frameRate: frameRate, bitRate: bitRate1}
    );
    this.setState({bitRate: bitRate1});
  }

  render () {
    const { pageId } = this.props.match.params;
    const { settingDlg, resolution, frameRate, bitRate } = this.state;
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
        <Link to={"/interview-instruction-live/" + positionName}>
          <RaisedButton
            label="Start Live Questions"
            className="btnn-video-buttons"
            style={styles.raisedButton}
            secondary={true}
          />
        </Link>
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
        <Link to="/edit-profile">
          <RaisedButton
            className="btnn-video-buttons btnn-not-ready"
            style={styles.raisedButton}
            label="I’m Not Ready. Take Me Back to My Cruise Staff Audition Videos"
            primary={true}
          />
        </Link>
      </div>

      <Dialog
        actions={actions}
        title="Video and Audio Settings"
        modal={false}
        open={settingDlg}
        onRequestClose={this.handleDialogClose}
      >
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
  const { auth, getTalentInfo } = state;
  return {
    auth: auth,
    talentInfo: getTalentInfo
  }
}
function mapDispatchToProps(dispatch) {
  return {
    deviceActions: bindActionCreators(deviceActions, dispatch),
    talentActions: bindActionCreators(talentActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoPreview);