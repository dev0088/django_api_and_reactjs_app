import React from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';
import './Footer.css'

const Footer = () => (
  <footer className="mt-5">
    <Row>
			<Jumbotron className="bg-primary text-white text-center footer-background">
	      <Col sm="12" className="text-center pt-3">
	        <p>
	          <a target="_blank" rel="noopener noreferrer" href="#" className="footer-link">Terms & Conditions</a> &nbsp; | &nbsp;
						<a target="_blank" rel="noopener noreferrer" href="#" className="footer-link">FAQ</a>&nbsp; | &nbsp;
						<a target="_blank" rel="noopener noreferrer" href="#" className="footer-link">Contact Us</a>
	        </p>
					<p className="footer-description">ShiptTalent.com<br/>Take the lead in being cast at sea</p>
	      </Col>
			</Jumbotron>
    </Row>
  </footer>
);

export default Footer;
