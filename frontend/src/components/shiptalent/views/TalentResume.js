import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ShipTalentImageLoader from '../loaders/ImageLoader';
import apiConfig from 'constants/api';
import styles from 'styles';


class TalentResume extends Component {

  render() {
    const { resume } = this.props;

    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography className="profile-picture-name">{"Resume / CV"}</Typography>
        </Grid>
        <Grid item xs={12}>
          {
            (resume && resume[0] && resume[0].preview_path) ? (
              <ShipTalentImageLoader
                src={`${apiConfig.server}/${resume[0].preview_path}`}
                containerClass={"profile-picture-container-div"}
                imageClassName={"profile-resume-image-viewer"}
                key={`${(resume && resume.id) ? resume.id : 'tr'}`}
              />
            ) : (
              <div>None</div>
            )
          }
        </Grid>
      </Grid>
    )
  }

}

export default withStyles(styles)(TalentResume);