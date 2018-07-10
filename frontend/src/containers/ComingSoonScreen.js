import React, {Component} from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';
import ReactPlayer from 'react-player'
import './ComingSoonScreen.css'

class ComingSoonScreen extends Component {

	render() {

		return(
		  <div>
				<Row>
					<img src={require('../images/coming_soon.jpg')} className="home-background-image"/>
				</Row>
		  </div>
		);
	}
}
export default ComingSoonScreen;
