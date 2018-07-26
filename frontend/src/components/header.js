import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  Nav,
  Navbar,
  Collapse,
  NavbarToggler,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { SidebarNavItems } from './sidebar';

import './header.css'

const styles = {
  menuitem: {
    color: "#FFF"
  }
}
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
    this.state = {
      isOpen: false,
      subMenuOpen: false
    };
  }

  onLogout = () => this.props.logout(this.props.auth.access.token).then(() => this.props.history.push('/'));

  toggleDropDown = () => this.setState({ isOpen: !this.state.isOpen });
  handleClickTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      subMenuOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      subMenuOpen: false,
    });
  };
  render() {
    const { auth } = this.props;
    // const loggedIn = (member && member.email);
		// const loggedIn = true
		const loggedIn = (auth && auth.access && auth.access.email);
    return (
      <header>
        <Navbar dark color="primary" expand="sm" className="fixed-top">
          <Link to="/home" className="navbar-brand" style={{ color: '#FFF' }}>
						<img className="brand-image"
              alt="Logo"
							src={require('../images/logo.png')} />

          </Link>
          { loggedIn && (
              <Link to="/interview-start">
                <MenuItem style={styles.menuitem} primaryText="Video Interview" />
              </Link>
            )
          }
          <NavbarToggler onClick={this.toggleDropDown} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <div className="d-block d-sm-none">
                {SidebarNavItems()}
              </div>
              <RaisedButton
                className="my-account"
                onClick={this.handleClickTap}
                label={loggedIn ? `Hi, ${auth.access.email}` : 'My Account'}
              />
              <Popover
                open={this.state.subMenuOpen}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}
                animation={PopoverAnimationVertical}
              >
                {!loggedIn &&
                  <Menu>
                    <Link to="/login">
                      <MenuItem primaryText="Login" />
                    </Link>
                    <Link to="/sign-up">
                      <MenuItem primaryText="Sign Up" />
                    </Link>
                  </Menu>
                }
                {loggedIn &&
                  <Menu>
                    <Link to="/profile">
                      <MenuItem primaryText="View My Profile" />
                    </Link>
                    <Link to="/account">
                      <MenuItem primaryText="Account Settings" />
                    </Link>
                    <Divider />
                    <MenuItem primaryText="Logout" onClick={this.onLogout} />
                  </Menu>
                }
              </Popover>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(Header);
