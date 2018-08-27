import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  Nav,
  Navbar,
  Collapse,
  NavbarToggler,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as talentActions from  '../actions/talentActions';
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

  componentDidMount() {
    let __this = this;
    setTimeout(function(){
      let { auth } = __this.props;
      if (auth.access.user_id){
        __this.props.talentActions.getTalentInfo(auth.access.user_id);
      }
    }, 100);
  }

  onLogout = () => {
    this.props.logout(this.props.auth.access.token);
    if (this.props.history)
      this.props.history.push('/');
    else
      document.location.href="/";
  }

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
    const { auth, talentInfo } = this.props;
    const loggedIn = (auth && auth.access && auth.access.email);
    let username = "";
    if (loggedIn) {
      if (talentInfo && talentInfo.value){
        username = talentInfo.value['user']['first_name'];
        if (username !== "")
          username = username.charAt(0).toUpperCase() + username.slice(1);
      }
    }
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
                label={loggedIn ? `Hi, ${username}` : 'My Account'}
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
                    <Link to="/edit-profile">
                      <MenuItem primaryText="Build/Edit My Profile" />
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

function mapStateToProps(state) {
  const { auth, talentInfo } = state;
  return {
    auth: auth,
    talentInfo: talentInfo
  }
}
function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
