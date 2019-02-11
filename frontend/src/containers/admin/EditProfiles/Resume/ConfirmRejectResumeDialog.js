import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from 'components/shiptalent/dialogs/AlertDialog';
import { adminStyles } from 'styles';


class ConfirmRejectResumeDialog extends React.Component  {
  render() {
    const { open, onCancel, onOK } = this.props;
    return (
      <AlertDialog
        open={open}
        onCancel={onCancel}
        onOK={onOK}
        title={'Are you sure to reject this resume?'}
        description={'This resume will be deleted. Please add comments and resason why picture was rejected.'}
      />
    );
  }
}

export default withStyles(adminStyles)(ConfirmRejectResumeDialog);
