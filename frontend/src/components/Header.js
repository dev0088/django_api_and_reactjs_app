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

class Header extends Component {
  // static propTypes = {
  //   member: PropTypes.shape({
  //     firstName: PropTypes.string,
  //     email: PropTypes.string,
  //   }),
  //   logout: PropTypes.func.isRequired,
  //   history: PropTypes.shape({
  //     push: PropTypes.func.isRequired,
  //   }).isRequired,
  // }

  static defaultProps = {
    member: {},
		auth: {}
  }

  constructor(props) {
    super(props);
		this.toggleDropDown = this.toggleDropDown.bind(this);
    this.state = { isOpen: false };
  }

  onLogout = () => this.props.logout().then(() => this.props.history.push('/'));

  toggleDropDown = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { member, auth } = this.props;
		console.log('==== member: ', member, auth)
    // const loggedIn = (member && member.email);
		// const loggedIn = true
		const loggedIn = (auth && auth.access && auth.access.email);
    return (
      <header>
        <Navbar dark color="primary" expand="sm" className="fixed-top">
          <Link to="/" className="navbar-brand" style={{ color: '#FFF' }}>
						<img className="brand-image"
							src={require('../images/logo.png')} />

          </Link>
          { loggedIn && (
              <Link to="/video-interview" className="navbar-brand" style={{ color: '#FFF' }}>
                <span className="brand-name">Video Interview</span>
              </Link>
            )
          }
          <NavbarToggler onClick={this.toggleDropDown} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <div className="d-block d-sm-none">
                {SidebarNavItems()}
              </div>
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  {/* {loggedIn ? `Hi, ${member.firstName}` : 'My Account'} */}
									{loggedIn ? `Hi, ${auth.access.email}` : 'My Account'}
                </DropdownToggle>
                <DropdownMenu>
                  {!loggedIn &&
                    <div>
                      <DropdownItem>
                        <Link to="/login">Login</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link to="/sign-up">Sign Up</Link>
                      </DropdownItem>
                    </div>
                  }
                  {loggedIn &&
                    <div>
                      <DropdownItem>
                        <Link to="/update-profile">Update Profile</Link>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <a onClick={this.onLogout}>Logout</a>
                      </DropdownItem>
                    </div>
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(Header);
