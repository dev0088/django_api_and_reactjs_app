import React, {Component} from 'react'
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ShipTalentImageLoader from 'components/shiptalent/loaders/ImageLoader';
import { getAvatarFromTalentInfo } from 'utils/appUtils';
import defaultValues from 'constants/defaultValues';
import styles from 'styles';


class RatingTalentAvatar extends Component {

  render() {
    const { talent, castingRequest, classes } = this.props;
    const dateFormat = defaultValues.CASTING_REQUEST_DESCRIPTION_DATE_FORMAT;

    if (castingRequest && talent) {
      return (
        <Grid container spacing={8} direction="column" justify="center" alignItems="center">
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <div className={classes.clientRatingAvatarImageContainer} >
              <ShipTalentImageLoader
                src={getAvatarFromTalentInfo(talent)}
                containerClass={classes.clientRatingAvatarImageContainer}
                imageClassName={classes.clientRatingAvatarImageContainer}
                key={`rc-avatar`}
              />
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography className={[classes.financeTableTitle, classes.inlineText]}>
              {`Average Rating: `}
            </Typography>
            <Typography className={[classes.descriptionText, classes.inlineText]}>
              {talent.average_rating}
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography className={[classes.financeTableTitle, classes.inlineText]}>
              {`Casting Request: `}
            </Typography>
            <Typography className={[classes.descriptionText, classes.inlineText]}>
              {castingRequest.name}
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography className={[classes.financeTableTitle, classes.inlineText]}>
              {`Contract Dates: `}
            </Typography>
            <Typography className={[classes.descriptionText, classes.inlineText]}>
              {`From ${moment(castingRequest.created).format(dateFormat)}
                To ${moment(castingRequest.status_updated_date).format(dateFormat)}`}
            </Typography>
          </Grid>
        </Grid>
      );
    }

    return <div/>
  }
}

export default withStyles(styles)(RatingTalentAvatar);