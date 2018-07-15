import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import FolderIcon from 'material-ui/svg-icons/file/folder-open';

const Badges = () => (
  <div>
    <Badge
      badgeContent={4}
      primary={true}
    >
      <NotificationsIcon />
    </Badge>
    <Badge
      badgeContent={10}
      secondary={true}
      badgeStyle={{top: 12, right: 12}}
    >
      <IconButton tooltip="Notifications">
        <NotificationsIcon />
      </IconButton>
    </Badge>

    <Badge
      badgeContent={<IconButton tooltip="Backup"><UploadIcon /></IconButton>}
    >
      <FolderIcon />
    </Badge>

    <Badge
      badgeContent="&copy;"
      badgeStyle={{fontSize: 20}}
    >
      Company Name
    </Badge>
  </div>
);

export default Badges;
