import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import Divider from 'material-ui/Divider';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ImageLoader from 'react-loading-image';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clientActions from  'actions/clientActions';
import './header.css'
import { styles } from 'styles'


class ClientHeader extends Component {
  static defaultProps = {
    member: {},
    auth: {}
  }
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };
  }

  componentDidMount() {
    let __this = this;
    setTimeout(function(){
      __this.props.clientActions.getCurrentClientInfo();
    }, 100);
  }

  hanldeClickLogout = () => {
    this.props.logout(this.props.auth.access.token);
    // this.handleMenuClose()
    this.props.history.push('/login')
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClickLogin = () => {
    this.props.history.push('/login')
  };

  handleClickSignUp = () => {
    this.props.history.push('/sign-up')
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
    });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  getUserAvatarFromProps() {
    const { clientInfo } = this.props

    return null
  }

  renderTopbarMenuItem(title, link) {
    const { classes } = this.props;
    return (
      <Link to={link} style={{display: 'inline-block'}}>
        <Typography className={[classes.menuItemText, classes.topbarMenuItemTitle, classes.topbarDynamicShow]}>
          {title}
        </Typography>
      </Link>
    )
  }

  render() {
    const { auth, clientInfo, classes } = this.props;
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const open = Boolean(anchorEl);
    const loggedIn = (auth && auth.access && auth.access.email);
    let username = "";
    let userAvatar = null;

    if (loggedIn) {
      if (clientInfo){
        username = clientInfo.user.first_name;
        if (username !== "")
          username = username.charAt(0).toUpperCase() + username.slice(1);
        userAvatar = this.getUserAvatarFromProps()
      }
    }

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = loggedIn ? (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.hanldeClickLogout}>{"Logout"}</MenuItem>
      </Menu>
    ) : (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClickLogin}>{"Login"}</MenuItem>
        <MenuItem onClick={this.handleClickSignUp}>{"Sign Up"}</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >

          {loggedIn ? (
            <MenuItem onClick={this.handleClickLogin}>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                color="inherit">
                { userAvatar  ? (
                  <ImageLoader
                    className={classes.avatarImage}
                    src={userAvatar}
                    loading={() => <AccountCircle />}
                    error={() => <AccountCircle />} />
                ) : (
                  <AccountCircle />
                )}
                <p> {username} </p>
              </IconButton>
            </MenuItem>
          ) : (
            <MenuItem onClick={this.handleClickLogin}>
              <Button color="inherit" onClick={this.handleClick}>
                {'Login'}
              </Button>
            </MenuItem>
          )}
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/client/home" className="navbar-brand" style={{ color: '#FFF' }}>
              <img className="brand-image"
                   alt="Logo"
                   src={require('images/logo.png')} />
            </Link>

            <div className={[classes.grow, classes.topbarDynamicShow]}>
              {this.renderTopbarMenuItem('Home', '/client/home')}
              {this.renderTopbarMenuItem('Find Talent', '/client/talent_search')}
              {this.renderTopbarMenuItem('Casting Requests', '/client/request_selection')}
              {this.renderTopbarMenuItem('Saved Talent', '/client/mytalent/saved')}
              {this.renderTopbarMenuItem('Shared Profiles', '/client/myshared_profile')}
              {this.renderTopbarMenuItem('Blocked Profiles', '/client/blocked_profile')}
              {this.renderTopbarMenuItem('Ratings', '/client/my_rate')}
            </div>

            <div className={classes.grow}/>

            {loggedIn && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                />
              </div>
            )}

            {loggedIn ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  color="inherit">
                  { userAvatar  ? (
                    <ImageLoader
                      className={classes.avatarImage}
                      src={userAvatar}
                      loading={() => <AccountCircle />}
                      error={() => <AccountCircle />} />
                  ) : (
                    <AccountCircle />
                  )
                  }
                  <Typography className={classes.avatarMenuItemText}> {username} </Typography>
                  <ExpandMore />
                </IconButton>
              </div>
            ) : (
              <div>
                <Button color="inherit" onClick={this.handleClick}>
                  {'Login'}
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth, clientInfo } = state;
  return {
    auth: auth,
    clientInfo: clientInfo.value
  }
}
function mapDispatchToProps(dispatch) {
  return {
    clientActions: bindActionCreators(clientActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(ClientHeader)));
