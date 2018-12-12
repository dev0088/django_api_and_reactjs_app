import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles';

class MusicianIntroCommon extends Component {

  render() {
    const { classes } = this.props;
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
          ShipTalent.com currently supports the following categories:
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          <ul className={classes.descriptionUl}>
            <li>
              Solo musicians (e.g, pianists, guitarists, singing pianists, singing guitarist, harpists,
              violinists, cellists, accordion players, etc.)
            </li>
            <li>
              Duos (e.g., pop and rock, jazz, classical, strolling, etc.)
            </li>
            <li>
              Trios (e.g., pop and rock, jazz, classical, strolling, etc.)
            </li>
            <li>
              Quartets (e.g., pop and rock, jazz, classical, strolling, etc.)
            </li>
            <li>
              Bands – four or more musicians (e.g., pop and rock, jazz, classical, folk, tribute, etc.)
            </li>
          </ul>
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          Sorry, showband musicians are not supported at this time.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          To showcase your musical abilities, create and upload up to four Musician Audition Videos that
          give casting directors and hiring managers an accurate representation of your talent and diversity.
          If your band can be split into various configurations (solo, duo or trio), you may upload Musician
          Audition Videos in multiple categories.
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
          {`Videos should be no more than three minutes each.  You may use performance excerpts video, if you
          wish, as long as the footage is `}
          <Typography className={classes.underlineText}>
          recent
          </Typography>
          {` and, again, no longer than three minutes.`}
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          {`If you have a `}
          <Typography className={classes.underlineText}>
            current
          </Typography>
          {` Sizzle Reel, this may be uploaded to your Profile, too.`}
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
          <Link to={landscapeOrientationLink}>
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


export default withStyles(styles)(MusicianIntroCommon);
