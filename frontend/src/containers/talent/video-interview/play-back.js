import React from 'react'
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from 'styles';


class VideoPlayBack extends React.Component {

  render() {
    const { 
      url, currentQuestion, positionType, classes, 
      onSettings, onNext
    } = this.props;

    return (
      <Grid container spacing={24}>
      { url &&
        <Grid item xs={12} >
          <Grid container spacing={8} direction="column" justify="center" alignItems="center">
            <Grid item lg={6} md={8} xs={12} >
              <ReactPlayer url={url} className={'react-player'} 
                width={'100%'} height={'100%'} 
                playing={false} controls={true}
              />
            </Grid>
          </Grid>
        </Grid>
      }
        
        <Grid item lg={5} md={4} xs={2} />
        <Grid item lg={2} md={4} xs={8} >
          <Grid container spacing={16} justify="center" alignItems="center">
            <Grid item xs={12} >
              <Button variant="contained" size="large" fullWidth 
                color="primary" className={classes.generalButtonClass} 
                onClick={() => onSettings()}
              >
                <Typography className={classes.talentProfileGuideButtonTitle}>
                  Adjust Video and Audio Settings
                </Typography>
              </Button>
            </Grid>

            <Grid item xs={12} >
              <Button variant="contained" size="large" fullWidth 
                color="primary" className={classes.generalButtonClass} 
                onClick={() => onNext()} disabled={currentQuestion >= 4}
              >
                <Typography className={classes.talentProfileGuideButtonTitle}>
                  Next Practice Question
                </Typography>
              </Button>
            </Grid>
            
            <Grid item xs={12} >
              <Link to={{pathname: "/interview-instruction-live", state: {positionType: positionType}}}>
                <Button variant="contained" size="large" fullWidth 
                  color="secondary" className={classes.generalButtonClass}
                >
                  <Typography className={classes.talentProfileGuideButtonTitle}>
                    Let's Go Live!
                  </Typography>
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12} >
              <Link to={"/edit-profile"}>
                <Button variant="contained" size="large" fullWidth 
                  color="primary" className={classes.generalButtonClass}
                >
                  <Typography className={classes.talentProfileGuideButtonTitle}>
                    I’m Not Ready. Take Me Back to My Cruise Staff Audition Videos
                  </Typography>
                </Button>
              </Link>
            </Grid>
          
          </Grid>
        </Grid>
        <Grid item lg={5} md={4} xs={2} />
      </Grid>
    );
  }
}

export default withStyles(styles)(VideoPlayBack);