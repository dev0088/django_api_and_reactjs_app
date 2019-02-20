import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AlertDialog from 'components/shiptalent/dialogs/AlertDialog';
import { adminStyles } from 'styles';


class ChangeTidDialog extends React.Component  {
  state = {
    tid: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { open, onCancel, onOK, previousTid, classes } = this.props;
    const { tid } = this.state;
    return (
      <AlertDialog
        open={open}
        onCancel={onCancel}
        onOK={() => onOK (tid)}
        title={'Change TID'}
        description={`You can change TID of this talent: ${previousTid}. Please enter new TID you want.`}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <TextField
          autoFocus
          className={classes.textField}
          margin="normal"
          variant="outlined"
          rows={8}
          rowsMax={8}
          fullWidth
          value={tid}
          onChange={this.handleChange('tid')}
        />
      </AlertDialog>
    );
  }
}

export default withStyles(adminStyles)(ChangeTidDialog);
