import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPlayer from 'react-player'
import Truncate from 'react-truncate-html';
import {
  Row,
  Col,
  Form,
  Alert,
} from 'reactstrap';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as shiptalentInfoActions from  '../actions/shiptalentInfoActions'
import './contactUs.css'

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      title: '',
      content: '',
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const {
      fullName,
      email,
      title,
      content
    } = this.state
    alert("Submit button was clicked!");
    // this.props.registerActions.registerRequest(
    //   fullName,
    //   email,
    //   title,
    //   content
    // )
  }
  render() {
    const { error } = this.state;
    return(
      <div className="contact-container">
        <Row className="pt-5">
          <Col sm={{size: 6, offset: 3}}>
            <h3><i className="icon-map" />Contact US</h3>
            <hr />
            {!!error && <Alert color="danger">{error}</Alert>}
            <Form>
              <TextField
                name="fullName"
                id="fullName"
                placeholder=""
                value={this.state.fullName}
                onChange={this.handleChange}
                floatingLabelText="Full name"
                fullWidth={true}
              />
              <TextField
                type="email"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                floatingLabelText="Email"
                fullWidth={true}
              />
              <TextField
                name="title"
                id="title"
                placeholder=""
                value={this.state.title}
                onChange={this.handleChange}
                floatingLabelText="Title"
                fullWidth={true}
              />
              <TextField
                name="content"
                id="content"
                multiLine={true}
                value={this.state.content}
                onChange={this.handleChange}
                rows={5}
                rowsMax={7}
                floatingLabelText="Content"
                fullWidth={true}
              />

              <div className="pt20">
                <RaisedButton label="Submit" primary={true} fullWidth={true} onClick={this.handleSubmit}/>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
