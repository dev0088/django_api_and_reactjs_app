import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from 'components/shiptalent/dialogs/AlertDialog';
import TextField from '@material-ui/core/TextField';
import { adminStyles } from 'styles';


class ConfirmRejectPictureDialog extends React.Component {

  state = {
    comment: ''
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { open, onCancel, onOK, classes } = this.props;
    return (
      <AlertDialog
        open={open}
        onCancel={onCancel}
        onOK={() => onOK(this.state.comment)}
        title={'Are you sure to reject this picture?'}
        description={'This picture will be deleted. Please add comments and resason why picture was rejected.'}
      >
        <TextField
          autoFocus
          id="outlined-bare"
          label="Comment"
          className={classes.textField}
          margin="dense"
          variant="outlined"
          rows={3}
          rowsMax={3}
          multiline
          value={this.state.comment}
          onChange={this.handleChange('comment')}
          fullWidth
        />
      </AlertDialog>
    );
  }
}

export default withStyles(adminStyles)(ConfirmRejectPictureDialog);
