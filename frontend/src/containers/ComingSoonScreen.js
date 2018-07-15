import React, {Component} from 'react';
import { Row, Col, Card } from 'reactstrap';
import './comingSoonScreen.css'

class ComingSoonScreen extends Component {

	render() {
		return(
			<Row className="justify-content-center" style={{height: "100%"}}>
				<Col sm="6" offset-sm="3">
					<Card className="comingsoon-layout">
						<img src={require('../images/coming_soon.png')} alt="Comingson Background" className="comingsoon-background-image"/>
					</Card>
				</Col>
			</Row>
		);
	}
}
export default ComingSoonScreen;
