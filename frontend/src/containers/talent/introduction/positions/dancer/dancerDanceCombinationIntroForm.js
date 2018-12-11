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
                {" Vocalist, Actor or Aerialist Who Dances"}
              </Typography>
              , you should be exceptional and
              versatile with strong technique and experience in multiple dance styles along with
              outstanding performance quality, stage presence and physical fitness.  If this is not
              an accurate representation of your dance performance abilities and fitness level, then
              for the purpose of this site, you may wish to categorize yourself a
              <Typography className={classes.boldText}>
                {" Vocalist, Actor or Aerialist Who Moves "}
              </Typography>
              and complete the Movement Combination.
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              If proceeding as a Vocalist, Actor or Aerialist Who Dances, there are multiple dance
              style categories.  In each dance style for which you wish to audition, you will create
              and upload two Dance Audition Videos: 1) a two-minute Dance Demonstration Video and,
              2) a Dance Combination Video that is provided by ShipTalent.com.
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              For the Dance Demonstration Video, use your own music and choreography to create a
              Dance Audition Video that accurately showcases your proficiency in the dance style.
              The Dance Demonstration Video should be no longer than two minutes and must be created
              exclusively for your ShipTalent.com Profile.  Past performance footage may not be used
              as a Dance Demonstration Video except where allowed and specifically indicated within
              the Instructions of select Dance Video sections.
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              {` The proprietary ShipTalent.com Dance Combination Video is a `}
              <Typography className={classes.boldUnderlineText}>
                {`timed event`}
              </Typography>
              {` and instructions must be followed very closely in order to complete the Dance Combination
              Video correctly. Be sure to read the detailed instructions located in the Dance Combination
              Video section of every dance style.`}
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              You are not required to create and upload Dance Audition Videos in every dance style; only
              create and upload Dance Audition Videos for the dance style(s) in which you are most
              proficient and simply check the opt out box for the dance style(s) in which you will not
              be uploading any Dance Audition Videos.
            </Typography>
            <br/>
            <br/>
            <Typography className={classes.descriptionText}>
              Unless specifically showcasing partner work (adagio, lifts or ballroom), all Dance Audition
              Video performances should be solo and the zoom level should be tight enough to see the
              dancer’s full body and facial expressions at all times.
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              Personality matters. Smile and sell it!
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              Be sure to trim the beginning and ending of each Audition Video so that there is no
              “dead space” before or after your performance. If you’re using your smartphone camera,
              always remember to shoot in
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
