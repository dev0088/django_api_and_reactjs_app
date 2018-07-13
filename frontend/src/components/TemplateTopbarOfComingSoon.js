import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import MemberScreen from '../containers/memberScreen';
import HeaderOfComingSoon from './headerOfComingSoon';

const Template = ({ children }) => (
  <div>
    <MemberScreen Layout={HeaderOfComingSoon} />
    <Container fluid style={{height: '100vh'}}>
      {children}
    </Container>
  </div>
);

Template.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Template;
