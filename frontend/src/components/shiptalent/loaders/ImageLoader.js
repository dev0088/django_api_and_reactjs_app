import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ImageLoader from 'react-loading-image';
import ImageLightbox from 'react-image-lightbox';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles';


class ShipTalentImageLoader extends React.Component {

  state = {
    openImageModal: false,
  };

  showImage = () => {
    this.setState({ openImageModal: true })
  };

  renderImageLoader = () => {
    const { src, imageClassName } = this.props;
    return (
      <ImageLoader
        src={src}
        className={imageClassName}
        loading={() => <img src={require('images/missing.png')} className={imageClassName} />}
        error={() => <img src={require('images/missing.png')} className={imageClassName} />}
      />
    );
  };

  renderWithLink = () => {
    const { link, containerClass } = this.props;

    return (
      <Link to={link} className={containerClass} >
        { this.renderImageLoader() }
      </Link>
    )
  };

  renderWithoutLink = () => {
    const { src, containerClass } = this.props;
    const { openImageModal } = this.state;

    return (
      <div onClick={() => this.showImage()} key={`shiptalent-image-loader`}
           className={ containerClass ? containerClass : "profile-picture-container-div"}
      >
        { this.renderImageLoader() }
        {openImageModal && (
          <ImageLightbox
            mainSrc={src}
            onCloseRequest={() => this.setState({ openImageModal: false })}
          />
        )}
      </div>
    );
  }

  render() {
    const { link } = this.props;

    if (link) return this.renderWithLink();

    return this.renderWithoutLink();
  }
}

export default (withStyles(styles)(ShipTalentImageLoader));