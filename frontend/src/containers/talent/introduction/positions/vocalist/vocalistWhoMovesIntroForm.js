import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import VocalistIntroCommon from './vocalistIntroCommon';
import styles from 'styles';

class VocalistWhoMovesIntroForm extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <VocalistIntroCommon />
            <Typography className={classes.descriptionText}>
              Since you are a Vocalist Who Moves, a
              <Typography className={classes.descriptionStrongRed}>
                {" MOVEMENT COMBINATION AUDITION VIDEO "}
              </Typography>
              is
              <Typography className={classes.descriptionItalicRed}> required </Typography>
              . This is a timed event. In the
              <Typography className={classes.boldText}>
                {" My Dance Audition Videos "}
              </Typography>
              section, simply select the
              <Typography className={classes.boldText}>
                {" My Movement Combination Video "}
              </Typography>
              button to create your Movement Combination Video and upload it to your Profile within
              the allotted amount of time.
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              If you have a current performance video or sizzle reel that showcases your movement
              abilities, this may be uploaded to your Profile as well.
            </Typography>
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} />
        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(VocalistWhoMovesIntroForm);
