import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import './editProfile.css'

const styles = {
  buttonCompleted: {
    backgroundColor: "#258df2",
  },
  buttonNormal: {

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
  "sings": [],
  "dances": [],
  "moves": [],
  "acts": [],
  "plays": []
}
class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: "male",
      skill: "vocalist",
      subskill: ["tenor"],
      other_skill: ["dances", "acts"],
      other_sub_skill: [],
      notification: false,
      tab1Value: 0,
      tab2Value: 0
    }
  }
  clickButton = (type, val) =>  {
    if (type === 'other_skill')
    {
      let temp_skill = this.state.other_skill.slice(), pos;
      if ((pos = temp_skill.indexOf(val)) > -1){
        temp_skill.splice(pos, 1);
      }
      else
        temp_skill.push(val);
      this.setState({ 'other_skill': temp_skill });
    }
    else
      this.setState({ [type]: val });
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
  };
  render() {
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
                />)
            })
          }
          </Col>
        </Row>
        <Row>
          <Col sm="12"> <h5>Who is a...</h5> </Col>
          <Col>
          {
            const_skill.map((skill, index) => {
              return (
                <FlatButton
                  key={index}
                  label={skill}
                  primary={(skill === this.state.skill)}
                  onClick={() => this.clickButton('skill', skill)}
                />)
            })
          }
          </Col>
        </Row>
        <Row>
          <Col sm="12"> <h5>Who also...</h5> </Col>
          <Col>
          {
            const_other_skill.map((other, index) => {
              return (
                <FlatButton
                  key={index}
                  label={other}
                  primary={(this.state.other_skill.indexOf(other) > -1)}
                  onClick={() => this.clickButton('other_skill', other)}
                />)
            })
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
                <h2 style={styles.headline}>Tabs with slide effect</h2>
                Swipe to see the next slide.<br />
              </div>
              <div style={styles.slide}>
                slide n°2
              </div>
              <div style={styles.slide}>
                slide n°3
              </div>
              <div style={styles.slide}>
                slide n°4
              </div>
              <div style={styles.slide}>
                slide n°5
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
                <h2 style={styles.headline}>Tabs with slide effect</h2>
                Swipe to see the next slide.<br />
              </div>
              <div style={styles.slide}>
                slide n°2
              </div>
              <div style={styles.slide}>
                slide n°3
              </div>
              <div style={styles.slide}>
                slide n°4
              </div>
            </SwipeableViews>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
