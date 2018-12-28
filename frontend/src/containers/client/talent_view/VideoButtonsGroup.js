import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import Grid from '@material-ui/core/Grid';
import { getPracticVideoNumbers, getLiveVideoNumbers } from 'utils/appUtils';
import styles from 'styles';


class MoreActions extends Component {

  renderVideoButton(link, title, subTitle) {
    const { classes }=this.props;

    return (
      <ColumnButton
        link={link}
        itemClass={classes.clientTalentViewVideoButtonGridItem}
        buttonClass={classes.clientTalentViewVideoButton}
        title={title} titleClass={classes.clientTalentViewVideoButtonText}
        subTitle={subTitle} subTitleClass={classes.clientTalentViewVideoButtonStatusText}
        lg={6} md={6} xs={6} size={6} color="primary" fullWidth={true}
      />
    );
  }

  render() {
    const { talent, allPositionTypes }=this.props;
    const { talent_videos }=talent;

    return (
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item xs={12}>
          <Grid container spacing={16} direction="row" justify="center" alignItems="center">
            {this.renderVideoButton('#', "Video Greetings", 2)}
            {this.renderVideoButton('#', "Video Interview", getLiveVideoNumbers(talent_videos))}
          </Grid>
          <Grid container spacing={16} direction="row" justify="center" alignItems="center">
            {this.renderVideoButton('#', "Vocal Audition Videos", 11)}
            {this.renderVideoButton('#', "Dance Audition Videos", 12)}
          </Grid>
          <Grid container spacing={16} direction="row" justify="center" alignItems="center">
            {this.renderVideoButton('#', "Acting Audition Videos", 3)}
            {this.renderVideoButton('#', "Aerialist Audition Videos", 3)}
          </Grid>
          <Grid container spacing={16} direction="row" justify="center" alignItems="center">
            {this.renderVideoButton('#', "Musician Audition Videos", 0)}
            {this.renderVideoButton('#', "Technician Audition Videos", 0)}
          </Grid>
          <Grid container spacing={16} direction="row" justify="center" alignItems="center">
            {this.renderVideoButton('#', "Cruise Staff Audition Videos", 0)}
            {this.renderVideoButton('#', "Youth Staff Audition Videos", 0)}
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

export default withStyles(styles)(MoreActions);