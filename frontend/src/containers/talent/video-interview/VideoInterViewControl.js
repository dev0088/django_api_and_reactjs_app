import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Webcam from 'react-webcam';
import AudioMeter from "components/general/audio-meter/index";
import styles from 'styles';


class VideoInterViewControl extends Component {

  render() {
    const { width, height, audioMeterWidth } = this.props;
    return (
      <Grid container spacing={0} direction="column" justify="center" alignItems="center">
        <Grid item lg={12} md={12} xs={12}>
          <Webcam height={height} width={width}/>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <div className="audio-box">
            <AudioMeter width={audioMeterWidth}/>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(VideoInterViewControl);