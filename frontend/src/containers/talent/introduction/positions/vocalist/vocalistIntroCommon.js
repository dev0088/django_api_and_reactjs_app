import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles';

class VocalistIntroCommon extends Component {

  render() {
    const { classes } = this.props;
    let requiredName = this.props.requiredName ? this.props.requiredName : 'ALL Vocalists'

    return (
      <div>
        <Typography className={classes.descriptionText}>
          Each vocal style category includes a link to download the sheet music, reference track and
          accompaniment track for multiple songs.  Pick your favorite TWO songs within each category
          for which you are vocally proficient, download the audition materials for each and
          practice both songs.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          When ready, use the provided accompaniment track to create videos of you performing each
          song individually; upload each video to your Profile.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          You are not required to create and upload Vocal Audition Videos in every musical style; only
          create and upload Vocal Audition Videos for the musical style(s) in which you are vocally
          proficient and simply check the opt out box for the musical style(s) in which you will not be
          uploading any Vocal Audition Videos.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          Do not use any editing programs (like Auto-Tune) or alter your live performance in any way,
          whether digital or mechanical.  A minimal amount of reverb may be used, if you wish,
          but is not required.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          The music for “My Best 16 Bars” and “My Next Best 16 Bars” are your choice entirely.
          Using your own music, create Vocal Audition Videos for these two sections that really
          shows casting directors and hiring managers what you can do!
          Remember, though…sing only 16 Bars.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          The
          <Typography className={classes.descriptionStrongRed}>
            {" RANGE CHECK "}
          </Typography>
          is
          <Typography className={classes.descriptionItalicRed}>
            {" required "}
          </Typography>
          {`for ${requiredName}. Simply follow the instructions in the Range Check section, download the
          reference track and accompaniment track, and then use the accompaniment track to create
          and upload a Vocal Audition Video that shows your full range.`}
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          The
          <Typography className={classes.descriptionStrongRed}>
            {" HARMONIZATION CHECK "}
          </Typography>
          is
          <Typography className={classes.descriptionItalicRed}>
            {" required "}
          </Typography>
          {`for ${requiredName}. Simply follow the instructions in the Harmonization Check section,
          download the sheet music, reference track and accompaniment track, and then use the
          accompaniment track to create and upload a Vocal Audition Video that shows how well
          you harmonize with other vocalists.`}
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          All Vocal Audition Video performances should be solo and the zoom level should be tight
          enough to see the Vocalist’s full body and facial expressions.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          Personality matters. Smile and sell it!
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          Be sure to trim the beginning and ending of each Audition Video so that there is no
          “dead space” before or after your performance. And if you’re using your smartphone
          camera, always remember to shoot in
          <Typography className={classes.boldText}>
            {" Landscape Orientation"}
          </Typography>
          {". "}
          <Link to="?">
            <Typography color="primary" className={classes.boldUnderlineText}>
              What is Landscape Orientation?
            </Typography>
          </Link>
        </Typography>
        <br/>
      </div>
    )
  }
}


export default withStyles(styles)(VocalistIntroCommon);
