import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import MemberScreen from '../containers/MemberScreen';
import Header from './Header';
import Footer from './Footer';
import { Sidebar } from './Sidebar';
import {logout} from '../actions/auth'

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
