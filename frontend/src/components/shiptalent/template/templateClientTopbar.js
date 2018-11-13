import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import MemberScreen from '../../../containers/talent/memberScreen';
import ClientHeader from '../headers/clientHeader';
import ClientFooter from '../footer/clientFooter';

const Template = ({ children }) => (
  <div>
    <MemberScreen Layout={ClientHeader} />
    <Container fluid>
      {children}
    </Container>
    <ClientFooter />
  </div>
);

Template.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Template;
