/* global window */
import React from 'react';
import { Col, Nav } from 'reactstrap';

const SidebarNavItems = () => (
  <div>
  {/*
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
  */}
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
