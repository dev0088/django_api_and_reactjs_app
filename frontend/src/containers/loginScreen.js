import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  Row,
  Col,
  Form,
  Alert,
} from 'reactstrap';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
// import Loading from '../components/loading';
// import { bindActionCreators } from 'redux';
// import { translate } from '../i18n';
import { login } from  '../actions/auth';
import { authErrors, isAuthenticated } from '../reducers';
// import defaultValues from '../constants/defaultValues'
import './loginScreen.css'
// import apiConfig from '../const styles = {
const styles = {
  flatPrimary: {
    color: "#258df2",
  },
};

class LoginScreen extends Component {
  static propTypes = {
    // member: PropTypes.shape({
    //   email: PropTypes.string,
    // }),
    // loading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      // Go to video interview page for the demo.
      this.props.history.push('/home')
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
    const { email, password } = this.state;
    // this.setState({ loginRequest: true });
    this.props.onSubmit(email, password);

  };

  render() {
    const { error } = this.props;

    if(this.props.isAuthenticated) {
      return <Redirect to='/home' />
    }
    return (
      <div className="login-layout">
        <div className="login-wrapper">
          <div className="login-fields" id="loginForm">
            <h3>Login</h3>
            {!!error && <Alert color="danger">{'Login failed'}</Alert>}
            <Form>
              <TextField
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                floatingLabelText="Email"
                fullWidth={true}
              />
              <TextField
                name="password"
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                floatingLabelText="Password"
                fullWidth={true}
              />
              <div className="pt20">
                <Checkbox
                  id="remember"
                  label="Remember Me"
                />
              </div>
              <div className="pt20">
                <RaisedButton label="Log In" primary={true} fullWidth={true} onClick={this.handleSubmit}/>
              </div>
            </Form>
            <hr />
            <Row>
              <Col sm="7">
                Need an account ? 
                <Link to="/sign-up">
                  <FlatButton
                    label="Sign Up"
                    style={styles.flatPrimary}
                  />
                </Link>
              </Col>
              <Col sm="5" className="text-right">
                <Link to="/forgot-password">
                  <FlatButton
                    label="Forgot Password?"
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    user,
    error: authErrors(state),
    isAuthenticated: isAuthenticated(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(loginActions, dispatch),
    onSubmit: (email, password) => dispatch(login(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
