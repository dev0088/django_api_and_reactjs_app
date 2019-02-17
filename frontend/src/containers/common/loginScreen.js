import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  Row,
  Col,
  Form,
  Alert,
} from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { login } from 'actions/auth';
import { authErrors, isAuthenticated } from 'reducers/index';
import { withStyles } from '@material-ui/core/styles';
import apiConfig from 'constants/api';
import './loginScreen.css'

const styles = {
  flatPrimary: {
    color: "#258df2",
  },
};

// @keydown
class LoginScreen extends React.Component {
  static propTypes = {
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
      const { type } = this.props.user
      if (type === 'talent') {
        this.props.history.push('/home')
      } else if (type === 'client') {
        this.props.history.push('/client/home')
      } else if (type === 'agency') {
        this.props.history.push('/admin/dashboard')
      }
    }
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const { email, password } = this.state;
      this.props.onSubmit(email, password);
    }
  }

  handleChange = name => event => {
    this.setState({
      // ...this.state,
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
    const { error, classes } = this.props;

    if(this.props.isAuthenticated) {
      const { type } = this.props.user
      if (type === 'talent') {
        return <Redirect to='/home' />
      } else if (type === 'client') {
        return <Redirect to='/client/home' />
      } else if (type === 'agency') {
        return <Redirect to='/admin/dashboard' />
      }
    }
    return (
      <div className="login-layout" onKeyPress={this.handleKeyPress} >
        <div className="login-wrapper">
          <div className="login-fields" id="loginForm">
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <h3>Login</h3>
              </Grid>
              <Grid item xs={12}>
                {!!error && <Alert color="danger">{'Login failed'}</Alert>}
                <Form>
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <TextField
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        fullWidth
                        autoFocus
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        fullWidth
                        autoFocus
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel 
                        control={<Checkbox id="remember" color="primary"/>}
                        label={<Typography className={classes.adminGeneralText}>Remember Me</Typography>} 
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        focusVisible={true}
                        onClick={this.handleSubmit}
                      >
                        Log In
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Grid>
              <Grid item xs={12}><Divider /></Grid>
              <Grid item xs={12}>
                <Grid container spacing={8}>
                  <Grid item sm={7} xs={12}>
                    Need an account ?
                    <Link to="/sign-up">
                      <Button color="primary">Sign Up</Button>
                    </Link>
                  </Grid>
                  <Grid item sm={5} xs={12} className={classes.rightText}>
                    <Link to="/forgot-password">
                      <Button color="primary">Forgot Password?</Button>
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    Return home
                    <Link to="/">
                      <Button color="primary">Home</Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;

  return {
    user: auth && auth.access ? auth.access : null,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginScreen));
