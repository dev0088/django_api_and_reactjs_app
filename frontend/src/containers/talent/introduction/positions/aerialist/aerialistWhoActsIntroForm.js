import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Panel from 'components/general/panel';
import AerialistIntroCommon from './aerialistIntroCommon';
import styles from 'styles';

class AerialistWhoActsIntroForm extends Component {

  renderAdditional() {
    const { classes } = this.props;
    let link = {
      pathname: '/talent/video-audition/vocalist-dancer-acts-intro',
      state: {previousFormTitle: this.props.formTitle}
    }

    return (
      <div>
        <Typography className={classes.descriptionText}>
          Since you are a Aerialist Who Acts,
          <Typography className={classes.descriptionStrongRed}>
            {" Acting Audition Videos "}
          </Typography>
          are
          <Typography className={classes.descriptionItalicRed}>
            {" required" }
          </Typography>
          . Specifically, you must create and upload two monologues in the
          <Typography className={classes.boldText}>
            {" My Acting Audition Videos "}
          </Typography>
          section. Simply follow the instructions in that section for details. If you have current video
          Excerpts and/or a Sizzle Reel that showcase your acting abilities, these may be uploaded to your
          Profile as well.
        </Typography>
        <br/>
      </div>
    )
  }

  render() {
    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <AerialistIntroCommon
              formTitle={this.props.formTitle}
              childNodes={this.renderAdditional()}
            />
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} />
        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(AerialistWhoActsIntroForm);
