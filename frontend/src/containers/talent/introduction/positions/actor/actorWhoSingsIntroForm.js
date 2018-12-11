import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Panel from 'components/general/panel';
import ActorIntroCommon from './actorIntroCommon';
import styles from 'styles';

class ActorWhoSingsIntroForm extends Component {

  renderAdditional() {
    const { classes } = this.props;
    let link = {
      pathname: '/talent/video-audition/actor-sings-more-intro',
      state: {previousFormTitle: this.props.formTitle}
    };

    return (
      <div>
      <Typography className={classes.descriptionText}>
        {`As you are an Actor Who Sings, `}
        <Typography className={classes.descriptionStrongRed}>
          Vocal Audition Videos
        </Typography>
        {` are `}
        <Typography className={classes.descriptionItalicRed}>
          required
        </Typography>
        . In addition to creating and uploading your Acting Audition Videos, you must create and upload
        Vocal Audition Videos for each vocal style in which you are vocally proficient in the My Vocal
        Audition Videos section.
      </Typography>
        <Link to={link}>
          <Button
            variant="contained"
            color="primary"
            fullWidth={false}
            className={classes.talentProfileGuideButton}
          >
            <Typography className={classes.talentProfileGuideButtonTitle}>
              Click here for more information and instructions on how to create your Vocal Audition Videos
            </Typography>
          </Button>
        </Link>
      </div>
    )
  }

  render() {
    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <ActorIntroCommon formTitle={this.props.formTitle} />
            {this.renderAdditional()}
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} />
        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(ActorWhoSingsIntroForm);
