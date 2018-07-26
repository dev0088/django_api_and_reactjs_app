import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import './footer.css'

const styles = {
  flatPrimary: {
    color: "#FFFFFF",
  },
};
const Footer = (props) => (
  <footer className="mt-3 footer-layout" style={props.position ? {position: props.position} : {}}>
    <Row>
			<Jumbotron className="bg-primary text-white text-center footer-background">
	      <Col sm="12" className="text-center pt-3">
          <Link to="/terms">
            <FlatButton
              label="Terms & Conditions"
              style={styles.flatPrimary}
            />
          </Link>
          &nbsp; | &nbsp;
          <Link to="/faq">
            <FlatButton
              label="FAQ"
              style={styles.flatPrimary}
            />
          </Link>
          &nbsp; | &nbsp;
          <Link to="/contact-us">
            <FlatButton
              label="Contact Us"
              style={styles.flatPrimary}
            />
          </Link>  
					<p className="footer-description">ShipTalent.com<br/>Take the lead in being cast at sea</p>
	      </Col>
			</Jumbotron>
    </Row>
  </footer>
);

export default Footer;
