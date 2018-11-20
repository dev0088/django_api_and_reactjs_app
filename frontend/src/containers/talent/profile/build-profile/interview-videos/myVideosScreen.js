import React, {Component} from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Panel from 'components/general/panel'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as talentActions from 'actions/talentActions';
import '../contact-info/myContactInfo.css'
import './myVideosScreen.css'
import { styles } from 'styles';


class MyVideos extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderButtonsGroup() {
    return (
      <Panel title={"My Videos"}>
        <Row className="profile-gender-row">
          <Col className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Video Greetings"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'completed'}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Vocal Audition Videos"}
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
                    {"My Dance Audition Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
             </div>
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Acting Audition Videos"}
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
                    {"My Aerialist Audition Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col className="profile-other-info-button-group">
            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Musician Audition Videos"}
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
                    {"My Technician Audition Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col className="profile-other-info-button-group">

            <div className="profile-other-info-button-container">
              <Link to='#'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Cruise Staff Audition Videos"}
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
                    {"My Youth Staff Audition Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Row className="profile-gender-row">
          <Col className="profile-other-info-button-group">

            <div className="profile-other-info-button-container">
              <Link to='/practice-interview-videos'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Practice Interview Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>

            <div className="profile-other-info-button-container">
              <Link to='/live-interview-videos'>
                <Button variant="contained"  color="primary" className={"profile-other-info-button"} >
                  <div className="profile-other-info-button-title">
                    {"My Live Interview Videos"}
                  </div>
                  <div className="profile-other-info-button-status">
                    {'in progress'}
                  </div>
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Row >
          <Col className="profile-other-info-button-description">
            <Typography gutterBottom variant='Subheading'>
              <b>Video Interviews (required)</b>
              {`
                 are located within the section of your primary discripline
                (vocalist, dancer, musician, techinician, cruise staff or youth staff).
              `}
            </Typography>
          </Col>
        </Row>
      </Panel>
    )
  }

  render() {
    return (
      <div className="contact-info-view-container">
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}

        {this.renderButtonsGroup()}

        <Row >
          <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-3 profile-save-button-group-col">
            <Link to="/edit-profile">
              <RaisedButton label="Back to Build/Edit My Profile" primary={true}/>
            </Link>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth, talentReducer,  talentInfo } = state;
  return {
    auth,
    talentReducer,
    talentInfo: talentInfo.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyVideos));
