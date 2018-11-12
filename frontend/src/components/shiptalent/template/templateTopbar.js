import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import MemberScreen from '../../../containers/talent/memberScreen';
import Header from '../headers/talentHeader';
import Footer from '../footer/talentFooter';

const Template = ({ children }) => (
  <div>
    <MemberScreen Layout={Header} />
    <Container fluid>
      {children}
    </Container>
    <Footer />
  </div>
);

Template.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Template;
