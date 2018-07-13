import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import MemberScreen from '../containers/memberScreen';
import Header from './header';
import Footer from './footer';
import { Sidebar } from './sidebar';
import { logout } from '../actions/auth'

const Template = ({ children }) => (
  <div>
    <MemberScreen Layout={Header} />
    <Container fluid style={{height: '100vh'}}>
      {children}
    </Container>
		<Footer position='absolute'/>
  </div>
);

Template.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Template;
