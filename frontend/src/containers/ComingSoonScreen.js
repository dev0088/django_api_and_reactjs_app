import React, {Component} from 'react';
import { Row, Col, Card } from 'reactstrap';
import ReactPlayer from 'react-player'
import './ComingSoonScreen.css'

class ComingSoonScreen extends Component {

	render() {

		return(
			<Row className="justify-content-center bg-info" style={{height: "100%"}}>
				<Col sm="6" offset-sm="3">
					<Card className="comingsoon-layout">
						<img src={require('../images/coming_soon.jpg')} className="comingsoon-background-image"/>
					</Card>
				</Col>
			</Row>
		);
	}
}
export default ComingSoonScreen;
