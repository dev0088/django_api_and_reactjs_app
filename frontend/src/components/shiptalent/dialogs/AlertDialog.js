import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onOK} variant="outlined" color="primary">
            OK
          </Button>
          <Button onClick={this.props.onCancel} variant="outlined" color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AlertDialog;