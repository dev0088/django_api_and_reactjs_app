import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Form,
  Alert,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as contactUsActions from '../../actions/contactusActions';
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
      subject: '',
      message: '',
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
      subject,
      message
    } = this.state

    let post_data = {
      full_name: fullName,
      email: email,
      subject: subject,
      message: message
    }

    this.props.contactUsActions.contactUs(post_data)
    alert("Thank you.  Your message has been sent.  You will be contacted by a ShipTalent.com Agent within 24 hours.");
    this.setState({
      fullName: "",
      email: "",
      subject: "",
      message: ""
    })
  }
  render() {
    const { error, fullName, email, subject, message } = this.state;
    return(
      <div className="contact-container">
        <Row className="pt-5">
          <Col sm={{size: 6, offset: 3}}>
            <h3><i className="icon-map" />Contact Us</h3>
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
                name="subject"
                id="subject"
                placeholder=""
                floatingLabelStyle={styles.floatingLabelStyle}
                value={subject}
                onChange={this.handleChange}
                floatingLabelText="Subject"
                fullWidth={true}
              />
              <TextField
                name="message"
                id="message"
                floatingLabelStyle={styles.floatingLabelStyle}
                multiLine={true}
                value={message}
                onChange={this.handleChange}
                rows={5}
                rowsMax={7}
                floatingLabelText="Message"
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
  const { contactUs } = state;
  return {
    contactUs,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    contactUsActions: bindActionCreators(contactUsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
