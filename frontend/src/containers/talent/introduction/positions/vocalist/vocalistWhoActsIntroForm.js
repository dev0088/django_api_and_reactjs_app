import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import VocalistIntroCommon from './vocalistIntroCommon';
import styles from 'styles';

class VocalistWhoActsIntroForm extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <VocalistIntroCommon formTitle={this.props.formTitle} />
            <Typography className={classes.descriptionText}>
              Since you are a Vocalist Who Acts,
              <Typography className={classes.descriptionStrongRed}>
                {" ACTING AUDITION VIDEOS "}
              </Typography>
              are
              <Typography className={classes.descriptionItalicRed}>
                {" required "}
              </Typography>
              . Specifically, you must create and upload two monologues in the
              <Typography className={classes.boldText}>
                {" My Acting Audition Videos "}
              </Typography>
              section. Simply follow the instructions in that section for details. If you have current
              video Excerpts and/or a Sizzle Reel that showcase your acting abilities, these may be
              uploaded to your Profile as well.
            </Typography>
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} />
        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(VocalistWhoActsIntroForm);
