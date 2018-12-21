import React, {Component} from 'react';
import { Link } from 'react-router-dom';
// import ImageLoader from 'react-loading-image';
import ShipTalentImageLoader from 'components/shiptalent/loaders/ImageLoader';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { getAvatarFromTalentInfo, makeTalentOverviewTitle } from 'utils/appUtils';
import styles from 'styles';


class CastingRequestTalent extends React.Component {

  renderImage = (castingRequestTalent) => {
    const { classes } = this.props;
    const { talent } = castingRequestTalent;

    return (
      <ShipTalentImageLoader
        src={getAvatarFromTalentInfo(talent)}
        containerClass={classes.pictureContainer}
        imageClassName={classes.clientTalentSearchResultPicture}
        link={{pathname: '/client/talent_view', state: { talentInfo: talent } }}
        key={`${(talent && talent.id) ? talent.id : 'crt'}`}
      />
    );
  };

  renderTalentDescription = (castingRequestTalent) => {
    const { classes } = this.props;
    const { talent } = castingRequestTalent;

    return (
      <Grid
        container spacing={0} direction="column" justify="flex-start" alignItems="flex-start"
        key={`casting-request-talent-table-item-${!!talent && talent.id}-description`}
      >
        <Grid item lg={12} md={12} xs={12}>
          <Typography className={[classes.descriptionText, classes.leftText]}>
            { talent && makeTalentOverviewTitle(talent)}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Typography className={[classes.descriptionText, classes.bold, classes.leftText]}>
            {talent && `“${talent.head_line}”`}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Typography className={[classes.descriptionText, classes.leftText]}>
            {talent && `Average Rating: ${talent.average_rating}`}
          </Typography>
        </Grid>
      </Grid>
    )
  };

  renderWage = (castingRequestTalent) => {
    const { classes } = this.props;
    const { talent, rehearsal_wage, performance_wage, comment } = castingRequestTalent;

    if (!rehearsal_wage || !performance_wage) {
      return (
        <Grid container spacing={8} direction="column" justify="center" alignItems="center" key={`casting-request-talent-table-item-${!!talent && talent.id}-wage`}>
          <Grid item lg={12} md={12} xs={12}>
            <Link
              to={{
                pathname: '/client/casting_request/add_wage',
                state: {castingRequestTalent}
              }}
            >
              <Button
                variant="contained"
                fullWidth={true}
                className={classes.clientCastingRequestListViewButton}
              >
                <Typography className={classes.clientCastingRequestListViewButtonText}>
                  {`Add Wage & Comments`}
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
      )
    }
    return (
      <Grid container spacing={8} direction="row" justify="center" alignItems="center" key={`casting-request-talent-table-item-${!!talent && talent.id}-wage`}>
        <Grid item lg={6} md={6} xs={12}>
          <Typography className={[classes.descriptionText, classes.bold, classes.underlineText]}>
            {`Rehearsal Wage`}
          </Typography>
          <Typography className={[classes.descriptionText]}>
            {`$${rehearsal_wage.toLocaleString()}/mo`}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Typography className={[classes.descriptionText, classes.bold, classes.underlineText]}>
            {`Performance Wage`}
          </Typography>
          <Typography className={[classes.descriptionText]}>
            {`$${performance_wage.toLocaleString()}/mo`}
          </Typography>
        </Grid>
      </Grid>
    )
  };

  render() {
    const { castingRequestTalent, hideWage } = this.props;

    if (castingRequestTalent) {
      return (
        <Grid container spacing={0} direction="row" justify="flex-start" alignItems="flex-start"
              key={`casting-request-talent-table-item-
                ${(castingRequestTalent && castingRequestTalent.talent && castingRequestTalent.talent.id)
                ? castingRequestTalent.talent.id : ''}`
              }
        >
          <Grid item lg={1} md={1} xs={4}>
            {this.renderImage(castingRequestTalent)}
          </Grid>
          <Grid item lg={8} md={8} xs={4}>
            {this.renderTalentDescription(castingRequestTalent)}
          </Grid>
          {!hideWage && <Grid item lg={3} md={3} xs={4}>
            {this.renderWage(castingRequestTalent)}
          </Grid>
          }
        </Grid>
      )
    } else {
      return <div/>
    }

  }
}

export default (withStyles(styles)(CastingRequestTalent));
