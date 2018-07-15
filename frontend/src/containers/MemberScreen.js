import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth'

class MemberScreen extends Component {
  // static propTypes = {
  //   Layout: PropTypes.func.isRequired,
  //   memberLogout: PropTypes.func.isRequired,
  //   getMemberData: PropTypes.func.isRequired,
  //   member: PropTypes.shape({
  //     loading: PropTypes.bool.isRequired,
  //     error: PropTypes.string,
  //   }).isRequired,
	// 	auth: {}
  // }

  // componentDidMount = () => this.props.getMemberData();

  render = () => {
    const { Layout, member, auth, memberLogout } = this.props;

    return <Layout member={member} auth={auth} logout={memberLogout} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(MemberScreen);
