import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const Error = ({ title, content }) => (
  <Row>
    <Col lg="4">
      <h2>{title}</h2>
      <p>{content}</p>
      <p>
        <RaisedButton
          label="Go Home"
          href="/"
          primary={true}
        />
      </p>
    </Col>
  </Row>
);

Error.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Error.defaultProps = {
  title: 'Uh oh',
  content: 'An unexpected error came up',
};

export default Error;
