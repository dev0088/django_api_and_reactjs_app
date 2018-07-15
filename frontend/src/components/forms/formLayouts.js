import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export const FormLayoutInline = () => (
  <div>
    <form className="readmin-form inline">
      <div className="row">
        <div className="col-sm-5">
          <TextField
            hintText="Username"
            fullWidth={true}
          />
        </div>
        <div className="col-sm-5">
          <TextField
            hintText="Password"
            type="password"
            fullWidth={true}
          />
        </div>
        <div className="col-sm-2">
          <RaisedButton secondary={true} className="inline-btn" fullWidth={true} label="Login" />
        </div>
      </div>
    </form>
  </div>
);

export const FormLayoutFullWidth = () => (
  <div>
    <form className="readmin-form">
      <div className="row">
        <div className="col-sm-12">
          <TextField
            hintText="Username"
            fullWidth={true}
          />
        </div>
        <div className="col-sm-12">
          <TextField
            hintText="Password"
            type="password"
            fullWidth={true}
          />
        </div>
        <div className="col-sm-12 pt20">
          <RaisedButton secondary={true} fullWidth={true} label="Login" />
        </div>
      </div>
    </form>
  </div>
);

export const FormLayoutWithLabel = () => (
  <div>
    <form className="readmin-form">
      <div className="row">
        <div className="col-sm-12">
          <div className="row  align-items-center">
            <div className="col-md-3">
              <label>Usernmae</label>
            </div>
            <div className="col-md-8">
              <TextField
                id="user-name"
                fullWidth={true}
              />
            </div>
          </div>

        </div>
        <div className="col-sm-12">
        <div className="row align-items-center">
          <div className="col-md-3">
            <label>Password</label>
          </div>
          <div className="col-md-8">
            <TextField
              id="password"
              type="password"
              fullWidth={true}
            />
          </div>
        </div>

        </div>
        <div className="col-sm-12 pt20">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-8">
              <RaisedButton secondary={true} fullWidth={true} label="Login" />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
);

export const FormLayoutWithTopLabel = () => (
  <div>
    <form className="readmin-form">
      <div className="row">
        <div className="col-sm-12 pb20">
          <label>Usernmae</label>
          <TextField
            id="user-name1"
            fullWidth={true}
          />
        </div>
        <div className="col-sm-12 pb20">
          <label>Password</label>
          <TextField
            id="password1"
            type="password"
            fullWidth={true}
          />

        </div>
        <div className="col-sm-12 pt20">
          <RaisedButton secondary={true} label="Login" />
        </div>
      </div>
    </form>
  </div>
);
