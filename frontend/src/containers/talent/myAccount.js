import React, {Component} from 'react';
import { connect } from 'react-redux';
import './myProfile.css'

class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return(
      <div className="profile-container">
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
