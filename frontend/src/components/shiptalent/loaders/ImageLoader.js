import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ImageLoader from 'react-loading-image';
import ImageLightbox from 'react-image-lightbox';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from 'styles';


class ShipTalentImageLoader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openImageModal: false,
    }
  }

  showImage = () => {
    this.setState({ openImageModal: true })
  };

  render() {
    const { src, className, containerClass } = this.props;
    const { openImageModal } = this.state;

    return (
      <div onClick={() => this.showImage()} key={`shiptalent-image-loader`}
           className={ containerClass ? containerClass : "profile-picture-container-div"}
      >
        <ImageLoader
          src={src}
          className={className}
          loading={() => <img src={require('images/missing.png')} className={className} />}
          error={() => <img src={require('images/missing.png')} className={className} />}
        />
        {openImageModal && (
          <ImageLightbox
            mainSrc={src}
            onCloseRequest={() => this.setState({ openImageModal: false })}
          />
        )}
      </div>
    );
  }
}

export default (withStyles(styles)(ShipTalentImageLoader));