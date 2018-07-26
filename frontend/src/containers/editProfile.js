import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SwipeableViews from 'react-swipeable-views';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as talentActions from  '../actions/talentActions';
import './editProfile.css'
import apiConfig from '../constants/api';
import Dropzone from 'react-dropzone';

const styles = {
  slide: {
    padding: 10,
  },
};
const const_genders = ["male", "female"];
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

// var ReactS3Uploader = require('react-s3-uploader');

class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: "male",
      skill: "vocalist",
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
      }
    }
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

  render() {
    const { contactInfo, emergencyInfo } = this.state;
    const selectItemStyle = {
      'whiteSpace': 'preWrap'
    }

    return(
      <div className="profile-edit-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        <Row className="profile-edit-title">
          <h3>Build/Edit My Profile</h3>
        </Row>
        <Row>
          <Col sm="12"> <h5>I am a...</h5> </Col>
          <Col>
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
        <Row>
          <Col sm="12"> <h5>Who is a...</h5> </Col>
          <Col sm="12" className="profile-skills">
          {
            const_skill.map((skill, index) => {
              return (
                <FlatButton
                  key={index}
                  label={skill}
                  primary={(skill === this.state.skill)}
                  onClick={() => this.clickButton('skill', skill)}
                  className={ (skill === this.state.skill) ? "skill-button-primary" : "normal-button" }
                />)
            })
          }
          </Col>
          <Col sm="12" className="profile-subskills">
          {
            const_sub_skill[this.state.skill] && 
            const_sub_skill[this.state.skill].map((skill, index) => {
              return (
                <FlatButton
                  key={index}
                  label={skill}
                  primary={(this.state.subskill.indexOf(skill) > -1)}
                  className={ (this.state.subskill.indexOf(skill) > -1) ? "skill-button-primary" : "normal-button" }
                  onClick={() => this.clickButton('subskill', skill)}
                />)
            })
          }
          </Col>
        </Row>
        <Row>
          <Col sm="12"> <h5>Who also...</h5> </Col>
          <Col sm="12" className="profile-skills">
          {
            const_other_skill.map((other, index) => {
              return (
                <FlatButton
                  key={index}
                  label={other}
                  primary={(this.state.other_skill.indexOf(other) > -1)}
                  onClick={() => this.clickButton('other_skill', other)}
                  className={ (this.state.other_skill.indexOf(other) > -1) ? "skill-button-primary" : "normal-button" }
                />)
            })
          }
          </Col>
          <Col sm="12" className="profile-other-subskills">
          {
            this.state.other_skill.map((other, index) => (
              <div className="profile-other-each-subskills" key={index}>
              {
                const_sub_other_skill[other] && 
                const_sub_other_skill[other].map((skill, index2) => {
                  return (
                    <FlatButton
                      key={index2}
                      label={skill}
                      primary={(this.state.other_sub_skill.indexOf(skill) > -1)}
                      onClick={() => this.clickButton('other_sub_skill', skill)}
                      className={ (this.state.other_sub_skill.indexOf(skill) > -1) ? "skill-button-primary" : "normal-button" }
                    />)
                })
              }
              </div>
            ))
          }
          </Col>
        </Row>
        <Row className="profile-edit-buttons">
          <Col sm="12">
            <h4>Let's Build or Edit Your Profile...</h4>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <h5>The Business Stuff</h5>
          </Col>
          <Col sm="12">
            <Tabs
              onChange={this.handleTab1Change}
              className="tabHead"
              value={this.state.tab1Value}
            >
              <Tab label="My Contact Info" value={0} />
              <Tab label="My Nationality" value={1} />
              <Tab label="My Languages" value={2} />
              <Tab label="My Height, Weight & Age Range" value={3} />
              <Tab label="My Medical" value={4} />
            </Tabs>
            <SwipeableViews
              className="tabContent"
              index={this.state.tab1Value}
              onChangeIndex={this.handleTab1Change}
            >
              <div>
                <h5>Contact Information</h5>
                <Row>
                  <Col sm="6">
                    <TextField
                      name="contact_firstName"
                      id="contact_firstName"
                      placeholder=""
                      value={contactInfo.firstName}
                      onChange={this.handleContactInfoChange}
                      floatingLabelText="First Name"
                      fullWidth={true}
                    />
                  </Col>
                  <Col sm="6">
                    <TextField
                      name="contact_lastName"
                      id="contact_lastName"
                      placeholder=""
                      value={contactInfo.lastName}
                      onChange={this.handleContactInfoChange}
                      floatingLabelText="Last Name"
                      fullWidth={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <TextField
                      type="email"
                      name="contact_email"
                      id="contact_email"
                      placeholder=""
                      value={contactInfo.email}
                      onChange={this.handleContactInfoChange}
                      floatingLabelText="Email Address"
                      fullWidth={true}
                    />
                  </Col>
                  <Col sm="6">
                    <TextField
                      name="contact_mobile"
                      id="contact_mobile"
                      placeholder=""
                      value={contactInfo.mobile}
                      onChange={this.handleContactInfoChange}
                      floatingLabelText="Mobile"
                      fullWidth={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <TextField
                      name="contact_address1"
                      id="contact_address1"
                      placeholder=""
                      value={contactInfo.address1}
                      onChange={this.handleContactInfoChange}
                      floatingLabelText="Mailing Address1"
                      fullWidth={true}
                    />
                  </Col>
                  <Col sm="6">
                    <TextField
                      name="contact_address2"
                      id="contact_address2"
                      placeholder=""
                      value={contactInfo.address2}
                      onChange={this.handleContactInfoChange}
                      floatingLabelText="Mailing Address2"
                      fullWidth={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <TextField
                      name="contact_address3"
                      id="contact_address3"
                      placeholder=""
                      value={contactInfo.address3}
                      onChange={this.handleContactInfoChange}
                      floatingLabelText="Mailing Address3"
                      fullWidth={true}
                    />
                  </Col>
                  <Col sm="6">
                    <TextField
                      name="contact_address4"
                      id="contact_address4"
                      placeholder=""
                      value={contactInfo.address4}
                      onChange={this.handleContactInfoChange}
                      floatingLabelText="Mailing Address4"
                      fullWidth={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <DatePicker
                      hintText="Date of Birth"
                      className="datePicker"
                      value={contactInfo.birthday}
                      onChange={this.handleBirthdayChange}
                    />
                  </Col>
                </Row>
                <h5>Emergency Contact Information</h5>
                <Row>
                  <Col sm="6">
                    <TextField
                      name="emergency_firstName"
                      id="emergency_firstName"
                      placeholder=""
                      value={emergencyInfo.firstName}
                      onChange={this.handleEmergencyInfoChange}
                      floatingLabelText="First Name"
                      fullWidth={true}
                    />
                  </Col>
                  <Col sm="6">
                    <TextField
                      name="emergency_lastName"
                      id="emergency_lastName"
                      placeholder=""
                      value={emergencyInfo.lastName}
                      onChange={this.handleEmergencyInfoChange}
                      floatingLabelText="Last Name"
                      fullWidth={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <TextField
                      name="emergency_email"
                      id="emergency_email"
                      placeholder=""
                      value={emergencyInfo.email}
                      onChange={this.handleEmergencyInfoChange}
                      floatingLabelText="Email Address"
                      fullWidth={true}
                    />
                  </Col>
                  <Col sm="6">
                    <TextField
                      name="emergency_phone"
                      id="emergency_phone"
                      placeholder=""
                      value={emergencyInfo.phone}
                      onChange={this.handleEmergencyInfoChange}
                      floatingLabelText="Phone"
                      fullWidth={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <SelectField
                      id="emergency_relationship"
                      name="emergency_relationship"
                      floatingLabelText="Relationship"
                      value={emergencyInfo.relationship}
                      onChange={this.handleRelationshipChange}
                      menuItemStyle={selectItemStyle}
                    >
                      <MenuItem value={1} primaryText="Wife" />
                      <MenuItem value={2} primaryText="Husband" />
                      <MenuItem value={3} primaryText="Father" />
                      <MenuItem value={4} primaryText="Mother" />
                      <MenuItem value={5} primaryText="Brother" />
                      <MenuItem value={6} primaryText="Sister" />
                      <MenuItem value={7} primaryText="Other" />
                    </SelectField>
                  </Col>
                </Row>
              </div>
              <div style={styles.slide}>
                My Nationality Page
              </div>
              <div style={styles.slide}>
                My Languages Page
              </div>
              <div style={styles.slide}>
                My Height, Weight & Age Range Page
              </div>
              <div style={styles.slide}>
                My Medical Page
              </div>
            </SwipeableViews>
          </Col>
        </Row>
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
    );
  }
}

function mapStateToProps(state) {
  const { auth, talentReducer } = state;
  return {
    auth,
    talentReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
