import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Truncate from 'react-truncate-html';
import './editProfile.css'

const styles = {
  flatPrimary: {
    color: "#258df2",
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
class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: "male",
      skill: "vocalist",
      subskill: ["tenor"],
      other_skill: ["dances", "acts"],
      other_sub_skill: [],
      notification: false
    }
  }

  render() {
    let other_skill = const_skill.slice(0);
    let skill_index = other_skill.indexOf(this.state.skill);
    if (skill_index !== -1) other_skill.splice(skill_index, 1);
    return(
      <div className="profile-edit-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        <Row className="profile-edit-title">
          <h3>Build/Edit My Profile</h3>
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
