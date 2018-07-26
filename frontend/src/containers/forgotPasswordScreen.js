import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Alert,
} from 'reactstrap';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import Loading from '../components/loading';
import './forgotPasswordScreen.css'

const styles = {
  flatPrimary: {
    color: "#258df2",
  },
};
class ForgotPasswordScreen extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    // loading: PropTypes.bool.isRequired,
    // onFormSubmit: PropTypes.func.isRequired,
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
      <div className="login-wrapper">
        <div className="login-fields">
          <h5>Forgot Password</h5>
          {!!error && <Alert color="danger">{error}</Alert>}
          <Form>
            <TextField
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              floatingLabelText="Email"
              fullWidth={true}
            />
            <div className="pt20">
              <RaisedButton label="Reset Password" primary={true} fullWidth={true} onClick={this.handleSubmit}/>
            </div>
          </Form>
          <hr/>
          <Row>
            <Col sm="6">
              Need an account? 
              <Link to="/sign-up">
                <FlatButton
                  label="Sign Up"
                  style={styles.flatPrimary}
                />
              </Link>
            </Col>
            <Col sm="6" className="text-right">
              <Link to="/login">
                <FlatButton
                  label="Login"
                  style={styles.flatPrimary}
                />
              </Link>
              to your account.
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordScreen;
