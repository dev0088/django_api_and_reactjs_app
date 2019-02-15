import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ImageLoader from 'react-loading-image';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clientActions from  'actions/clientActions';
import { restoreAuth } from 'actions/auth';
import './header.css'
import { styles } from 'styles'


class ClientHeader extends Component {
  static defaultProps = {
    member: {},
    auth: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      anchorEl: null,
      mobileMoreAnchorEl: null,
      open: false,
      search: ''
    };
  }

  componentDidMount() {
    if (!this.props.clientInfo) {
      let __this = this;
      setTimeout(function(){
        __this.props.clientActions.getCurrentClientInfo();
      }, 100);  
    }
  }

  hanldeClickLogout = () => {
    this.props.logout(this.props.auth.access.token);
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
        <Typography
          className={[classes.menuItemText, classes.topbarMenuItemTitle, classes.topbarDynamicShow]}
        >
          {title}
        </Typography>
      </Link>
    )
  }

  renderDrawerListItem(title, link) {
    return (
      <Link to={link} onClick={this.handleDrawerClose}>
        <ListItem button>
          <ListItemText primary={title} />
        </ListItem>
      </Link>
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  
  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  };
  
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSearch();
    }
  };

  handleSearch = () => {
    let data = {
      talent_name_or_tid: this.state.search
    };
    this.props.clientActions.talentSearch(data);
    this.props.history.push('/client/talent_search_result');
  };

  render() {
    const { auth, clientInfo, classes } = this.props;
    const { anchorEl, mobileMoreAnchorEl, open } = this.state;
    const openAnchor = Boolean(anchorEl);
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
                aria-owns={openAnchor ? 'menu-appbar' : null}
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
            <Hidden only={['lg']}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={[classes.drawerMenuButton, open && classes.hide]}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden only={['md', 'sm', 'xs']}>
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
            </Hidden>

            <div className={classes.grow}/>

            {loggedIn && (
              <div className={classes.search}>
                <div className={classes.searchIconContainer}>
                  <SearchIcon className={classes.searchIcon} onClick={this.handleSearch} />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={this.handleSearchChange}
                  onKeyDown={this.handleKeyDown}
                />
              </div>
            )}

            {loggedIn ? (
              <div>
                <IconButton
                  aria-owns={openAnchor ? 'menu-appbar' : null}
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
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <img className={classes.drawerBandImage}
                 alt="Logo"
                 src={require('images/logo.png')} />
            <IconButton onClick={this.handleDrawerClose}>
              {<ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {this.renderDrawerListItem('Home', '/client/home')}
            {this.renderDrawerListItem('Find Talent', '/client/talent_search')}
            {this.renderDrawerListItem('Casting Requests', '/client/request_selection')}
            {this.renderDrawerListItem('Saved Talent', '/client/mytalent/saved')}
            {this.renderDrawerListItem('Shared Profiles', '/client/myshared_profile')}
            {this.renderDrawerListItem('Blocked Profiles', '/client/blocked_profile')}
            {this.renderDrawerListItem('Ratings', '/client/my_rate')}
          </List>
        </Drawer>
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
    restoreAuthAction: () => dispatch(restoreAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(compose(withStyles(styles, { withTheme: true }),
  withWidth(),)(withRouter(ClientHeader)));