import React, {Component} from 'react';
import Modal from '@material-ui/core/Modal';
import ReactPlayer from 'react-player';


const style = {
  width: '60%',
  height: '70%',
  left: '20%',
  top: '15%'
}

class VideoViewModal extends Component {
  render() {
    const { url, open, onClose } = this.props
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
        style={style}
      >
        <ReactPlayer
          url={url}
          className='react-player'
          width={'100%'}
          height={'100%'}
          controls={true}
        />
      </Modal>
    )
  }
}

export default VideoViewModal;