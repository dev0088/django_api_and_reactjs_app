import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Panel from 'components/general/panel';
import AerialistIntroCommon from './aerialistIntroCommon';
import styles from 'styles';

class AerialistWhoMovesIntroForm extends Component {

  renderAdditional() {
    const { classes } = this.props;

    return (
      <Typography className={classes.descriptionText}>
        {`Since you are an Aerialist Who Moves, a `}
        <Typography className={classes.descriptionStrongRed}>
          Movement Combination Audition Video
        </Typography>
        {` is `}
        <Typography className={classes.descriptionItalicRed}>
          required
        </Typography>
        {`. This is a timed event. In the `}
        <Typography className={classes.boldText}>
          My Dance Audition Videos
        </Typography>
        {` section, simply select the `}
        <Typography className={classes.boldText}>
          My Movement Combination Video
        </Typography>
        {` button to create your Movement Combination Video and upload it to your Profile within the
        allotted amount of time.`}
      </Typography>
    )
  }

  render() {
    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <AerialistIntroCommon formTitle={this.props.formTitle} />
            {this.renderAdditional()}
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} />
        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(AerialistWhoMovesIntroForm);
