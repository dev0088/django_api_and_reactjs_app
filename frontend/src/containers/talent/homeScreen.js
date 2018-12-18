import React, {Component} from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player'
import Truncate from 'react-truncate-html';
import RaisedButton from 'material-ui/RaisedButton';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as shiptalentInfoActions from 'actions/shiptalentInfoActions';
import * as talentActions from 'actions/talentActions';
import { styles } from 'styles';
import './homeScreen.css';


class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shiptalentInfo: props.shiptalentInfo.value,
    };
  }

  componentWillMount() {
    this.props.shiptalentInfoActions.getShipTalentInfo()
    this.props.talentActions.getAllPositionTypes()
    this.props.talentActions.getAllSkills()
    this.props.talentActions.getWizardQuestionScenario()

    this.setState({
      shiptalentInfo: this.props.shiptalentInfo.value
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shiptalentInfo: nextProps.shiptalentInfo.value
    })
  }

  getValueByName(name) {
    try {
      if (this.state.shiptalentInfo) {
        let info = this.state.shiptalentInfo.find(function(info) {
          return info.name === name;
        })

        return info ? info.value : ''
      }
    } catch (error) {

    }

    return '';
  }

  render() {
    return(
      <div>
        <Row>
          <Jumbotron className="text-center slogan-description-background">
            <h1>{this.getValueByName('slogan')}</h1>
            <p></p>
            <p className="lead">{this.getValueByName('slogan_description')}</p>
          </Jumbotron>
					<Jumbotron className="text-center home-buttons-container">
						<Row>
							<Col xs="12" md="3" className="pt-4 pt-md-4" />
							<Col xs="12" md="3" className="pt-4 pt-md-4">
								<Link to="/my-profile">
									<Button variant="contained"  color="primary" className={"home-button"} >
										<div className="home-button-title">
											{"My Profile"}
										</div>
										<div className="home-button-status">
											{'Build, edit and view what employers see'}
										</div>
									</Button>
								</Link>
							</Col>
							<Col xs="12" md="3" className="pt-4 pt-md-4">
								<Link to="/availability-info">
									<Button variant="contained"  color="primary" className={"home-button"} >
										<div className="home-button-title">
											{"My Availability"}
										</div>
										<div className="home-button-status">
											{'Set and update your schedule'}
										</div>
									</Button>
								</Link>
							</Col>
							<Col xs="12" md="3" className="pt-4 pt-md-4" />
						</Row>
						<Row>
							<Col xs="12" md="3" className="pt-4 pt-md-4" />
							<Col xs="12" md="3" className="pt-4 pt-md-4">
								<Link to="/talent-auditions">
									<Button variant="contained"  color="primary" className={"home-button"} >
										<div className="home-button-title">
											{"My Auditions"}
										</div>
										<div className="home-button-status">
											{'Who has seen me?'}
										</div>
									</Button>
								</Link>
							</Col>
							<Col xs="12" md="3" className="pt-4 pt-md-4">
								<Link to="/my-account">
									<Button variant="contained" color="primary" className={"home-button"} >
										<div className="home-button-title">
											{"My Account"}
										</div>
										<div className="home-button-status">
											{'Change password; Finance summary'}
										</div>
									</Button>
								</Link>
							</Col>
							<Col xs="12" md="3" className="pt-4 pt-md-4" />
						</Row>
					</Jumbotron>
          <img src={require('../../images/backgrounds/background_side.png')} alt="home background" className="home-background-image"/>
        </Row>
        <Row className="pt-5">
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <div className="details-content">
              <h3><i className="icon-map" />What is ShipTalent.com?</h3>
                <Truncate
                  lines={9}
                  dangerouslySetInnerHTML={{
                   __html: this.getValueByName('what_is_shiptalent')
                  }}
                />
              <Link to="/faq/what_is_shiptalent">
                <RaisedButton
                  label="More details ..."
                  primary={true}
                />
              </Link>
            </div>
          </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <div className="details-content">
              <h3><i className="icon-fire" /> How Does ShipTalent.com Work?</h3>
              <Truncate
                lines={9}
                dangerouslySetInnerHTML={{
                 __html: this.getValueByName('how_does_shiptalent_work')
                }}
              />
              <Link to="/faq/how_does_shiptalent_work">
                <RaisedButton
                  label="More details ..."
                  primary={true}
                />
              </Link>
            </div>
          </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <div className="details-content">
              <h3><i className="icon-organization" /> Why use ShipTalent.com?</h3>
              <Truncate
                lines={9}
                dangerouslySetInnerHTML={{
                 __html: this.getValueByName('why_use_shiptalent')
                }}
              />
              <Link to="/faq/why_use_shiptalent">
                <RaisedButton
                  label="More details ..."
                  primary={true}
                />
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="pt-md-5 pb-5">
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <div className="details-content">
              <h3><i className="icon-layers" /> The ShipTalent.com Difference</h3>
                <Truncate
                  lines={9}
                  dangerouslySetInnerHTML={{
                   __html: this.getValueByName('the_shiptalent_difference')
                  }}
                />
              <Link to="/faq/the_shiptalent_difference">
                <RaisedButton
                  label="More details ..."
                  primary={true}
                />
              </Link>
            </div>
          </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <div className="details-content">
              <h3><i className="icon-drop" /> Web Styles</h3>
              <p>Webpack, SCSS, Bootstrap and ReactStrap - ready at your fingertips.</p>
              <RaisedButton
                label="ReactStrap Docs"
                primary={true}
              />
            </div>
          </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <div className="details-content">
              <h3><i className="icon-user-following" /> Auth</h3>
              <p>Most apps need user authentication. This one comes ready to go with Firebase Auth - but you can easily change that within the </p>
              <RaisedButton
                label="Firebase Auth Docs"
                primary={true}
              />
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="pt-5">
          <Col xs="12" sm="12" lg="12">
            <h3>How to Use ShipTalent.com</h3>
            <div>
              <ReactPlayer
                url='https://www.youtube.com/watch?v=mubmRIh50Zg'
                loop width='100%'
                height='720px'
                controls={true}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { shiptalentInfo } = state;
  return {
    shiptalentInfo: shiptalentInfo,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    shiptalentInfoActions: bindActionCreators(shiptalentInfoActions, dispatch),
    talentActions: bindActionCreators(talentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeScreen));
