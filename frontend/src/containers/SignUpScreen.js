import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { translate } from '../i18n';
import { bindActionCreators } from 'redux'
// import * as registerActions from '../actions/registerActions'
// import * as loginFromRegistrationActions from '../actions/loginFromRegistrationActions'
import defaultValues from '../constants/defaultValues'
import './SignUpScreen.css'

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
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
    this.props.onFormSubmit(this.state)
      .then(() => this.props.history.push('/login'))
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <div className='signup-layout'>
        <Row>
          <Col lg={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>Sign Up</CardHeader>
              <CardBody>
                {!!error && <Alert color="danger">{error}</Alert>}
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="John"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Doe"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                  </FormGroup>

                  <FormGroup style={{ marginTop: 40 }}>
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
                  <FormGroup>
                    <Label for="password2">Confirm Password</Label>
                    <Input
                      type="password"
                      name="password2"
                      id="password2"
                      placeholder="••••••••"
                      value={this.state.password2}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button color="primary">Sign Up!</Button>
                </Form>

                <hr />

                <Row>
                  <Col sm="12">
                    Already have an account? <Link to="/login">Login</Link>
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
	const { register } = state

	return {
		register
	}
}

function mapDispatchToProps(dispatch) {
	return {
		// actions: bindActionCreators(registerActions, dispatch),
		// autoLoginActions: bindActionCreators(loginFromRegistrationActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
