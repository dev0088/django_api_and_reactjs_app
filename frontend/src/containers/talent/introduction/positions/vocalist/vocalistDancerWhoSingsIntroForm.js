import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Panel from 'components/general/panel';
import VocalistIntroCommon from './vocalistIntroCommon';
import styles from 'styles';

class VocalistDancerWhoSingsIntroForm extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <Typography className={classes.descriptionText}>
              As you are a Dancer Who Sings, in addition to creating and uploading your
              Dance Audition Videos and timed Dance Combination Videos, you must create
              and upload Vocal Audition Videos for each vocal style in which you are vocally
              proficient in the My Vocal Audition Videos section.
            </Typography>
            <br/>
            <VocalistIntroCommon
              requiredName="ALL Dancers Who Sing"
            />
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} />
        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(VocalistDancerWhoSingsIntroForm);
