import React, {Component} from 'react'
import '../client.css'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from 'react-router'
import {requestView} from "actions/clientActions";

const mapDispatchToProps = dispatch => {
  return {
    getOnlineData: bindActionCreators(requestView, dispatch)
  }
};

const mapStateToProps = state => {
  return {
    initState: state.requestViewReducer
  }
};

class RequestSelection extends Component {
  button_style = {
    fontWeight: 'bold',
    fontSize: '1.6rem',
    width: '22rem'
  };

  parentStyle = {
    paddingTop: '0'
  };

  btnStyles = {
    position: 'absolute',
    right: '3rem',
    bottom: '3rem'
  };

  onCreateNewRequest = () => {
    window.location.href = "/client/casting_request/new"
  };

  onRequestView = () => {
    this.props.getOnlineData();
  };

  goWelcomeScreen = () => {
    window.location.href = "/client/home"
  };

  render() {
    if (this.props.initState.isFetching) {
      return (
        <Redirect to={{
          pathname: '/client/casting_request/view',
          state: {fetchData: this.props.initState}
        }}/>
      )
    }

    return (
      <div className="text-center">
        <div className="title mt-5 pb-5" style={this.parentStyle}>My Casting Requests Selection</div>

        <div className="mt-5">
          <button className="btn btn-outline-primary" style={this.button_style}
                  onClick={this.onCreateNewRequest}>
            Create <br/> New Casting Request
          </button>
        </div>
        <div className="mt-3">
          <button className="btn btn-outline-primary" style={this.button_style} onClick={this.onRequestView}>
            View <br/> My Casting Requests
          </button>
        </div>

        <div>
          <button className="btn btn-dark" style={this.btnStyles} onClick={this.goWelcomeScreen}>
            Back to My Home Page
          </button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestSelection)