import React, {Component} from 'react'
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeTitleWithAllPositionTypes } from 'utils/appUtils';
import defaultValues from 'constants/defaultValues';
import { adminStyles } from 'styles';


class CastingRequestOfferDetails extends Component {

  renderOfferItem = (title, value) => {
    const { classes } = this.props;
    return (
      <Grid item xs={12} >
        <Typography className={classNames(classes.bold, classes.adminGeneralText, classes.inlineText)}>
          { title }
        </Typography>
        <Typography className={classNames(classes.adminGeneralText, classes.inlineText)}>
          { value }
        </Typography>
      </Grid>
    );
  };

  render() {
    const {castingRequest, castingRequestTalent, classes } = this.props;
    let talent = castingRequestTalent ? castingRequestTalent.talent : '';
    const { CASTING_REQUEST_DESCRIPTION_DATE_FORMAT } = defaultValues;

    return (
      (castingRequest && castingRequestTalent) ? (
        <Grid container spacing={8}>
          <Grid item xs={12} >
            <Typography className={classNames(classes.bold, classes.adminGeneralTitle, classes.underlineText)}>
              OFFER DETAILS
            </Typography>
          </Grid>
          { this.renderOfferItem('Position: ', makeTitleWithAllPositionTypes(talent)) }
          { this.renderOfferItem('Date Requested: ',  moment(castingRequest.created).format(CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)) }
          { this.renderOfferItem(
              'Full Empoyment Dates: ',  
              `${moment(castingRequest.employment_start_date).format(CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)} - ${moment(castingRequest.employment_end_date).format(CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)}`
            )
          }
          { this.renderOfferItem(
              'Rehearsal Dates: ',  
              `${moment(castingRequest.rehearsal_start_date).format(CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)} - ${moment(castingRequest.rehearsal_end_date).format(CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)}`
            )
          }
          { this.renderOfferItem('Rehearsal Location: ', castingRequest.rehearsal_location) }
          { this.renderOfferItem('Ship: ', castingRequest.ship_name) }
          { this.renderOfferItem('Ship Deployment Date: ', castingRequest.talent_join_date) }
          { this.renderOfferItem('Rehearsal Wage: ', castingRequestTalent.rehearsal_wage) }
          { this.renderOfferItem('Performance Wage: ', castingRequestTalent.performance_wage) }
          { this.renderOfferItem('Visa Requirements: ', castingRequest.visa_requirements) }
          { this.renderOfferItem('Comments: ', castingRequestTalent.comments) }
        </Grid>
      ) : (
        <div>None</div>
      )        
    );
  }
}

export default withStyles(adminStyles)(CastingRequestOfferDetails);