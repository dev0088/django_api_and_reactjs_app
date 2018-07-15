import React from 'react';
import MobileTearSheet from './mobileTearSheet.js';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import avatar from '../../images/uxceo-128.jpg';

const ListChat = () => (
  <MobileTearSheet>
    <List>
      <Subheader>Recent chats</Subheader>
      <ListItem
        primaryText="Brendan Lim"
        leftAvatar={<Avatar src={avatar} />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Eric Hoffman"
        leftAvatar={<Avatar src={avatar} />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Grace Ng"
        leftAvatar={<Avatar src={avatar} />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Kerem Suer"
        leftAvatar={<Avatar src={avatar} />}
        rightIcon={<CommunicationChatBubble />}
      />
      <ListItem
        primaryText="Raquel Parrado"
        leftAvatar={<Avatar src={avatar} />}
        rightIcon={<CommunicationChatBubble />}
      />
    </List>
    <Divider />
    <List>
      <Subheader>Previous chats</Subheader>
      <ListItem
        primaryText="Chelsea Otakan"
        leftAvatar={<Avatar src={avatar} />}
      />
      <ListItem
        primaryText="James Anderson"
        leftAvatar={<Avatar src={avatar} />}
      />
    </List>
  </MobileTearSheet>
);

export default ListChat;
