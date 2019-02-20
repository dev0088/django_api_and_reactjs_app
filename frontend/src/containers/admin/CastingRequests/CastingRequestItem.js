import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StatusCheckBox from 'components/shiptalent/checkbox/StatusCheckBox';
import defaultValues from 'constants/defaultValues';
import { adminStyles } from 'styles';


class CastingRequestItem extends Component {
  render() {
    const {castingRequest, path, showStatus, classes } = this.props;
    let completedStatus = (castingRequest && castingRequest.status === "Completed");
    let buttonClasses = classNames(classes.button, classes.adminCastingRequestButton);

    return (
      (castingRequest) ? (
        <Grid container spacing={16}>
          <Grid item xs={6} >
            <Link to={{pathname: path ? path : '/admin/casting-request', state: {castingRequest: castingRequest}}}>
              <Button variant="contained" size="large" fullWidth className={buttonClasses}>
                  <Typography className={classNames(classes.bold, classes.adminTalentStatusButtonText)}>
                  { `${castingRequest.name} ${moment(castingRequest.created).format(defaultValues.ADMIN_CASTING_REQUEST_TITLE_FORMAT)}` }
                  </Typography>
              </Button>
            </Link>
          </Grid>
          { showStatus &&
            <Grid item xs={6} >
              <StatusCheckBox
                name={'contracted'}
                title={'Contract Completed'}
                checked={completedStatus}
                className={completedStatus 
                  ? classes.adminStatusCastingRequestContractCompleted 
                  : classes.adminStatusCastingRequestContractNotCompleted
                }
              />
            </Grid>
          }
        </Grid>
      ) : (
        <div>None</div>
      )        
    );
  }
}

export default withStyles(adminStyles)(CastingRequestItem);