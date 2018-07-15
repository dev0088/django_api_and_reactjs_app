import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  Nav,
  Navbar,
  Collapse,
  NavbarToggler,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
// import { SidebarNavItems } from './sidebar';

import './header.css'
import './headerOfComingSoon.css'

class HeaderOfComingSoon extends Component {

  constructor(props) {
    super(props);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.state = { isOpen: false };
  }

  onLogout = () => this.props.logout(this.props.auth.access.token).then(() => this.props.history.push('/login'));

  toggleDropDown = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <header>
        <Navbar dark color="white" expand="sm" className="fixed-top">
          <NavbarToggler onClick={this.toggleDropDown} className="header-comingsoon-navbar-toggler"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
							<Link to="/login">
                Login
              </Link>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(HeaderOfComingSoon);
