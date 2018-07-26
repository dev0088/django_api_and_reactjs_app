import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Form,
  Alert,
} from 'reactstrap';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './contactUs.css'

const styles={
  floatingLabelStyle: {
    color: "#258df2",
  },
}
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
    // const {
    //   fullName,
    //   email,
    //   title,
    //   content
    // } = this.state
    alert("Submit button was clicked!");
    // this.props.registerActions.registerRequest(
    //   fullName,
    //   email,
    //   title,
    //   content
    // )
  }
  render() {
    const { error, fullName, email, title, content } = this.state;
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
                floatingLabelStyle={styles.floatingLabelStyle}
                value={fullName}
                onChange={this.handleChange}
                floatingLabelText="Full name"
                fullWidth={true}
              />
              <TextField
                type="email"
                name="email"
                id="email"
                floatingLabelStyle={styles.floatingLabelStyle}
                value={email}
                onChange={this.handleChange}
                floatingLabelText="Email"
                fullWidth={true}
              />
              <TextField
                name="title"
                id="title"
                placeholder=""
                floatingLabelStyle={styles.floatingLabelStyle}
                value={title}
                onChange={this.handleChange}
                floatingLabelText="Title"
                fullWidth={true}
              />
              <TextField
                name="content"
                id="content"
                floatingLabelStyle={styles.floatingLabelStyle}
                multiLine={true}
                value={content}
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
