import React, {Component} from 'react';
import moment from 'moment';
import { Alert } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Panel from 'components/general/panel';
import ClientAPI from 'apis/clientAPIs';
import defaultValues from 'constants/defaultValues';
import styles from 'styles';


class CastingRequestSubmitForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: null
    }
  }

  handleClickSubmit = () => {
    const { castingRequest } = this.props;
    let data = {
      ...castingRequest
    };
    data.status = "Requested";
    data.status_updated_date = moment().format();
    ClientAPI.saveCastingRequest(castingRequest.id, data, this.handleCastingRequestSubmitResponse);
  };

  handleCastingRequestSubmitResponse = (response, isFailed) => {

    if (isFailed) {
      this.setState({error: true, errorMessage: 'Failed to submit your casting request. Please try later.'});
    } else {
      this.setState({error: false, errorMessage: null}, () => {
        window.location.href = "/client/casting_request/submit_confirm";
      });
    }
  };

  renderCastingRequestItem = (name, value) => {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Typography className={[classes.financeTableTitle, classes.inlineText]}>
          {`${name}: `}
        </Typography>
        <Typography className={[classes.descriptionText, classes.inlineText]}>
          {value}
        </Typography>
      </Grid>
    )
  };

  renderCastingRequestTable() {
    const { classes, castingRequest } = this.props;
    return (
      <Grid container spacing={16} direction="row" justify="center" alignItems="center">
        <Grid item md={7} xs={12}>
          <Grid container spacing={16} direction="column" justify="flex-start" alignItems="flex-start">
            { this.renderCastingRequestItem('Ship', castingRequest.ship_name ? castingRequest.ship_name : '') }
            { this.renderCastingRequestItem('Date of Employment',
              `From ${moment(castingRequest.employment_start_date).format(defaultValues.CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)}
              To ${moment(castingRequest.employment_end_date).format(defaultValues.CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)}`)
            }
            { this.renderCastingRequestItem('Deployment Date',
              moment(castingRequest.talent_join_date).format(defaultValues.CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)) }
            { this.renderCastingRequestItem('Rehearsal Dates',
              `From ${moment(castingRequest.rehearsal_start_date).format(defaultValues.CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)}
              To ${moment(castingRequest.rehearsal_end_date).format(defaultValues.CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)}`)
            }
            { this.renderCastingRequestItem('Rehearsal Location', '') }
            { this.renderCastingRequestItem('Performance Dates',
              `From ${moment(castingRequest.performance_start_date).format(defaultValues.CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)}
              To ${moment(castingRequest.performance_end_date).format(defaultValues.CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)}`)
            }
            { this.renderCastingRequestItem('Visas Required', castingRequest.visa_requirements) }
            { this.renderCastingRequestItem('Other Cast Requirements and/or Comments', castingRequest.comments) }
          </Grid>
        </Grid>
        <Grid item md={5} xs={12}>
          {
            castingRequest.status === 'Draft' ? (
              <Button
                variant="contained"
                color="secondary"
                className={classes.submitCastingRequestButton}
                onClick={this.handleClickSubmit}
              >
                <Typography className={classes.submitCastingRequestButtonText}>
                  {"Submit Casting Request"}
                </Typography>
              </Button>
            ) : (
              <Typography className={[classes.financeTableTitle, classes.italicText]}>
                {castingRequest.status}
              </Typography>
            )
          }
        </Grid>
      </Grid>
    )
  }

  render() {
    const { title } = this.props;
    const { error, errorMessage } = this.state;

    return (
      <Panel title={title} bold={true} center={true} key="casting-request-submit-form">
        {error && <Alert color="danger">{errorMessage}</Alert>}
        <Grid container spacing={16} justify="flex-start" alignItems="flex-start" style={{paddingLeft: '30px', paddingRight: '30px'}}>
          { this.renderCastingRequestTable() }
        </Grid>
      </Panel>
    )
  }
}

export default (withStyles(styles)(CastingRequestSubmitForm));
