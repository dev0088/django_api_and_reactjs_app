import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import Panel from '../components/panel'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as talentActions from  '../actions/talentActions';
import TalentAPI from '../apis/talentAPIs'
import './editProfile.css'
import apiConfig from '../constants/api';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import DropDown from 'react-dropdown';
import moment from 'moment';
import 'react-dropdown/style.css'

const const_genders = ["Male", "Female"];
const const_skill = ["vocalist", "dancer", "actor", "aerialist", 
    "musician", "staff", "youth staff", "technician", "plays"
];
const const_sub_skill = {
  "vocalist": ["soprano", "alto", "tenor", "baritone"],
  "dancer": ["jazz", "tap", "bullet", "contemp", "hip-Hop", "lyrical", "ballroom", "gymnastics"],
  "musician": ["solo", "duo", "trio", "quartet", "band"],
  "technician": ["audio", "lighting", "video"],
  "plays": ["piano", "bass", "drums", "strings", "winds", "brass", "percussion"]
};
const const_other_skill = ["sings", "dances", "moves", "acts", "plays"];
const const_sub_other_skill = {
  "sings": ["soprano", "alto", "tenor", "baritone"],
  "dances": ["jazz", "tap", "ballet", "contemp", "hip-Hop", "lyrical", "ballroom", "gymnastics"],
  "moves": [],
  "acts": [],
  "plays": ["piano", "bass", "drums", "strings", "winds", "brass", "percussion"]
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  slide: {
    padding: 10,
  },
});

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#C00'
    }
  }
})

// var ReactS3Uploader = require('react-s3-uploader');

class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID: props.auth.access.user_id,
      gender: "Male",
      skill: "Vocalist",
      subskill: ["tenor"],
      other_skill: ["dances"],
      other_sub_skill: [],
      notification: false,
      tab1Value: 0,
      tab2Value: 0,
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        birthday: null
      },
      emergencyInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        relationship: 0
      },
      currentAllPositionTypes: [],
      currentSubPositionType: props.talentInfo && props.talentInfo.talent_position_sub_type
        ? { value: props.talentInfo.talent_position_sub_type.name, 
            label: props.talentInfo.talent_position_sub_type.name }
        : '',
      currentAdditionalPositionSubTypes: null
    }
  }

  getPositionTypesFromProps(props) {
    const { 
      auth,
      allPositionTypes,
      talentInfo
    } = props
    let currentAllPositionTypes = []
    let currentSubPositionType = []
    let currentAdditionalPositionSubTypes = []
    let userID = auth.access.user_id
    let gender = 'Male'
    let contactInfo = {}
    let emergencyInfo = {}

    if (allPositionTypes && allPositionTypes.value) {
      currentAllPositionTypes = allPositionTypes.value
    }
    if (talentInfo) {
      gender = talentInfo.sex === 'm' ? 'Male' : 'Female'
      // Get sub position types for primary and secondary of talent
      let subPostionType = {}
      if (talentInfo.talent_position_sub_type) {
        subPostionType = { 
          value: talentInfo.talent_position_sub_type.name, 
          label: talentInfo.talent_position_sub_type.name,
          positionType: talentInfo.talent_position_sub_type.talent_position_type
        }
      }

      let additionalSubPositionTypes = []
      if (talentInfo.talent_additional_position_sub_types) {
        Object.keys(talentInfo.talent_additional_position_sub_types).map((key) => {
          let positionSubType = talentInfo.talent_additional_position_sub_types[key].talent_position_sub_type
          additionalSubPositionTypes.push({
            label: positionSubType.name,
            value: positionSubType.name,
            group: positionSubType.talent_position_type
          })
        })
      }

      currentSubPositionType = subPostionType,
      currentAdditionalPositionSubTypes = additionalSubPositionTypes

      // Get contact info
      contactInfo = {
        firstName: talentInfo.user.first_name,
        lastName: talentInfo.user.last_name,
        email: talentInfo.user.email,
        mobile: talentInfo.phone_number,
        address1: talentInfo.mailing_addresse1,
        address2: talentInfo.mailing_addresse2,
        address3: talentInfo.mailing_addresse3,
        address4: talentInfo.mailing_addresse4,
        birthday: moment(talentInfo.birthday)
      }
      emergencyInfo = {
        firstName: talentInfo.emergency_first_name,
        lastName: talentInfo.emergency_last_name,
        email: talentInfo.emergency_email,
        phone: talentInfo.emergency_phone,
        relationship: talentInfo.emergency_relationship
      }
    }

    return {
      userID,
      gender,
      currentAllPositionTypes,
      currentSubPositionType,
      currentAdditionalPositionSubTypes,
      contactInfo,
      emergencyInfo
    }
  }

  componentWillMount() {
    this.props.talentActions.getAllPositionTypes()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getPositionTypesFromProps(nextProps)
    })
  }

  clickButton = (type, val) =>  {
    if (type === 'other_sub_skill')
    {
      let temp_skill = this.state[type].slice(), pos;
      if ((pos = temp_skill.indexOf(val)) > -1){
        temp_skill.splice(pos, 1);
      }
      else
        temp_skill.push(val);
      this.setState({ [type]: temp_skill });
    }
    else if (type === 'other_skill' || type === 'subskill') {
      let temp_skill = [val];
      this.setState({ [type]: temp_skill });
    }
    else{
      this.setState({ [type]: val, 'subskill': [] });
    }
  }

  handleTab1Change = (value) => {
    this.setState({
      tab1Value: value,
    });
  };

  handleTab2Change = (value) => {
    this.setState({
      tab2Value: value,
    });
  }

  handleContactInfoChange = (event) => {
    const { contactInfo } = this.state;
    contactInfo[event.target.name.substring(8)] = event.target.value;
    this.setState({
      contactInfo: contactInfo,
    });
  }

  handleBirthdayChange = (event, date) => {
    const { contactInfo } = this.state;
    contactInfo['birthday'] = date;
    this.setState({ contactInfo: contactInfo })
  }

  handleEmergencyInfoChange = (event) => {
    const { emergencyInfo } = this.state;
    emergencyInfo[event.target.name.substring(10)] = event.target.value;
    this.setState({
      emergencyInfo: emergencyInfo,
    });
  }

  handleRelationshipChange = (event, index, value) => {
    const { emergencyInfo } = this.state;
    emergencyInfo['relationship'] = value;
    this.setState({ emergencyInfo: emergencyInfo });
  }

  handleUploadResume = (files) => {
    // Upload pdf files
    let file = files[0]
    const {user_id} = this.props.auth.access
    const signAPI = `${apiConfig.url}/talent_resume/upload/${user_id}/policy/`
    const completeAPI = `${apiConfig.url}/talent_resume/upload/${user_id}/complete/`
    this.uploadToS3(signAPI, completeAPI, file)
  }

  handleUploadInterviewVideos = (files) => {
    // Upload video files
    let file = files[0]
    const {user_id} = this.props.auth.access
    const signAPI = `${apiConfig.url}/talent_video/upload/${user_id}/interview/policy/?objectName=${file.name}&contentType=${file.type}`
    const completeAPI = `${apiConfig.url}/talent_video/upload/${user_id}/interview/complete/`
    this.uploadToS3(signAPI, completeAPI, file)
  }

  handleUploadMyPictures = (files) => {
    // Upload image files
    let file = files[0]
    const {user_id} = this.props.auth.access
    const signAPI = `${apiConfig.url}/talent_picture/upload/${user_id}/policy/`
    const completeAPI = `${apiConfig.url}/talent_picture/upload/${user_id}/complete/`
    this.uploadToS3(signAPI, completeAPI, file)
  }

  uploadToS3 = (signAPI, completeAPI, file) => {
    const params = {
      objectName: file.name,
      contentType: file.type
    }
    
    fetch(signAPI, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(response => response.json())
    .then(response => {
      if(response.error) {
        console.log('error: ', response.error)
        this.onError(file)
      }
      else {
        if (response.signedUrl){
          console.log('success: ', response, response.signedUrl)
          this.uploadFile(response.signedUrl, completeAPI, response.fileID, file)
        } else {
          console.log('error: ', response)
          this.onError(file)
        }
      }
    })
    .catch(error => {
      console.log('error: ', error)
      this.onError(file)
    })
  }

  onProgress = () => {
    console.log('=== progress')
  }

  onError = (file) => {
    console.log('==== Error: ', file)
  }

  onFinish = (completeAPI, fileID, file) => {
    console.log('=== Finish: ', fileID, file)
    // const {user_id} = this.props.auth.access    
    let params = {
      fileID: fileID, 
      fileSize: file.size,
      fileType: file.type,
    }
    fetch(completeAPI, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(response => response.json())
    .then(response => {
      if(response.error) {
        console.log('error: ', response.error)
      }
      else {
        
      }
    })
    .catch(error => {
      console.log('error: ', error)
    })
  }

  uploadFile = (s3PutUrl, completeAPI, fileID, file) => {
    // const filename = file.name;
    // Get signedUrl 
    // var that = this;
    fetch(s3PutUrl, {
      method: 'put',
      // contentType: file.type,
      headers: {
        'x-amz-acl': 'public-read',
        'Content-Type': file.type,
      },
      body: file
    })
    .then(response => {
      if(response.error) {
        console.log('=== uploadFile: error: ', response.error)
        this.onError(fileID, file)
      }
      else {
        console.log('== uploadFile: success: ', response)
        this.onFinish(completeAPI, fileID, file)
      }
    })
    .catch(error => {
      console.log('== uploadFile: error: ', error)
      this.onError(fileID, file)
    })
  }

  handleSubPositionSelect = (item) => {
    this.setState({
      currentSubPositionType: item
    })
  }

  handlecurrentAdditionalPositionSubTypesSelect = (selectedOption) => { 
   this.setState({ currentAdditionalPositionSubTypes: selectedOption });
  }

  handlePositionTypeCancel = () => {
    const {
      gender,
      currentAllPositionTypes,
      currentSubPositionType,
      currentAdditionalPositionSubTypes
    } = this.getPositionTypesFromProps(this.props)

    this.setState({
      gender: gender,
      currentAllPositionTypes: currentAllPositionTypes,
      currentSubPositionType: currentSubPositionType,
      currentAdditionalPositionSubTypes: currentAdditionalPositionSubTypes
    })
  }

  handlePositionTypeSave = () => {
    const { auth, talentInfo } = this.props
    const { 
      userID,
      gender,
      currentSubPositionType,
      currentAdditionalPositionSubTypes
    } = this.state

    let talent_additional_position_sub_types = []
    Object.keys(currentAdditionalPositionSubTypes).map((key) => {
      const positionSubType = currentAdditionalPositionSubTypes[key]
      talent_additional_position_sub_types.push({
        name: positionSubType.value,
        talent_position_type: positionSubType.group
      })
    })

    let data = {
      sex: gender === "Male" ? "m" : "f",
      talent_position_sub_type: {
        name: currentSubPositionType.value,
        talent_position_type: currentSubPositionType.positionType
      },
      talent_additional_position_sub_types: talent_additional_position_sub_types
    }
    TalentAPI.saveTalentInfo(userID, data, this.handlePositionTypeSaveResponse)
  }

  handlePositionTypeSaveResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    this.props.talentActions.getTalentInfo(this.state.userID)
  }

  handleBusinessStaffCancel = () => {
    const {
      contactInfo,
      emergencyInfo
    } = this.getPositionTypesFromProps(this.props)

    this.setState({
      contactInfo,
      emergencyInfo
    })
  }

  handleBusinessStaffSave = () => {
    const { auth, talentInfo } = this.props
    const { 
      userID,
      contactInfo,
      emergencyInfo
    } = this.state
    console.log('=== this.state: ', this.state)
    let data = {
      user: {
        email: contactInfo.email,
        first_name: contactInfo.firstName,
        last_name: contactInfo.lastName,
      },
      phone_number: contactInfo.mobile,
      mailing_addresse1: contactInfo.address1,
      mailing_addresse2: contactInfo.address2,
      mailing_addresse3: contactInfo.address3,
      mailing_addresse4: contactInfo.address4,
      birthday: moment(contactInfo.birthday).format('YYYY-MM-DD'),
      emergency_first_name: emergencyInfo.firstName,
      emergency_last_name: emergencyInfo.lastName,
      emergency_email: emergencyInfo.email,
      emergency_phone: emergencyInfo.phone,
      emergency_relationship: emergencyInfo.relationship
    }
    console.log('==== data: ', data)
    TalentAPI.saveTalentInfo(userID, data, this.handleBusinessStaffSaveResponse)
  }

  handleBusinessStaffSaveResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed)
    this.props.talentActions.getTalentInfo(this.state.userID)
  }

  renderPositionTypesView() {
    const { talentInfo, allPositionTypes } = this.props
    let groups = []

    if (allPositionTypes) {
      Object.keys(allPositionTypes).map((key) => {
        const positionType = allPositionTypes[key]
        let subPositions = []
        if (positionType.name === 'Practice') {
          return;
        }
        let group = {
          type: 'group',
          name: positionType.name,
          items: []
        }
        Object.keys(positionType.talent_position_sub_types).map((key) => {
          const positionSubType = positionType.talent_position_sub_types[key]
          group.items.push({
            value: positionSubType,
            label: positionSubType,
            className: 'profile-position-sub-type-item'
          })
        })
        groups.push(group)
      })
    }

    return (
      <DropDown 
        options={groups} 
        onChange={this.handleSubPositionSelect} 
        value={this.state.currentSubPositionType} 
        placeholder="Select an option" />
    )
  }

  renderMultiSelectionPositionTypesView() {
    const { talentInfo, allPositionTypes } = this.props
    let groups = []

    if (allPositionTypes) {
      Object.keys(allPositionTypes).map((key) => {
        const positionType = allPositionTypes[key]
        let subPositions = []
        if (positionType.name === 'Practice') {
          return;
        }
        let group = {
          label: positionType.name,
          options: []
        }
        Object.keys(positionType.talent_position_sub_types).map((key) => {
          const positionSubType = positionType.talent_position_sub_types[key]
          group.options.push({
            label: positionSubType,
            value: positionSubType,
            group: positionType.name
          })
        })
        groups.push(group)
      })
    }

    return (
      <Select 
        closeMenuOnSelect={false}
        components={makeAnimated()}
        options={groups} 
        isMulti
        label="Single select" 
        value={this.state.currentAdditionalPositionSubTypes}
        onChange={this.handlecurrentAdditionalPositionSubTypesSelect}
      />
    )
  }

  renderGeneralInfoView() {
    const { talentInfo, allPositionTypes, classes } = this.props
    return (
      <Panel title={"General Info"} >
        <Row className="profile-gender-row">
          <Col xs="12" md="2" className="pt-3 pt-md-3">
            <h5>I am a...</h5> 
          </Col>
          <Col xs="12" md="10" className="pt-0 pt-md-2">
          {
            const_genders.map((gender, index) => {
              return (
                <FlatButton
                  key={index}
                  label={gender}
                  primary={(gender === this.state.gender)}
                  onClick={() => this.clickButton('gender', gender)}
                  className={ (gender === this.state.gender) ? "skill-button-primary" : "normal-button" }
                />)
            })
          }
          </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col xs="12" md="2" className="pt-4 pt-md-4"> <h5>Who is a...</h5> </Col>
          <Col xs="12" md="10" className="pt-3 pt-md-3"> {this.renderPositionTypesView()}</Col>
        </Row>
        <Row className="profile-gender-row">
          <Col xs="12" md="2" className="pt-4 pt-md-4"> <h5>Who also...</h5> </Col>
          <Col xs="12" md="10" className="pt-3 pt-md-3"> { this.renderMultiSelectionPositionTypesView() } </Col>
        </Row>
        <Row className="profile-gender-row">
          <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Button size="large" 
              className={classes.button} 
              onClick={this.handlePositionTypeCancel} >
              {'Cancel'}
            </Button>
            <Button size="large" color="primary" 
              className={classes.button} 
              onClick={this.handlePositionTypeSave}>
              {'Save'}
            </Button>
          </Col>
        </Row>
      </Panel>
    )
  }

  renderBussinessStaff() {
    const { talentInfo, allPositionTypes, classes } = this.props
    const {
      contactInfo,
      emergencyInfo,
    } = this.state
    const selectItemStyle = {
      'whiteSpace': 'preWrap'
    }

    return (
      <Panel title={"The Business Stuff"}>
        <Row className="profile-gender-row">
          <div className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='/contact-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Contact Info"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'completed'}
                  </div>
                </Button>
              </Link>
            </div>

            <div className="profile-other-info-button-container">
              <Link to='/nationality-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Nationality"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
             </div>

            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Languages"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>

            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Height, Weight, & Age Range"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>

            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Medical"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Panel>
    )

  }

  renderFunStaff() {
    return (
      <Panel title={"The Fun Stuff"}>
        <Row className="profile-gender-row">
          <div className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Headline & Bio"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'completed'}
                  </div>
                </Button>
              </Link>
            </div>

            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Resume"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
             </div>

            <div className="profile-other-info-button-container">
              <Link to='/pictures-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Pictures"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'under review'}
                  </div>
                </Button>
              </Link>
            </div>

            <div className="profile-other-info-button-container">
              <Link to='/videos-info'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>

          </div>
        </Row>
      </Panel>
    )
  }

  renderRustumViewer() {
    const { contactInfo, emergencyInfo } = this.state;
    const { classes } = this.props;
    const selectItemStyle = {
      'whiteSpace': 'preWrap'
    }

    return(
      <MuiThemeProvider theme={theme}>
      <div className="profile-edit-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        <Row className="profile-edit-title">
          <h3>Build/Edit My Profile</h3>
        </Row>

        {this.renderGeneralInfoView()}

        <Row className="profile-edit-buttons">
          <Col sm="12">
            <h4>Let's Build or Edit Your Profile...</h4>
          </Col>
        </Row>

        {this.renderBussinessStaff()}

        {this.renderFunStaff()}
        
        <Row>
          <Col sm="12">
            <h5>The Fun Stuff</h5>
          </Col>
          <Col sm="12">
            <Tabs
              onChange={this.handleTab2Change}
              className="tabHead"
              value={this.state.tab2Value}
            >
              <Tab label="My Headline & Bio" value={0} />
              <Tab label="My Resume" value={1} />
              <Tab label="My Pictures" value={2} />
              <Tab label="My Videos" value={3} />
            </Tabs>
            <SwipeableViews
              className="tabContent"
              index={this.state.tab2Value}
              onChangeIndex={this.handleTab2Change}
            >
              <div>
                My Headline & Bio Page
              </div>
              <div style={styles.slide}>
                My Resume Page
                <Dropzone onDrop={ this.handleUploadResume } size={ 150 } accept="application/pdf">
                  <div>
                    Drop pdf files here!
                  </div>
                </Dropzone>
              </div>
              <div style={styles.slide}>
                My Pictures Page
                <Dropzone onDrop={ this.handleUploadMyPictures } size={ 150 } accept="image/*">
                  <div>
                    Drop image files here!
                  </div>
                </Dropzone>
              </div>
 
              <div style={styles.slide}>
                My Videos Page
                <Dropzone onDrop={ this.handleUploadInterviewVideos } size={ 150 } accept="video/mp4">
                  <div>
                    Drop mp4 video files here!
                  </div>
                </Dropzone>
              </div>
            </SwipeableViews>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="profile-checkbox">
            <Checkbox
              id="worked before"
              label=""
            />
            <label>I have worked on a cruise ship before<span>(select if you have previous ship experience)</span></label>
          </Col>
        </Row>
        <Row className="profile-go-buttons">
          <Col sm="12">
            <Link to="/profile">
              <RaisedButton label="View My Profile" primary={true}/>
            </Link>
          </Col>
        </Row>
      </div>
      </MuiThemeProvider>
    );
  }

  render() {
    const { contactInfo, emergencyInfo } = this.state;
    const { classes } = this.props;
    const selectItemStyle = {
      'whiteSpace': 'preWrap'
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className="profile-edit-container">
          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
          <Row className="profile-edit-title">
            <h3>Build/Edit My Profile</h3>
          </Row>

          {this.renderGeneralInfoView()}

          <Row className="profile-edit-buttons">
            <Col sm="12">
              <h4>Let's Build or Edit Your Profile...</h4>
            </Col>
          </Row>

          {this.renderBussinessStaff()}

          {this.renderFunStaff()}

          <Row>
            <Col sm="12" className="profile-checkbox">
              <Checkbox
                id="worked before"
                label=""
              />
              <label>I have worked on a cruise ship before<span>(select if you have previous ship experience)</span></label>
            </Col>
          </Row>
          <Row >
            <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
            <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
              <Link to="/home" className="profile-other-info-button-container">
                <RaisedButton label="Back to My Home Page" primary={true}/>
              </Link>
              <Link to="/profile">
                <RaisedButton label="View My Profile" primary={true}/>
              </Link>
            </Col>
          </Row>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentReducer,  talentInfo, allPositionTypes} = state;
  return {
    auth,
    talentReducer,
    talentInfo: talentInfo.value,
    allPositionTypes: allPositionTypes.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditProfile));
