import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import MemberScreen from '../containers/memberScreen';
import Header from './header';
import Footer from './footer';

const Template = ({ children }) => (
  <div>
    <MemberScreen Layout={Header} />
    <Container fluid>
      {/* <Sidebar /> */}
      <div className="px-sm-5 py-sm-5 ml-sm-auto">
        {children}
      </div>
    </Container>
    <Footer />
  </div>
);

Template.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Template;
