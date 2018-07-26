import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Form,
  Alert,
} from 'reactstrap';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import Loading from '../components/loading';
// import { translate } from '../i18n';
import { bindActionCreators } from 'redux'
import * as registerActions from '../actions/registerActions'
// import defaultValues from '../constants/defaultValues'
import './signUpScreen.css'
const styles = {
  flatPrimary: {
    color: "#258df2",
  },
};

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    // loading: PropTypes.bool.isRequired,
    // onFormSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

	constructor(props) {
    super(props);
    this.state = {
			userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
			type: 1,
			error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	componentWillReceiveProps(nextProps) {
		// console.log('=== nextProps: ', nextProps)
		this.setState({
			error: nextProps.register && nextProps.register.failure ? nextProps.register.errorMessage : false
		})
	}

	componentDidUpdate() {
		if (this.props.register && this.props.register.isRegistered) {
			// Go to video interview page for the demo.
			this.props.history.push('/login')
		}
	}

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const typeArray = {1: "talent", 2: "client"}
		const {
			userName,
		  email,
		  password,
		  passwordConfirm,
		  firstName,
		  lastName,
		  type
		} = this.state
    console.log(typeArray[type]);
		this.props.registerActions.registerRequest(
			userName,
			email,
			password,
			passwordConfirm,
			firstName,
			lastName,
			typeArray[type]
		)
  }
  handleSelectChange = (event, index, value) => this.setState({ type: value });
  render() {
    const { loading, error } = this.state;
    const selectItemStyle = {
      'whiteSpace': 'preWrap'
    }
    // Loading
    if (loading) return <Loading />;

    return (
      <div className="login-wrapper">
        <div className="login-fields">
          <h3>Sign Up</h3>
          {!!error && <Alert color="danger">{error}</Alert>}
          <Form>
            <SelectField
              id="type"
              name="type"
              floatingLabelText="Type"
              value={this.state.type}
              onChange={this.handleSelectChange}
              menuItemStyle={selectItemStyle}
            >
              <MenuItem value={1} primaryText="Talent" />
              <MenuItem value={2} primaryText="Client" />
            </SelectField>
            <TextField
              name="userName"
              id="userName"
              placeholder=""
              value={this.state.userName}
              onChange={this.handleChange}
              floatingLabelText="User name"
              fullWidth={true}
            />
            <TextField
              name="firstName"
              id="firstName"
              placeholder=""
              value={this.state.firstName}
              onChange={this.handleChange}
              floatingLabelText="First Name"
              fullWidth={true}
            />
            <TextField
              name="lastName"
              id="lastName"
              placeholder=""
              value={this.state.lastName}
              onChange={this.handleChange}
              floatingLabelText="Last Name"
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
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              floatingLabelText="Password"
              fullWidth={true}
            />
            <TextField
              type="password"
              name="password2"
              id="password2"
              value={this.state.password2}
              onChange={this.handleChange}
              floatingLabelText="Confirm Password"
              fullWidth={true}
            />
            <div className="pt20">
              <RaisedButton label="Sing Up" primary={true} fullWidth={true} onClick={this.handleSubmit}/>
            </div>
          </Form>

          <hr />
          <Row>
            <Col sm="12">
              Already have an account?
              <Link to="/login">
                <FlatButton
                  label="Login"
                  style={styles.flatPrimary}
                />
              </Link>
            </Col>
            <Col sm="12">
              Return home
              <Link to="/">
                <FlatButton
                  label="Home"
                  style={styles.flatPrimary}
                />
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
	const { register } = state

	return {
		register
	}
}

function mapDispatchToProps(dispatch) {
	return {
		registerActions: bindActionCreators(registerActions, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
