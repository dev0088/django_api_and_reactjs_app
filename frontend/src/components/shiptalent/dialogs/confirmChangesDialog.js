/*
 * Filename: panel.js
 * Responsible all cmponent with headding
 * and child components
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmChangesDialog = (props) => {
  return (
		<Dialog
			open={props.open}
			onClose={props.onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"Would you like to save your changes?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					If you want to save your changes, please click "Save" button.
					If not, please click "Cancel" button.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose} color="primary" autoFocus>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
  );
}

export default ConfirmChangesDialog;
