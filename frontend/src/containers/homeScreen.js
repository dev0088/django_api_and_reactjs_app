import React, {Component} from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPlayer from 'react-player'
import renderHTML from 'react-render-html';
import Truncate from 'react-truncate-html';
import * as shiptalentInfoActions from  '../actions/shiptalentInfoActions'
import './homeScreen.css'

class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			shiptalentInfo: props.shiptalentInfo.value,
		};

	}

	componentWillMount() {
		this.props.shiptalentInfoActions.getShipTalentInfo()
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
					console.log('=== info: ', info)
					return info.name === name;
				})

				return info ? info.value : ''
			}
		} catch (error) {

		}

		return '';
	}

  render() {
		const { shiptalentInfo } = this.state

    return(
      <div>
        <Row>
          <Jumbotron className="text-center slogan-description-background">
            <h1>{this.getValueByName('slogan')}</h1>
            <p></p>
            <p className="lead">{this.getValueByName('slogan_description')}</p>
          </Jumbotron>
          <img src={require('../images/backgrounds/background_side.png')} alt="home background" className="home-background-image"/>
        </Row>
        <Row className="pt-5">
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <h3><i className="icon-map" />What is ShipeTalent.com?</h3>
							<Truncate
							  lines={9}
							  dangerouslySetInnerHTML={{
							   __html: this.getValueByName('what_is_shiptalent')
							  }}
							/>
            <p>
              <a target="_blank" rel="noopener noreferrer" href="#" className="btn btn-primary">
                More details ...
              </a>
            </p>
          </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <h3><i className="icon-fire" /> How Does ShiptTalent.com Work?</h3>
						<Truncate
							lines={9}
							dangerouslySetInnerHTML={{
							 __html: this.getValueByName('how_does_shiptalent_work')
							}}
						/>
            <p>
              <a target="_blank" rel="noopener noreferrer" href="#" className="btn btn-primary">
                More details ...
              </a>
            </p>
          </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <h3><i className="icon-organization" /> Why use ShiptTalent.com?</h3>
						<Truncate
							lines={9}
							dangerouslySetInnerHTML={{
							 __html: this.getValueByName('why_use_shiptalent')
							}}
						/>
            <p>
              <a target="_blank" rel="noopener noreferrer" href="#" className="btn btn-primary">
                Mode details ...
              </a>
            </p>
          </Col>
        </Row>
        <Row className="pt-md-5 pb-5">
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <h3><i className="icon-layers" /> The ShipTalent.com Difference</h3>
							<Truncate
								lines={9}
								dangerouslySetInnerHTML={{
								 __html: this.getValueByName('the_shiptalent_difference')
								}}
							/>
            <p>
              <a target="_blank" rel="noopener noreferrer" href="#"  className="btn btn-primary">
                More details ...
              </a>
            </p>
          </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <h3><i className="icon-drop" /> Web Styles</h3>
            <p>Webpack, SCSS, Bootstrap and ReactStrap - ready at your fingertips.</p>
            <p>
              <a target="_blank" rel="noopener noreferrer" href="#" className="btn btn-primary">
                ReactStrap Docs
              </a>
            </p>
          </Col>
          <Col xs="12" md="4" className="pt-3 pt-md-0">
            <h3><i className="icon-user-following" /> Auth</h3>
            <p>Most apps need user authentication. This one comes ready to go with Firebase Auth - but you can easily change that within the </p>
            <p>
              <a target="_blank" rel="noopener noreferrer" href="#" className="btn btn-primary">
                Firebase Auth Docs
              </a>
            </p>
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
		shiptalentInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    shiptalentInfoActions: bindActionCreators(shiptalentInfoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
