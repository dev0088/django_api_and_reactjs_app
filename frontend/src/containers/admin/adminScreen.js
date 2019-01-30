import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'

class AdminScreen extends Component {

  render = () => {
    const { Layout, member, auth, memberLogout, children } = this.props;

    return <Layout member={member} auth={auth} logout={memberLogout} children={children} />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  auth: state.auth || {}
});

const mapDispatchToProps = {
  memberLogout: logout,
  // getMemberData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);
