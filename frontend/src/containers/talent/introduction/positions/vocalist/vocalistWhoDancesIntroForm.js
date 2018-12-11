import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import VocalistIntroCommon from './vocalistIntroCommon';
import styles from 'styles';

class VocalistWhoDancesIntroForm extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <VocalistIntroCommon formTitle={this.props.formTitle} />
            <Typography className={classes.descriptionText}>
              Since you are a Vocalist Who Dances, a
              <Typography className={classes.descriptionStrongRed}>
                {" DANCE DEMONSTRATION VIDEOS "}
              </Typography>
              and
              <Typography className={classes.descriptionStrongRed}>
                {" DANCE COMBINATION VIDEOS "}
              </Typography>
              are
              <Typography className={classes.descriptionItalicRed}>
                {" required "}
              </Typography>
              . The dance combinations are advanced and geared toward very skilled dancers.
              If you are a true double- or triple-threat, simply follow the instructions in the
              <Typography className={classes.boldText}>
                {" My Dance Audition Videos "}
              </Typography>
              {" section to create audition videos for "}
              <Typography className={classes.underlineText}>
                {"every"}
              </Typography>
              dance style in which you are proficient.
              If you find the dance combinations too challenging, you may wish to categorize yourself
              on this site as a Vocalist Who Moves and complete the Movement Combination Video instead.
            </Typography>
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} />
        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(VocalistWhoDancesIntroForm);
