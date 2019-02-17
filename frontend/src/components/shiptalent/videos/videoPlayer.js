import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from 'styles';


class VideoPlayer extends Component {
  render() {
    const { title, url, classes } = this.props;
    console.log('===== VideoPlayer: title: ', title);
    return (
      <Grid container spacing={16} justify="center" alignItems="center">
        {title && (
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <Typography className={classNames(classes.clientFormSubTitle, classes.centerText)} >
              {title}
            </Typography>
          </Grid>
        )}
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <ReactPlayer
            url={url}
            className={url ? classes.clientVideoPlayer : classes.clientEmptyVideoPlayer}
            width={'480px'}
            height={'270px'}
            controls={true}
            light
          />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(VideoPlayer);