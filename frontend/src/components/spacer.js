import React from 'react';
import PropTypes from 'prop-types';

const Spacer = ({ size }) => (
  <div style={{ height: size }} />
);

Spacer.propTypes = {
  size: PropTypes.number,
};

Spacer.defaultProps = {
  size: 20,
};

export default Spacer;
