import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  render() {
    const { 
      fullWidth, maxWidth, 
      title, description,
      open, onOK, onCancel, 
      children 
    } = this.props;

    return (
      <Dialog
        fullWidth={fullWidth ? fullWidth : false}
        maxWidth={maxWidth ? maxWidth : 'xs'}
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
          {children && children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onOK} variant="outlined" color="primary">
            OK
          </Button>
          <Button onClick={onCancel} variant="outlined" color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AlertDialog;