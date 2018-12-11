import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Panel from 'components/general/panel';
import styles from 'styles';

class DancerDanceCombinationIntroForm extends Component {

  render() {
    const { classes } = this.props;
    let landscapeOrientationLink = {
      pathname: '/talent/video-audition/landscape-orientation',
      state: {
        position: this.props.position,
        previousFormTitle: this.props.formTitle
      }
    };
    let link = {
      pathname: '/video-positions',
      state: {
        position: this.props.position,
        previousFormTitle: this.props.formTitle
      }
    };

    return (
      <Panel>
        <Grid container spacing={16} direction="column" justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <Typography className={classes.descriptionText}>
              If you are a
              <Typography className={classes.boldText}>
                {" Vocalist, Actor or Aerialist Who Moves"}
              </Typography>
              , casting directors and hiring managers are looking for how quickly and efficiently
              you pick-up, retain and perform the various movement routines that are taught during
              the dance combination portion of an audition.
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              {`ShipTalent.com has developed a way to do this via video, but it requires precision
              planning on your part as this is a `}
              <Typography className={classes.boldUnderlineText}>
                {"TIMED EVENT"}
              </Typography>
              {`.`}
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              The
              <Typography className={classes.boldText}>
                {" My Movement Combination Video "}
              </Typography>
              button is located within the
              <Typography className={classes.boldText}>
                {" My Dance Audition Videos "}
              </Typography>
              section. You will have
              <Typography className={classes.boldText}>
                {" ONE HOUR "}
              </Typography>
              to download the randomly assigned Movement Combination Instruction Video, learn the
              combination, shoot a video of yourself performing the combination, and upload the video
              to your Profile.  The ONE HOUR clock STARTS at the end of the Movement Combination Instruction
              Video download and STOPS at the beginning of your Movement Combination Video upload.
              Times are tracked automatically by ShipTalent.com.
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              You must use the movement combination that is assigned to you by ShipTalent.com. You
              may not download a second movement combination within the hour. There are dozens of
              movement combinations and you will never receive the same Movement Combination Instruction
              Video twice.
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              Should you be unable to complete the Movement Combination Video process (download, shoot
              and upload) within the one-hour deadline, you will
              <Typography className={classes.boldText}>
                {" TIME OUT "}
              </Typography>
              and you will have to start over with a different movement combination. Should you
              <Typography className={classes.boldText}>
                {" TIME OUT "}
              </Typography>
              three times, you will be temporarily locked-out of the Movement Combination Video feature
              of the site until contacted via phone by a ShipTalent.com representative to discuss the
              situation with you personally.
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              Do not start the download process until you are fully dressed, warmed-up and ready to go;
              video equipment should already be checked and tested and you must have full access to
              high-speed internet.
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              The Movement Combination Video should be filmed in a large space, ideally a studio or stage.
              The video zoom level should be tight enough to see the dancer’s full body and facial expressions.
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              It all may sound a bit stressful and, honestly, it can be.  But, try to relax and do your
              best.  Listen closely to the choreographer in the Movement Combination Instruction Video,
              smile, show your personality and sell it!
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              Unlike other audition videos, in the interest of time, there is no need to trim the beginning
              and ending of your Movement Combination Video.  Instead, simply start and stop your video
              recording when the choreographer in the Movement Combination Instruction Video tells you to.
              If you’re using your smartphone camera, always remember to shoot in
              <Typography className={classes.boldText}>
                {" Landscape Orientation"}
              </Typography>
              {". "}
              <Link to={landscapeOrientationLink}>
                <Typography color="primary" className={classes.boldUnderlineText}>
                  What is Landscape Orientation?
                </Typography>
              </Link>
            </Typography>
            <br/>
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Link to={link}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth={false}
                className={classes.talentProfileGuideButton}
              >
                <Typography className={classes.talentProfileGuideButtonTitle}>
                  Proceed to My Dance Audition Videos
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(DancerDanceCombinationIntroForm);
