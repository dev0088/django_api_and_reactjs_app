import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Truncate from 'react-truncate-html';
import { Link } from 'react-router-dom';
import './myProfile.css'

const styles = {
  flatPrimary: {
    color: "#258df2",
  },
};
class MyProfile extends Component {

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
      notification: false
    }
  }

  render() {
    return(
      <div className="profile-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        <Row>
          <Col md="9">
            <Row className="details-content">
              <Col md="2" className="profile-image">
                <img src={require("../images/user1.jpg")} alt="Profile"/>
              </Col>
              <Col md="10" className="profile-name">
                <h3>
                  {this.state.firstName + " " + this.state.lastName}
                </h3>
                <p>{this.state.nationality}</p>
              </Col>
            </Row>
            <Row className="details-content">
              <Col md="12" className="profile-bio">
                <h4>{this.state.headLine}</h4>
                <Truncate
                  lines={5}
                  dangerouslySetInnerHTML={{
                   __html: this.state.bio
                  }}
                />
              </Col>
            </Row>
            <Row className="details-content">
              <Col md="12" className="profile-skills">
                <h4>Skills</h4>
                {
                  this.state.skills.map((skill,index) => {
                    return (<FlatButton
                      label={skill}
                      key={index}
                      style={styles.flatPrimary}
                    />)
                  })
                }
              </Col>
            </Row>
            <Row className="details-content">
              <Col md="12" className="profile-language">
                <h4>Language</h4>
                {
                  this.state.language.map((lang, index) => {
                    return (<FlatButton
                      label={lang}
                      key={index}
                      style={styles.flatPrimary}
                    />)
                  })
                }
              </Col>
            </Row>
          </Col>
          <Col md="3" className="profile-buttons">
            <Link to="/edit-profile">
              <RaisedButton label="Build/Edit Profile" primary={true} fullWidth={true} />
            </Link>
            <RaisedButton label="View in Detail" primary={true} fullWidth={true} />
            <RaisedButton label="View Sample" primary={true} fullWidth={true} />
            <RaisedButton label="Back to HomePage" primary={true} fullWidth={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
