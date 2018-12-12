import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles';

class AerialistIntroCommon extends Component {

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
          There are four Aerial Audition Video sections to showcase your aerialist abilities:
          1) My Aerial Videos, 2) My Excerpt Videos, 3) My Current Sizzle Reel, and 4) My Special
          Skills Video. You may upload videos in any or all of these sections.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          In Section 1 (My Aerial Videos), you may create and upload to your Profile up to four videos
          that demonstrate your proficiency in multiple aerial disciplines (trapeze, hoop, web, silk,
          straps, etc.).  These videos may be created with or without music – it’s your choice. Each
          video must not exceed three minutes in length and the zoom level of your Aerial Videos should
          be tight enough to see your full body and facial expressions.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          In Section 2 (My Excerpt Videos), you may upload to your Profile up to two current performance
          excerpts. If you are presenting ensemble footage, please be sure to clearly indicate or highlight
          which aerialist is you in the video. Each video must not exceed three minutes in length.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          In Section 3 (My Sizzle Reel), you may upload your current Sizzle Reel, if you have one. This
          video must not exceed three minutes.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          In Section 4 (My Special Skills Video), follow the instructions that are included in this section.
        </Typography>
        <br/>
        <Typography className={classes.descriptionText}>
          In Section 4 (My Special Skills Video), follow the instructions that are included in this section.
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


export default withStyles(styles)(AerialistIntroCommon);
