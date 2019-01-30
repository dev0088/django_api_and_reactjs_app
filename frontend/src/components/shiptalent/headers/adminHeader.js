import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
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
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import Icon from "@material-ui/core/Icon";
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames'
import ImageLoader from 'react-loading-image';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as clientActions from 'actions/clientActions';
import dashboardRoutes from 'routes/admin/dashboard';
import { adminStyles } from 'styles'
import './header.css'


class AdminHeader extends Component {
  static defaultProps = {
    member: {},
    auth: {}
  };

  state = {
    open: true,
    anchorEl: null,
    mobileMoreAnchorEl: null,
    search: ''
  };

  componentDidMount() {
    let __this = this;
    setTimeout(function(){
      __this.props.clientActions.getCurrentClientInfo();
    }, 100);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

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
    const { adminInfo } = this.props

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

  renderDrawerListItem(title, link, IconComponent, key) {
    const { classes } = this.props;

    return (
      <Link to={link} onClick={this.handleDrawerClose} key={key}>
        <ListItem button key={title} color="light">
          <ListItemIcon>
            {typeof IconComponent === "string" ? (
              <Icon>{IconComponent}</Icon>
            ) : (
              <IconComponent className={classes.drawerListIcon}/>
            )}
          </ListItemIcon>
          <ListItemText >
            <Typography className={classes.drawerListText}>
              {title}
            </Typography>
          </ListItemText>
        </ListItem>
      </Link>
    );
  }

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
    const { auth, adminInfo, classes, children } = this.props;
    const { anchorEl, mobileMoreAnchorEl, open } = this.state;
    const openAnchor = Boolean(anchorEl);
    const loggedIn = (auth && auth.access && auth.access.email);
    let username = "";
    let userAvatar = null;

    if (loggedIn) {
      if (adminInfo){
        username = adminInfo.user.first_name;
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


    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.grow}/>
            <Hidden only={['md', 'sm', 'xs']}>
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
            </Hidden>

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
                    )}
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
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={open}
        >
          <div className={classes.toolbar}>

            <Typography className={[classes.drawerBandText]}>
              ShipTalent Admin
            </Typography>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon className={classes.drawerListIcon} />
            </IconButton>
          </div>
          <Divider />
          <List>
            {dashboardRoutes.map((itemRoute, key) => {
              return this.renderDrawerListItem(itemRoute.sidebarName, itemRoute.path, itemRoute.icon, key);
            })}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth, adminInfo } = state;
  return {
    auth: auth,
    adminInfo: adminInfo && adminInfo.value,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    clientActions: bindActionCreators(clientActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(compose(withStyles(adminStyles, { withTheme: true }),
  withWidth(),)(withRouter(AdminHeader)));