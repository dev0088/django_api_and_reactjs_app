import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Row, Col, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import './footer.css'
import { adminStyles } from 'styles';


const Footer = (props) => (
  <footer className="mt-3 footer-layout" style={props.position ? {position: props.position} : {}}>
    <Row>
      <Jumbotron className="bg-primary text-white text-center footer-background">
        <Col sm="12" className="text-center pt-3">
          <Link to="/terms">
            <Typography className={props.classes.footerMenuItemText}>
              {"Terms & Conditions"}
            </Typography>
          </Link>
          &nbsp; | &nbsp;
          <Link to="/faq">
            <Typography className={props.classes.footerMenuItemText}>
              {"FAQ"}
            </Typography>
          </Link>
          &nbsp; | &nbsp;
          <Link to="/contact-us">
            <Typography className={props.classes.footerMenuItemText}>
              {"Contact Us"}
            </Typography>
          </Link>
        </Col>
        <Col sm="12" className="text-center pt-3">
          <Typography className={props.classes.footerDescriptionText}>
            ShipTalent.com
          </Typography>
        </Col>
      </Jumbotron>
    </Row>
  </footer>
);

export default withStyles(adminStyles)(Footer);
