import React from 'react';
import MobileTearSheet from './mobileTearSheet.js';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import avatar from '../../images/uxceo-128.jpg';

const ListContacts = () => (
  <MobileTearSheet>
    <List>
      <ListItem
        primaryText="Chelsea Otakan"
        leftIcon={<ActionGrade color={pinkA200} />}
        rightAvatar={<Avatar src={avatar} />}
      />
      <ListItem
        primaryText="Eric Hoffman"
        insetChildren={true}
        rightAvatar={<Avatar src={avatar} />}
      />
      <ListItem
        primaryText="James Anderson"
        insetChildren={true}
        rightAvatar={<Avatar src={avatar} />}
      />
      <ListItem
        primaryText="Kerem Suer"
        insetChildren={true}
        rightAvatar={<Avatar src={avatar} />}
      />
    </List>
    <Divider inset={true} />
    <List>
      <ListItem
        primaryText="Adelle Charles"
        leftAvatar={
          <Avatar
            color={pinkA200} backgroundColor={transparent}
            style={{left: 8}}
          >
            A
          </Avatar>
        }
        rightAvatar={<Avatar src={avatar} />}
      />
      <ListItem
        primaryText="Adham Dannaway"
        insetChildren={true}
        rightAvatar={<Avatar src={avatar} />}
      />
      <ListItem
        primaryText="Allison Grayce"
        insetChildren={true}
        rightAvatar={<Avatar src={avatar} />}
      />
      <ListItem
        primaryText="Angel Ceballos"
        insetChildren={true}
        rightAvatar={<Avatar src={avatar} />}
      />
    </List>
  </MobileTearSheet>
);

export default ListContacts;
