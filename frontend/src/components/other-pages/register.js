import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const Register = () => (
  <div>
    <div className="login-wrapper">
      <div className="login-fields">
        <h3>Register</h3>
        <TextField
          id="firs-name"
          floatingLabelText="First name"
          fullWidth={true}
        />
        <TextField
          id="last-name"
          floatingLabelText="Lat name"
          fullWidth={true}
        />
        <TextField
          id="email"
          floatingLabelText="Email"
          fullWidth={true}
          type="email"
        />
        <TextField
          id="pass"
          floatingLabelText="Password"
          fullWidth={true}
        />

        <div className="pt20">
          <RaisedButton label="Sing Up" primary={true} fullWidth={true}/>
        </div>
      </div>
    </div>
  </div>
);

export default Register;
