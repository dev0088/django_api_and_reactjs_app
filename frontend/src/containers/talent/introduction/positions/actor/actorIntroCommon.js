import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles';

class ActorIntroCommon extends Component {

  render() {
    const { classes, childNodes } = this.props;

    let landscapeOrientationLink = {
      pathname: '/talent/video-audition/landscape-orientation',
      state: {
        position: null,
        previousFormTitle: this.props.formTitle
      }
    };

    return (
      <div>
        <Typography className={classes.descriptionText}>
          To showcase your acting abilities, you must create and upload two separate Monologue Videos.
          In the My Monologues section, there is a link to 10 scripts. Pick and download your favorite
          TWO scripts and memorize them both.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          {`When ready, create videos of you performing each monologue individually, `}
          <Typography className={classes.underlineText}>
            {`off book`}
          </Typography>
          , and then upload each video to your Profile.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          The zoom level of your Monologue Videos should be tight enough to see your full body and facial
          expressions.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          {`In addition to the ShipTalent.com-provided monologues, you may upload up to two other acting
          excerpt videos of your choice, if you wish.  These are optional. Excerpts should be no longer
          than three minutes each and can be `}
          <Typography className={classes.underlineText}>
            {`recent`}
          </Typography>
          {` performance footage or a video that you create exclusively for your ShipTalent.com profile.
          If you are presenting ensemble footage, it must be CURRENT and please clearly indicate or
          highlight yourself in the video`}
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          {`If you have a `}
          <Typography className={classes.underlineText}>
            {`current`}
          </Typography>
          {` Sizzle Reel, this may be uploaded to your Profile, too.`}
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          Be sure to trim the beginning and ending of each Audition Video so that there is no
          “dead space” before or after your performance.  If you’re using your smartphone camera,
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
        { childNodes && childNodes }
      </div>
    )
  }
}


export default withStyles(styles)(ActorIntroCommon);
