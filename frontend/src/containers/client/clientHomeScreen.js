import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import * as clientActions from 'actions/clientActions';
import { styles } from 'styles';
import './client.css';

class ClientHomeScreen extends Component {
  componentWillMount() {
    this.props.clientActions.getCurrentClientInfo()
  }
  
  goFindTalent = () => {
    this.props.history.push('/client/talent_search')
  };

  goRequestSelection = () => {
    this.props.history.push('/client/request_selection')
  };

  goMySavedTalent = () => {
    this.props.history.push('/client/mytalent/saved')
  };

  goMySharedProfile = () => {
    this.props.history.push('/client/myshared_profile')
  };

  goBlockedProfile = () => {
    this.props.history.push('/client/blocked_profile')
  };

  goMyRate = () => {
    this.props.history.push('/client/my_rate')
  };

  render() {
    const { clientInfo } = this.props
    let userName = ''
    if (clientInfo) {
      userName = clientInfo.user.first_name
    }

    return (
      <div>
        <div className="clearfix mt-3">

        </div>
        <div className="text-center home-title">Wecome, {userName}!</div>
        <div className="text-center home-subtitle mt-3 mb-4">My Home Page</div>
        <div className="d-flex justify-content-center mb-2">
          <div className="menu-box" onClick={this.goFindTalent}>
            <div className="menu-title noselect">Find Talent</div>
            <div className="menu-subtitle noselect">Search for new talent</div>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-2">
          <div className="menu-box mr-4" onClick={this.goRequestSelection}>
            <div className="menu-title noselect">My Casting Requests</div>
            <div className="menu-subtitle noselect">Create and view casting requests</div>
          </div>
          <div className="menu-box" onClick={this.goMySavedTalent}>
            <div className="menu-title noselect">My Saved Talent</div>
            <div className="menu-subtitle noselect">View callbacks and favorites</div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-self-center mb-2">
          <div className="menu-box mr-4" onClick={this.goMySharedProfile}>
            <div className="menu-title noselect">My Shared Profiles</div>
            <div className="menu-subtitle noselect">
              View talent that was shared with your team
            </div>
          </div>
          <div className="menu-box" onClick={this.goBlockedProfile}>
            <div className="menu-title noselect">My Blocked Profiles</div>
            <div className="menu-subtitle noselect">
              View and change talent that you have blocked eight temporarily or permanently
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-2">
          <div className="menu-box" onClick={this.goMyRate}>
            <div className="menu-title noselect">My Ratings</div>
            <div className="menu-subtitle noselect">
              Provide end of contract ratings and comments of hired talent
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-5">
          <div className="menu-box">
            <div className="menu-title noselect">Client Community</div>
            <div className="menu-subtitle noselect">
              Provide feedback to customize your experience
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { clientInfo } = state
  return {
    clientInfo: clientInfo && clientInfo.value ? clientInfo.value : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clientActions: bindActionCreators(clientActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClientHomeScreen));