import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { adminStyles } from 'styles';

const ConfirmProfileApprovedDialog = (props) => {
  return (
		<Dialog
			maxWidth='md'
			open={props.open}
			onClose={props.onClickNewProfiles}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"PROFILE APPROVED"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					This profile was approved.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" size="medium" color="primary" 
					onClick={props.onClickNewProfiles} className={props.classes.adminConfirmButton}
				>
					New Profiles
				</Button>
				<Button variant="contained" size="medium" color="primary" 
					onClick={props.onClickAgentDashboard} className={props.classes.adminConfirmButton}
				>
					Agent Dashboard
				</Button>
			</DialogActions>
		</Dialog>
  );
}

export default withStyles(adminStyles)(ConfirmProfileApprovedDialog);
