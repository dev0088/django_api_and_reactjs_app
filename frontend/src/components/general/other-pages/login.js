import React from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

const Login =() => (
  <div>
    <div className="login-wrapper">
      <div className="login-fields">
        <h3>Login <a href="">Forgot Password?</a></h3>
        <TextField
          id="name"
          floatingLabelText="Usernae or Email"
          fullWidth={true}
        />
        <TextField
          id="pass"
          floatingLabelText="Password"
          fullWidth={true}

        />
        <div className="pt20">
          <Checkbox
            label="Remember Me"
          />
        </div>
        <div className="pt20">
          <RaisedButton label="Log In" primary={true} fullWidth={true}/>
        </div>

      </div>
    </div>
  </div>
);

export default Login;
