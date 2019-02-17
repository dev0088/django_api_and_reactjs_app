import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ApprovedStatus from 'containers/admin/EditProfiles/ApprovedStatus';
import { adminStyles } from 'styles';

const videoUploadedImage=require('assets/img/video_uploaded.png');
const emptyVideoImage = require('assets/img/empty_video.png');


class OverviewVideo extends Component {

  render() {
    const {caption, video, link, showStatus, showCaption } = this.props;
    return (
      <Grid container spacing={8} direction="column" justify="center" alignItems="center">
        { showCaption && 
          <Grid item xs={12}>
            {caption}
          </Grid>
        }
        <Grid item xs={12}>
          <Link to={link}>
            <img src={video ? videoUploadedImage : emptyVideoImage } alt="video" />
          </Link>
        </Grid>
        { showStatus && 
          <Grid item xs={12}>
            <ApprovedStatus isApproved={video && video.approved} />
          </Grid>
        }
      </Grid>
    );
  }
}

export default withStyles(adminStyles)(OverviewVideo);