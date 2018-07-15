/* global window */
import React from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import { Col, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const SidebarNavItems = () => (
  <div>
    <Menu>
      <MenuItem 
        className={`nav-link ${window.location.pathname === '/' && 'active'}`} 
        leftIcon={<ActionHome />}
        href="/"
        primaryText="Home" 
      />
      <MenuItem 
        className={`nav-link ${window.location.pathname.startsWith('/recipe') && 'active'}`}
        leftIcon={<ActionNoteAdd />}
        href="/recipes"
        primaryText="Recipes" 
      />
    </Menu>
  </div>
);

const Sidebar = () => (
  <div>
    <Col sm="3" md="2" className="d-none d-sm-block sidebar">
      <Nav vertical>
        {SidebarNavItems()}
      </Nav>
    </Col>
  </div>
);

export { Sidebar, SidebarNavItems };
