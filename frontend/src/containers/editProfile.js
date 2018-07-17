import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
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
class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName:    "First",
      lastName:     "Last",
      headLine:     "POP/Rock Tenor with Strong Dancing and Acting Skills",
      photoURL:     "../images/user1.jpg",
      bio:          "2016-2018: Lead Vocalist with crystal Cruises - Crystal symphony <br/> 2013-2015: Lead Vocalist with crystal Cruises - Crystal symphony <br/> 2012-2015: Singer/Dancer - Hardly Useful Productions - Wichita, KS USA <br/>",
      skills:       ["Dances", "Acts", "Movies"],
      nationality:  "United States",
      language:     ["English", "Spanish"],
      error:        false,
    }
  }

  render() {
    return(
      <div className="profile-edit-container">
        
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
