import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import ShipTalentImageLoader from '../loaders/ImageLoader';
import styles from 'styles';


class TalentPicture extends Component {

  render() {
    const { caption, pictures } = this.props;

    let picture = pictures.find(function(picture) {
      return (picture.caption === caption);
    });

    return (
      <ShipTalentImageLoader
        src={picture ? picture.url : ''}
        containerClass={"profile-picture-container-div"}
        imageClassName={"profile-picture-size"}
        key={`${(picture && picture.id) ? picture.id : 'tp'}`}
      />
    );
  }

}

export default withStyles(styles)(TalentPicture);