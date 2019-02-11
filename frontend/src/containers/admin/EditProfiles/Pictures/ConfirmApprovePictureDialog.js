import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from 'components/shiptalent/dialogs/AlertDialog';
import { adminStyles } from 'styles';


class ConfirmApprovePictureDialog extends React.Component  {
  render() {
    const { open, onCancel, onOK } = this.props;
    return (
      <AlertDialog
        open={open}
        onCancel={onCancel}
        onOK={onOK}
        title={'Are you sure to approve this picture?'}
        description={'Clients will be able to show this picture of talent.'}
      />
    );
  }
}

export default withStyles(adminStyles)(ConfirmApprovePictureDialog);
