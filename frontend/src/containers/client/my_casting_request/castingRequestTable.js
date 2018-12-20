import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Panel from 'components/general/panel';
import moment from 'moment';
import styles from 'styles';


const castingRequestTableDesign = {
  view: {lg: 1, md: 1, sm: 1, xs: 6},
  name: {lg: 3, md: 3, sm: 5, xs: 12},
  venue: {lg: 2, md: 2, sm: 6, xs: 12},
  dates: {lg: 3, md: 3, sm: 6, xs: 12},
  status: {lg: 1, md: 1, sm: 2, xs: 12},
  requestDate: {lg: 2, md: 2, sm: 4, xs: 12},
};

const castingRequestDateFormat = 'MM/DD/YYYY';

class CastingRequestTable extends Component {

  handleClickViewButton = (castingRequest) => {
    this.props.history.push('/client/casting_request/view', {castingRequest: castingRequest})
  };

  renderViewButton = (castingRequest) => {
    const { classes } = this.props;
    console.log('----- path: \'/client/casting_request/view\': ', castingRequest)
    return (
      <Grid item {...castingRequestTableDesign['view']} className={ classes.clientCastingRequestGridItem }>
        <Link to={{ pathname: "/client/casting_request/view", state: { castingRequest } }} >
          <Button className={classes.clientCastingRequestListViewButton}>
            <Typography className={classes.clientCastingRequestListViewButtonText}>
              {'view'}
            </Typography>
          </Button>
        </Link>
      </Grid>
    );
  };

  renderValue = (text, fieldName, classNames = null) => {
    const { classes } = this.props;

    return (
      <Grid item {...castingRequestTableDesign[fieldName]} key={`${fieldName}`}>
        <Typography className={classNames ? classNames : classes.financeTableContentText}>
          {text}
        </Typography>
      </Grid>
    );
  };

  renderGeneralHeader = () => {
    const { classes } = this.props;
    let items = [];
    items.push(this.renderValue('', 'view', [classes.financeTableTitle, classes.underlineText]));
    items.push(this.renderValue('Casting Request Name', 'name', [classes.financeTableTitle, classes.underlineText]));
    items.push(this.renderValue('Venue', 'venue', [classes.financeTableTitle, classes.underlineText]));
    items.push(this.renderValue('Dates', 'dates', [classes.financeTableTitle, classes.underlineText]));
    items.push(this.renderValue('Status', 'status', [classes.financeTableTitle, classes.underlineText]));
    items.push(this.renderValue('Request Date', 'requestDate', [classes.financeTableTitle, classes.underlineText]));

    return items;
  };

  renderCastingRequest = (castingRequest) => {
    let items = [];
    items.push (this.renderViewButton(castingRequest));
    items.push (this.renderValue(`${castingRequest.name}`, 'name'));
    items.push (this.renderValue(`${castingRequest.client.user.first_name} ${castingRequest.client.user.last_name}`, 'venue'));
    items.push (this.renderValue(
      `From: ${moment(castingRequest.employment_start_date).format(castingRequestDateFormat)} 
       To: ${moment(castingRequest.employment_end_date).format(castingRequestDateFormat)}`,
      'dates')
    );
    items.push (this.renderValue(castingRequest.status, 'status'));
    items.push (this.renderValue(moment(castingRequest.created).format(castingRequestDateFormat), 'requestDate'));

    return items;
  };

  renderCastingRequests = (castingRequests) => {

    let items = [];
    if (castingRequests.length > 0) {
      items = castingRequests.map(castingRequest => {
        return this.renderCastingRequest(castingRequest);
      });
    }

    return items;
  };
  
  render() {
    const { title, castingRequests } = this.props;

    return (
      <Panel title={title} bold={true} key={`cr-t-p-${title.replace(/\s/g, '')}`} >
        <Grid container spacing={16} justify="flex-start" alignItems="flex-start" key={`cr-t-p-g-${title.replace(/\s/g, '')}`}>
          { this.renderGeneralHeader() }
          { this.renderCastingRequests(castingRequests) }
        </Grid>
      </Panel>
    )
  }
}

export default (withStyles(styles)(CastingRequestTable));
