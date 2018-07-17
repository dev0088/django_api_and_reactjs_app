import React, {Component} from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPlayer from 'react-player'
import RaisedButton from 'material-ui/RaisedButton';
import './myProfile.css'

const styles = {

}
class MyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName:    "First",
      lastName:     "Last",
      headLine:     "POP/Rock Tenor with Strong Dancing and Acting Skills",
      photoURL:     "images/user1.jpg",
      bio:          "2016-2018: Lead Vocalist with crystal Cruises - Crystal symphony \n",
      error:        false,
    }
  }

  render() {
    console.log(this.props);
    return(
      <div>
        
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
