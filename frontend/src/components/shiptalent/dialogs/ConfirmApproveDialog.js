import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from 'components/shiptalent/dialogs/AlertDialog';
import { adminStyles } from 'styles';


class ConfirmApproveDialog extends React.Component  {
  render() {
    const { open, onCancel, onOK, title, description } = this.props;
    return (
      <AlertDialog
        open={open}
        onCancel={onCancel}
        onOK={onOK}
        title={title}
        description={description}
      />
    );
  }
}

export default withStyles(adminStyles)(ConfirmApproveDialog);
