import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import withWidth from '@material-ui/core/withWidth';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import compose from 'recompose/compose';
import Panel from 'components/general/panel';
import Spacer from "components/general/spacer";
import * as talentActions from 'actions/talentActions'
import TalentAPI from 'apis/talentAPIs';
import styles from 'styles';


class TalentChangePasswordForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      error: false,
      errorMessage: {currentPassword: false, newPassword: false, confirmPassword: false},
      success: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      error: nextProps.changePassword && nextProps.changePassword.isFailure
        ? `${nextProps.changePassword.errorMessage.name}: ${nextProps.changePassword.errorMessage.statusText}`
        : false
    });
  }

  componentDidUpdate() {
    if (this.props.changePassword && this.props.changePassword.isChanged) {
      this.props.history.push('/my-account')
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowNewPassword = () => {
    this.setState(state => ({ showNewPassword: !state.showNewPassword }));
  };

  handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showConfirmPassword: !state.showConfirmPassword }));
  };

  handleSubmit = (event) => {
    const { currentPassword, newPassword, confirmPassword } = this.state;
    console.log(currentPassword, newPassword, confirmPassword);
    if (newPassword !== confirmPassword) {
      this.setState({
        error: 'Failed to change your password.',
        errorMessage: {confirmPassword: 'Please enter the same value again'}
      });
      return;
    }
    // this.props.talentActions.changePassword(currentPassword, newPassword, confirmPassword);
    let data = {
      current_password: currentPassword,
      new_password: newPassword
    };

    this.setState({ error: false, success: false, errorMessage: false }, () => {
      TalentAPI.changeTalentPassword(data, this.handleChangePasswordResponse);
    });
  };

  handleChangePasswordResponse = (response, isFailed) => {
    if (isFailed) {
      const { current_password, new_password } = response;
      let errorMessage = {currentPassword: current_password, newPassword: new_password};

      this.setState({ error: `Failed to change your password.`, errorMessage });
    } else {
      this.setState({ error: false, success: `Changed your password successfully!` });
    }
  };

  render() {
    const { classes, width } = this.props;
    const { error, success, errorMessage } = this.state;
    let descriptionAlignClass = width === 'sm' || width === 'xs' ? classes.leftText : classes.rightText;
    return (
      <Panel>

        <Grid container spacing={40} justify="center" alignItems="center">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={20}/>
          </Grid>
          {!!error && <Alert color="danger">{error}</Alert>}
          {!!success && <Alert color="success">{success}</Alert>}
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={16} direction="row" justify="center" alignItems="center">
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Typography
                  className={[
                    classes.financeTableTitle,
                    descriptionAlignClass
                  ]}
                >
                  {`Current Password`}
                </Typography>
              </Grid>
              <Grid item lg={5} md={5} sm={12} xs={12}>
                {(!!error && errorMessage['currentPassword']) && <Alert color="danger">{errorMessage['currentPassword']}</Alert>}
                <TextField
                  id="outlined-current-password"
                  className={[classes.margin, classes.textField, classes.fullWidth]}
                  variant="outlined"
                  type={this.state.showPassword ? 'text' : 'password'}
                  label="Current Password"
                  value={this.state.password}
                  onChange={this.handleChange('currentPassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={0}/>
            </Grid>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={16} direction="row" justify="center" alignItems="center">
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Typography className={[classes.financeTableTitle, descriptionAlignClass]}>
                  {`Enter New Password`}
                </Typography>
              </Grid>
              <Grid item lg={5} md={5} sm={12} xs={12}>
                {(!!error && errorMessage['newPassword']) && <Alert color="danger">{errorMessage['newPassword']}</Alert>}
                <TextField
                  id="outlined-new-password"
                  className={[classes.margin, classes.textField, classes.fullWidth]}
                  variant="outlined"
                  type={this.state.showNewPassword ? 'text' : 'password'}
                  label="Enter New Password"
                  value={this.state.newPassword}
                  onChange={this.handleChange('newPassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowNewPassword}
                        >
                          {this.state.showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={0}/>
            </Grid>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={16} direction="row" justify="center" alignItems="center">
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Typography className={[classes.financeTableTitle, descriptionAlignClass]}>
                  {`Confirm New Password`}
                </Typography>
              </Grid>
              <Grid item lg={5} md={5} sm={12} xs={12}>
                {(!!error && errorMessage['confirmPassword']) && <Alert color="danger">{errorMessage['confirmPassword']}</Alert>}
                <TextField
                  id="outlined-current-password"
                  className={[classes.margin, classes.textField, classes.fullWidth]}
                  variant="outlined"
                  type={this.state.showConfirmPassword ? 'text' : 'password'}
                  label="Confirm New Password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange('confirmPassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowConfirmPassword}
                        >
                          {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={0}/>
            </Grid>
          </Grid>

          <Grid item lg={5} md={4} sm={4} xs={2}/>
          <Grid item lg={2} md={4} sm={4} xs={8}>
            <Button
                  variant="contained" color={'primary'}
                  fullWidth={true}
                  className={classes.talentProfileGuideButton}
                  onClick={ this.handleSubmit }
                >
                  <Typography className={classes.talentProfileGuideButtonTitle}>
                    {`Submit`}
                  </Typography>
                </Button>
          </Grid>
          <Grid item lg={5} md={4} sm={4} xs={2}/>

        </Grid>
      </Panel>
    );

  }
}

function mapStateToProps(state) {
  const { changePassword } = state;

  return {
    changePassword
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(compose(withStyles(styles), withWidth(),)(TalentChangePasswordForm));