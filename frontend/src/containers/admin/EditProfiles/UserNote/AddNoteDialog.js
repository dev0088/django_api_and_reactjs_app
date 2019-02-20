import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AlertDialog from 'components/shiptalent/dialogs/AlertDialog';
import { adminStyles } from 'styles';


class AddNoteDialog extends React.Component  {
  state = {
    note: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { open, onCancel, onOK, classes } = this.props;
    const { note } = this.state;
    return (
      <AlertDialog
        open={open}
        onCancel={onCancel}
        onOK={() => onOK (note)}
        title={'Add Note'}
        description={'Please add description.'}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <TextField
          autoFocus
          className={classes.textField}
          margin="normal"
          variant="outlined"
          rows={8}
          rowsMax={8}
          fullWidth
          value={note}
          onChange={this.handleChange('note')}
        />
      </AlertDialog>
    );
  }
}

export default withStyles(adminStyles)(AddNoteDialog);
