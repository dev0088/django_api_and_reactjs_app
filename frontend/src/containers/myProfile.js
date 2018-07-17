import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPlayer from 'react-player'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import renderHTML from 'react-render-html';
import Truncate from 'react-truncate-html';
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
      bio:          "2016-2018: Lead Vocalist with crystal Cruises - Crystal symphony <br/> \
                      2013-2015: Lead Vocalist with crystal Cruises - Crystal symphony <br/> \
                      2012-2015: Singer/Dancer - Hardly Useful Productions - Wichita, KS USA <br/>",
      skills:       ["Dances", "Acts", "Movies"],
      nationality:  "United States",
      language:     ["English", "Spanish"],
      error:        false,
    }
  }

  render() {
    return(
      <div className="profile-container">
        <Row>
          <Col md="9">
            <Row className="details-content">
              <Col md="2" className="profile-image">
                <img src={require("../images/user1.jpg")} />
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
                  this.state.skills.map(skill => {
                    return (<FlatButton
                      label={skill}
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
                  this.state.language.map(lang => {
                    return (<FlatButton
                      label={lang}
                      style={styles.flatPrimary}
                    />)
                  })
                }
              </Col>
            </Row>
          </Col>
          <Col md="2" md-offset="1" className="profile-buttons">
            <RaisedButton label="Build/Edit Profile" primary={true} fullWidth={true} />
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
