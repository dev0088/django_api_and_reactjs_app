import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Page404Compoent = () => (
  <div className="login-wrapper">
    <div className="login-fields text-center">
      <h3 className="title-404">404</h3>
      <div className="pt20">
        <p>The page your are looking for is not available.</p>
      </div>
      <div className="pt20">
        <RaisedButton label="Go Back to home" primary={true} fullWidth={true}/>
      </div>

    </div>
  </div>
);

export default Page404Compoent;
