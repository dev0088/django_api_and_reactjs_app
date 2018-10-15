import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';
import Panel from '../../../components/panel';
import './welcomeBuildProfileWizard.css';


class WelcomeBuildProfileWizard extends Component {
  constructor(props) {
    super(props);
  }

  renderButton() {
    return (
      <Panel title={"Build My Profile Wizard"}>
				<h5 align="center" className="profile-bio-description">
          Welcome to the Build My Profile Wizard.
				</h5>
        <h5 align="center" className="profile-bio-description">
          In this section, we will build your profile one step at a time.
				</h5>
        <br/>

        <Row>
          <Col xs="12" md="3" className="pt-4 pt-md-4" />
          <Col xs="12" md="6" className="pt-4 pt-md-4">
            <Link to="/profile-wizard/select-male">
              <Button variant="contained"  color="primary" className={"home-button"} >
                <div className="home-button-title-only">
                  {"Let's Build My Profile"}
                </div>
              </Button>
            </Link>
          </Col>
          <Col xs="12" md="3" className="pt-4 pt-md-4" />
        </Row>

      </Panel>
    )
  }

  render() {
    return (
      <div className="contact-info-view-container">
        {this.renderButton()}
        <Row>
          <Col xs="12" md="4" className="pt-3 pt-md-3 profile-back-button-group-col">
            <Link to="/my-profile">
              <RaisedButton label="Back" primary={true}/>
            </Link>
          </Col>
          <Col xs="12" md="8" className="pt-4 pt-md-4"> </Col>
        </Row>
      </div>
  	)
  }
}

export default WelcomeBuildProfileWizard;
