import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
// core components
import HeaderLinks from "components/admin/Header/HeaderLinks.jsx";

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";
import {adminStyles} from "styles";

class AdminSidebar extends Component {

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

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

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


  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return true; //this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  render () {
    const {classes, color, logo, image, logoText, routes} = this.props;
    const {open} = this.state
    let links = (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          if (prop.redirect) return null;
          let activePro = " ";
          let listItemClasses;
          if (prop.path === "/upgrade-to-pro") {
            activePro = classes.activePro + " ";
            listItemClasses = classNames({
              [" " + classes[color]]: true
            });
          } else {
            listItemClasses = classNames({
              [" " + classes[color]]: this.activeRoute(prop.path)
            });
          }
          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: this.activeRoute(prop.path)
          });
          return (
            <NavLink
              to={prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon>{prop.icon}</Icon>
                  ) : (
                    <prop.icon/>
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={prop.sidebarName}
                  className={classes.itemText + whiteFontClasses}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    );
    let brand = (
      <div className={classes.logo}>
        <a href="https://www.creative-tim.com" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img}/>
          </div>
          {logoText}
        </a>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Mini variant drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

AdminSidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(adminStyles)(AdminSidebar);
