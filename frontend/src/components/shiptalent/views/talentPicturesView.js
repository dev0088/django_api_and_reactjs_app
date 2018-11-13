import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from 'styles';

class TalentPicturesView extends Component {

  showImage = (url) => {
    this.setState({
      openImageModal: true,
      currentImageUrl: url
    })
  };

  renderPictureView(caption) {
    const { talentInfo } = this.props
    const { talent_pictures } = talentInfo

    let picture = talent_pictures.find(function(picture) {
      return (picture.caption === caption);
    });

    return (
      <Grid item xl={4} lg={4} md={3} sm={2} xs={1}>
        {(picture && picture.url && picture.uploaded && picture.active) ? (
          <div onClick={() => this.showImage(picture.url)} 	className="profile-picture-container-div">
            <ImageLoader
              src={picture.url}
              className="profile-picture-size"
              loading={() => <div className="profile-picture-size">Loading...</div>}
              error={() => <div>Error</div>} />
          </div>
        ) : (
          <div className="profile-picture-container-div">
            <ImageLoader
              src={require('images/missing.png')}
              className="profile-picture-size"
              loading={() => <div className="profile-picture-size">Loading...</div>}
              error={() => <div>Error</div>} />
          </div>
        )}
      </Grid>
    )
  }

  render() {
    const { talentInfo, classes } = this.props;
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography className="profile-picture-name">{"Pictures"}</Typography>
          </Grid>
          <Grid item xl={4} lg={4} md={3} sm={2} xs={1}>
            { this.renderPictureView("My Current Headshot") }
          </Grid>
          <Grid item xl={4} lg={4} md={3} sm={2} xs={1}>
            { this.renderPictureView("My Current Headshot") }
          </Grid>
          <Grid item xl={4} lg={4} md={3} sm={2} xs={1}>
            { this.renderPictureView("My Current Headshot") }
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default (withStyles(styles)(TalentPicturesView));
