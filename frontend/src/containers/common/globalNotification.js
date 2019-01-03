import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notification from 'components/shiptalent/notifications/notification';
import * as globalNotificationActions from 'actions/globalNotificationActions';


class GlobalNotification extends Component {

  onClose = () => {
    this.props.globalNotificationActions.notify(false, 'info', 'closing this notification.');
  };

  render() {
    const { open, type, message } = this.props;
    return(
      <Notification open={open} type={type} message={message} onClose={this.onClose} />
    );
  }
}

function mapStateToProps(state) {
  const { globalNotification } = state;
  return {
    open: globalNotification.open,
    type: globalNotification.type,
    message: globalNotification.message
  }
}

function mapDispatchToProps(dispatch) {
  return {
    globalNotificationActions: bindActionCreators(globalNotificationActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalNotification);
