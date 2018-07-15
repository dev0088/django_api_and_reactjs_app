import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import avatarImage from '../images/user12.jpg';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class AvatarDropdown extends Component {
  state = {
    valueSingle: '3',
    valueMultiple: ['3', '5'],
  };

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    });
  }




  render() {
    const style= {
      zIndex: '1500'
    }

    return (
      <div>
        <IconMenu
          style={style}
          anchorOrigin={{horizontal:'left', vertical:'bottom'}}
          iconButtonElement={<IconButton>
            <Avatar
              src={avatarImage}
              size={35}
            />
          </IconButton>}
          open={this.state.openMenu}
          onRequestChange={this.handleOnRequestChange}
        >
          <MenuItem primaryText="View Profile" leftIcon={<i className="material-icons">account_circle</i>} />
          <MenuItem primaryText="Inbox" leftIcon={<i className="material-icons">mail_outline</i>} />
          <MenuItem primaryText="Calendar" leftIcon={<i className="material-icons">date_range</i>} />
          <Divider />
          <MenuItem primaryText="Settings" leftIcon={<i className="material-icons">settings</i>} />
          <MenuItem primaryText="Sign Out" leftIcon={<i className="material-icons">power_settings_new</i>} />
        </IconMenu>
      </div>

    );
  }
}
