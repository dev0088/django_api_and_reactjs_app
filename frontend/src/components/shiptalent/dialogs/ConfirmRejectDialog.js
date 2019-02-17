import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from 'components/shiptalent/dialogs/AlertDialog';
import TextField from '@material-ui/core/TextField';
import { adminStyles } from 'styles';


class ConfirmRejectDialog extends React.Component {

  state = {
    comment: ''
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { open, onCancel, onOK, title, descriptioin, classes } = this.props;
    return (
      <AlertDialog
        open={open}
        onCancel={onCancel}
        onOK={() => onOK(this.state.comment)}
        title={title}
        description={descriptioin}
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

export default withStyles(adminStyles)(ConfirmRejectDialog);
