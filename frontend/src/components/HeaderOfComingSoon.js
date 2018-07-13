import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  Navbar,
  Collapse,
  DropdownMenu,
  DropdownItem,
  NavbarToggler,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Config from '../constants/config';
import { SidebarNavItems } from './Sidebar';

import './Header.css'
import './HeaderOfComingSoon.css'

class HeaderOfComingSoon extends Component {

  static defaultProps = {
    member: {},
  }

  constructor(props) {
    super(props);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.state = { isOpen: false };
  }

  onLogout = () => this.props.logout().then(() => this.props.history.push('/login'));

  toggleDropDown = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { member } = this.props;
    return (
      <header>
        <Navbar dark color="white" expand="sm" className="fixed-top">
          <NavbarToggler onClick={this.toggleDropDown} className="header-comingsoon-navbar-toggler"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <div className="d-block d-sm-none">
                {SidebarNavItems()}
              </div>
							<Link to="/login">Login</Link>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(HeaderOfComingSoon);
