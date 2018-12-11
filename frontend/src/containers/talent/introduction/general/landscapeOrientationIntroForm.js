import React, {Component} from 'react';
import ImageLoader from 'react-loading-image';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Panel from 'components/general/panel';
import styles from 'styles';

class LandscapeOrientationForm extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <Typography className={classes.descriptionText}>
              Cruise line casting directors and hiring managers are interested in seeing how polished
              you are as a person and performer, not how polished your video skills are.  Your videos
              do not have to be of professional quality; simple homemade/smartphone videos are fine.
            </Typography>
            <br/>
            <Typography className={classes.descriptionText}>
              However, if using your smartphone camera to shoot your audition videos, be certain to hold
              your phone in
              <Typography className={classes.boldText}>
                {` landscape orientation `}
              </Typography>
              and not in portrait orientation.
            </Typography>
            <br/>
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1} />
          <Grid item lg={12} md={12} sm={12} xs={12} style={{textAlign: 'center'}}>
            <ImageLoader
              src={require('images/phones.png')}
              loading={() => <div className={classes.talentProfileVideoGreetingImage}>Loading...</div>}
              error={() => <div>Error</div>}
            />
          </Grid>
        </Grid>
      </Panel>
    )
  }
}


export default withStyles(styles)(LandscapeOrientationForm);
