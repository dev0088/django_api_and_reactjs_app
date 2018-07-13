import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  Row,
  Col,
  Card,
  Form,
  Label,
  Alert,
  Input,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Loading from '../components/Loading';
import { bindActionCreators } from 'redux';
import { translate } from '../i18n';
import {login} from  '../actions/auth'
import {authErrors, isAuthenticated} from '../reducers'
import defaultValues from '../constants/defaultValues'
import './LoginScreen.css'
import apiConfig from '../constants/api';

class LoginScreen extends Component {
  static propTypes = {
    // member: PropTypes.shape({
    //   email: PropTypes.string,
    // }),
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
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

	componentDidUpdate() {
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
		this.props.onSubmit(email, password)
  };

  render() {
    const { loading, error } = this.props;

		if(this.props.isAuthenticated) {
			return <Redirect to='/home' />
		}

    return (
      <div className="login-layout">
        <Row>
          <Col lg={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>Login</CardHeader>
              <CardBody>
                {!!error && <Alert color="danger">{'Login failed'}</Alert>}
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="john@doe.corp"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button color="primary">Login</Button>
                </Form>

                <hr />

                <Row>
                  <Col sm="6">
                    Need an account? <Link to="/sign-up">Sign Up</Link>
                  </Col>
                  <Col sm="6" className="text-right">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </Col>
									<Col sm="12">
										Return home <Link to="/">Home</Link>
									</Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, auth } = state;

  return {
    user,
		error: authErrors(state),
		isAuthenticated: state.auth.isAuthenticated//isAuthenticated(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(loginActions, dispatch),
		onSubmit: (email, password) => dispatch(login(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
