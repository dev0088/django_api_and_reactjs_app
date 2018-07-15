import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col, Jumbotron } from 'reactstrap';
import './footer.css'

const styles = {
  flatPrimary: {
    color: "#FFFFFF",
  },
};
const Footer = (props) => (
  <footer className="mt-5 footer-layout" style={props.position ? {position: props.position} : {}}>
    <Row>
			<Jumbotron className="bg-primary text-white text-center footer-background">
	      <Col sm="12" className="text-center pt-3">
          <FlatButton
            label="Terms & Conditions"
            href="/terms"
            style={styles.flatPrimary}
          />
          &nbsp; | &nbsp;
          <FlatButton
            label="FAQ"
            href="/faq"
            style={styles.flatPrimary}
          />
          &nbsp; | &nbsp;
          <FlatButton
            label="Contact Us"
            href="/contact-us"
            style={styles.flatPrimary}
          />
					<p className="footer-description">ShiptTalent.com<br/>Take the lead in being cast at sea</p>
	      </Col>
			</Jumbotron>
    </Row>
  </footer>
);

export default Footer;
