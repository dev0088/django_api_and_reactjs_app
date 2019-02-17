import React, {Component} from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import defaultValues from 'constants/defaultValues';
import { adminStyles } from 'styles';


class VideoDetail extends Component {

  render() {
    const { video, classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography className={classNames(classes.adminGeneralDescriptionText, classes.inlineText)}>
              <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
                {'Date and Time Posted: '}
              </Typography>
              {video ? moment.tz(video.updated).format(defaultValues.ADMIN_EDIT_PROFILE_FORMAT) : ''}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.adminGeneralDescriptionText, classes.inlineText)}>
              <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
                {'Running Time: '}
              </Typography>
              {''}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.adminGeneralDescriptionText, classes.inlineText)}>
            <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
              {'Date and Time Approved: '}
            </Typography>
            {video ? moment.tz(video.approved_date).format(defaultValues.ADMIN_EDIT_PROFILE_FORMAT) : ''}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classNames(classes.adminGeneralDescriptionText, classes.inlineText)}>
            <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
              {'Approved By: '}
            </Typography>
            {video ? video.approved_by : ''}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(adminStyles)(VideoDetail);