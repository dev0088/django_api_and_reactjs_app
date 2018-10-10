import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  Nav,
  Navbar,
  Collapse,
  NavbarToggler,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import {PopoverAnimationVertical} from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as talentActions from  '../actions/talentActions';
import { SidebarNavItems } from './sidebar';
import './header.css'
import { styles } from '../styles'


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
      anchorEl: null,
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

  hanldeClickLogout = () => {
    this.props.logout(this.props.auth.access.token);
    this.handleClose()
    // if (this.props.history)
    //   this.props.history.push('/');
    // else
    //   document.location.href="/";
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


  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { auth, talentInfo, classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
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
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/home" className="navbar-brand" style={{ color: '#FFF' }}>
              <img className="brand-image"
                   alt="Logo"
                   src={require('../images/logo.png')} />
            </Link>

            { loggedIn && (
                <Typography variant="title" color="inherit" className={classes.grow}>
                  <Link to="/interview-start">
                      {"Video Interview"}
                  </Link>
                </Typography>
            )}

            {loggedIn ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  color="inherit">
                  <AccountCircle />
                </IconButton>

                <Menu id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={this.handleClose}>
                  <Link to="/profile">
                    <MenuItem onClick={this.handleClose}>
                      {"View My Profile"}
                    </MenuItem>
                  </Link>
                  <Link to="/edit-profile">
                    <MenuItem onClick={this.handleClose}>
                      {"Build/Edit My Profile"}
                    </MenuItem>
                  </Link>

                  <Link to="/profile-wizard/welcome">
                    <MenuItem onClick={this.handleClose}>
                      {"Profile Wizard"}
                    </MenuItem>
                  </Link>
                  <Link to="/account">
                    <MenuItem onClick={this.handleClose}>
                      {"Account Settings"}
                    </MenuItem>
                  </Link>
                  <Divider />
                  <Link to="/login">
                    <MenuItem onClick={this.hanldeClickLogout}>
                      {"Logout"}
                    </MenuItem>
                  </Link>
                </Menu>
              </div>
            ) : (
              <div>
                <Button color="inherit"
                        onClick={this.handleClick}>
                  {'Login'}
                </Button>
                <Menu id="menu-appbar1"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={this.handleClose}>
                  <Link to="/login">
                    <MenuItem onClick={this.handleClose}>{"Login"}</MenuItem>
                  </Link>
                  <Link to="/sign-up">
                    <MenuItem onClick={this.handleClose}>{"Sign Up"}</MenuItem>
                  </Link>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
    // return (
    //   <header>
    //     <Navbar dark color="primary" expand="sm" className="fixed-top">
    //       <Link to="/home" className="navbar-brand" style={{ color: '#FFF' }}>
    //         <img className="brand-image"
    //           alt="Logo"
    //           src={require('../images/logo.png')} />
    //
    //       </Link>
    //       { loggedIn && (
    //           <Link to="/interview-start">
    //             <MenuItem style={styles.menuitem}>
    //               {"Video Interview"}
    //             </MenuItem>
    //           </Link>
    //         )
    //       }
    //       <NavbarToggler onClick={this.toggleDropDown} />
    //       <Collapse isOpen={this.state.isOpen} navbar>
    //         <Nav className="ml-auto" navbar>
    //           <div className="d-block d-sm-none">
    //             {SidebarNavItems()}
    //           </div>
              {/*<RaisedButton*/}
                {/*className="my-account"*/}
                {/*onClick={this.handleClick}*/}
                {/*label={loggedIn ? `Hi, ${username}` : 'My Account'}*/}
              {/*/>*/}
    //           <Popover
    //             open={open}
    //             anchorEl={anchorEl}
    //             onClose={this.handleClose}
    //             anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    //             targetOrigin={{horizontal: 'left', vertical: 'top'}}
    //             animation={PopoverAnimationVertical}
    //           >
    //             {!loggedIn &&
    //               <Menu id="logout-menu"
    //                     anchorEl={anchorEl}
    //                     open={open}
    //                     onClose={this.handleClose}>
    //                 <Link to="/login" onClick={this.handleClose}>
    //                   <MenuItem primaryText="Login" />
    //                 </Link>
    //                 <Link to="/sign-up" onClick={this.handleClose}>
    //                   <MenuItem primaryText="Sign Up" />
    //                 </Link>
    //               </Menu>
    //             }
    //             {loggedIn &&
    //               <Menu id="login-menu"
    //                     anchorEl={anchorEl}
    //                     open={open}
    //                     onClose={this.handleClose}>
    //                 <Link to="/profile">
    //                   <MenuItem onClick={this.handleClose}>
    //                     {"View My Profile"}
    //                   </MenuItem>
    //                 </Link>
    //                 <Link to="/edit-profile">
    //                   <MenuItem onClick={this.handleClose}>
    //                     {"Build/Edit My Profile"}
    //                   </MenuItem>
    //                 </Link>
    //                 <Link to="/account">
    //                   <MenuItem onClick={this.handleClose}>
    //                     {"Account Settings"}
    //                   </MenuItem>
    //                 </Link>
    //                 <Divider />
    //                 <Link to="/login">
    //                   <MenuItem onClick={this.hanldeClickLogout}>
    //                     {"Logout"}
    //                   </MenuItem>
    //                 </Link>
    //               </Menu>
    //             }
    //           </Popover>
    //         </Nav>
    //       </Collapse>
    //     </Navbar>
    //   </header>
    // );
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
