import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { adminStyles } from 'styles';


class EditProfileDescription extends React.Component  {
  state = {
    openTalentID: false
  };

  handleTooltipClose = () => {
    this.setState({ openTalentID: false });
  };

  handleTooltipOpen = () => {
    this.setState({ openTalentID: true });
  };

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.adminEditProfileDescriptionContainer}>
            <Typography className={[classes.adminEditProfileDescriptionText, classes.inlineText]}>
                {'All of these Talent have made edits and changes to their '}
                <Typography className={[classes.adminEditProfileDescriptionText, classes.bold, classes.inlineText]}>
                    {'Profile'}
                </Typography>
                {'. These changes must be reviewed and approved by the '}
                <Typography className={[classes.adminEditProfileDescriptionText, classes.bold, classes.inlineText]}>
                    {'Agent'}
                </Typography>
                {' before changes and edits go live and can be viewed by the '}  
                <Typography className={[classes.adminEditProfileDescriptionText, classes.bold, classes.inlineText]}>
                    {'Client'}
                </Typography>
                {'.'}
            </Typography>
            <br></br>
            <br></br>
            <Typography className={[classes.adminEditProfileDescriptionText, classes.inlineText, classes.centerText]}>
                {'Each box includes '}
                <Typography className={[classes.adminEditProfileDescriptionText, classes.bold, classes.inlineText]}>
                    Name
                </Typography>
                {' and '}
                <ClickAwayListener onClickAway={this.handleTooltipClose}>
                    <div className={classes.inlineText}>
                        <Tooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={this.handleTooltipClose}
                            open={this.state.openTalentID}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            classes={{tooltip: classes.adminEditProfileDescriptionTextTooltipContainer}}
                            title={
                                <img 
                                    src={require('assets/img/new_profile_for_approval.png')} 
                                    alt='new_profile_for_approval'
                                    className={classes.adminNewProfilesApprovalImage}
                                />
                            }
                        >
                            <Typography
                                className={[classes.adminEditProfileDescriptionText, classes.bold, classes.inlineText, classes.adminEditProfileDescriptionTextWithTooltip]}
                                onClick={this.handleTooltipOpen}
                            >
                                {'Talent ID#'}
                            </Typography>
                        </Tooltip>
                    </div>
                </ClickAwayListener>
                <br></br>
                (only called-out box active for demo)
            </Typography>
        </div>
    );
  }
}

export default withStyles(adminStyles)(EditProfileDescription);
