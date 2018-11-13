import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const ForgotPassword = () => (
  <div className="login-wrapper">
    <div className="login-fields">
      <h3>Enter your mail id</h3>
      <TextField
        id="name"
        floatingLabelText="Email"
        fullWidth={true}
        type="email"
      />
      <div className="pt20">
        <RaisedButton label="Confirm" primary={true} fullWidth={true}/>
      </div>
    </div>
  </div>
);

export default ForgotPassword;
