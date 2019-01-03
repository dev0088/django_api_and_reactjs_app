import React, {Component} from 'react';
import {connect} from "react-redux";
import { Alert } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Panel from 'components/general/panel';
import ClientForm from 'components/shiptalent/forms/clientForm';
import CastingRequestTalent from './castingRequestTalent';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles';


class CastingRequestAddWageForm extends Component {

  state = {
    castingRequestTalent: {},
    rehearsalWage: null,
    performanceWage: null,
    comment: null,
    error: false,
    errorMessage: null
  };

  getInfoFromProps = (props) => {
    let castingRequestTalent = (props.location && props.location.state)
      ? props.location.state.castingRequestTalent
      : null
    return {
      castingRequestTalent: (props.location && props.location.state)
                            ? props.location.state.castingRequestTalent
                            : null,
      rehearsalWage: castingRequestTalent ? castingRequestTalent.rehearsal_wage : null,
      performanceWage: castingRequestTalent ? castingRequestTalent.performance_wage: null,
      comment: castingRequestTalent ? castingRequestTalent.comment : null
    }
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props)});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps)});
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClickSaveAndReturn = (event) => {
    const { castingRequestTalent, rehearsalWage, performanceWage, comment } = this.state;
    let data = {...castingRequestTalent};

    data.rehearsal_wage = parseInt(rehearsalWage);
    data.performance_wage = parseInt(performanceWage);
    data.comment = comment;

    event.preventDefault();

    ClientAPI.saveCastingRequestTalent(castingRequestTalent.id, data, this.handleSaveWageResponse);
  };

  handleSaveWageResponse = (response, isFailed) => {
    if(isFailed) {
      this.setState({ error: true, errorMessage: 'Failed save wages.' });
    } else {
      this.setState({ error: false, errorMessage: false });
      this.props.history.push('/client/casting_request/view', {castingRequest: response.casting_request});
    }
  };

  handleClickCancel = (event) => {
    const { castingRequestTalent, rehearsalWage, performanceWage, comment } = this.state;

    event.preventDefault();

    ClientAPI.getCastingRequestTalent(castingRequestTalent.id, this.handleCancelResponse);
  };

  handleCancelResponse = (response, isFailed) => {
    if(isFailed) {
      this.setState({ error: true, errorMessage: 'Failed to go back.' });
    } else {
      this.setState({ error: false, errorMessage: false });
      this.props.history.push('/client/casting_request/view', {castingRequest: response.casting_request});
    }
  }

  renderContent = () => {
    const { title, classes } = this.props;
    const { castingRequestTalent, rehearsalWage, performanceWage, comment, error, errorMessage } = this.state;

    return (
      <Panel title={title} bold={true} center={true} key="cr-aw-f" className={[classes.h4NoMargin, classes.bold, classes.centerText]}>
        {error && <Alert color="danger">{errorMessage}</Alert>}
        <Grid container spacing={16} justify="flex-start" alignItems="flex-start">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <CastingRequestTalent castingRequestTalent={castingRequestTalent} hideWage={true} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.leftText}>
            <Typography className={classes.financeTableTitle}>
              {'Rehearsal Wage'}
            </Typography>
            <TextField
              id="outlined-name"
              label=""
              className={classes.textField}
              value={rehearsalWage}
              type="number"
              onChange={this.handleChange('rehearsalWage')}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.leftText}>
            <Typography className={classes.financeTableTitle}>
              {'Performance Wage'}
            </Typography>
            <TextField
              id="outlined-name"
              label=""
              className={classes.textField}
              value={performanceWage}
              type="number"
              onChange={this.handleChange('performanceWage')}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.leftText}>
            <Typography className={classes.financeTableTitle}>
              {'Talent-Specific Comments and/or Requirements'}
            </Typography>
            <TextField
              id="outlined-name"
              label=""
              value={comment}
              type="text"
              onChange={this.handleChange('comment')}
              margin="normal"
              variant="outlined"
              multiline
              fullWidth
              rows={5}
              rowsMax={2}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Panel>
    );
  };

  render() {
    const { title, classes } = this.props;
    const { castingRequestTalent } = this.state;

    let backLink = {
      pathname: "/client/casting_request/view",
      state: {castingRequestTalent}
    };
    let nextLink = {
      pathname: "/client/casting_request/view",
      state: {castingRequest: castingRequestTalent ? castingRequestTalent.castingRequest : null}
    };

    return (
      <ClientForm
        formTitle="Talent Wage and Comments"
        backLink={backLink}
        backButtonTitle="Save and Return to Casting Request"
        handleClickBackButton={this.handleClickSaveAndReturn}
        nextLink={nextLink}
        nextButtonTitle="Cancel and Return to Casting Request"
        handleClickNextButton={this.handleClickCancel}
      >
        {this.renderContent()}
      </ClientForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
};


export default connect(null, mapDispatchToProps)(withStyles(styles)(CastingRequestAddWageForm));
