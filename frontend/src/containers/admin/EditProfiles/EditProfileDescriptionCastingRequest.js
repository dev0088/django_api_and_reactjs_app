import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { adminStyles } from 'styles';


class EditProfileDescriptionCastingRequest extends React.Component  {
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
                {'When Talent is included in an active '}
                <Typography className={[classes.adminEditProfileDescriptionText, classes.bold, classes.inlineText]}>
                    {'Casting Request'}
                </Typography>
                {', '}
            </Typography>
            <br></br>
            <Typography className={[classes.adminEditProfileDescriptionText, classes.inlineText]}>
                {'Talent name turns to '}
                <Typography className={[classes.adminEditProfileDescriptionText, classes.bold, classes.inlineText]}>
                    Status Color
                </Typography>
                {' (per active '}
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
                                    src={require('assets/img/casting_status_colors.png')} 
                                    alt='new_profile_for_approval'
                                    className={classes.adminNewProfilesApprovalImage}
                                />
                            }
                        >
                            <Typography
                                className={[classes.adminEditProfileDescriptionText, classes.bold, classes.inlineText, classes.adminEditProfileDescriptionTextWithTooltip]}
                                onClick={this.handleTooltipOpen}
                            >
                                {'Casting Request'}
                            </Typography>
                        </Tooltip>
                    </div>
                </ClickAwayListener>
                {' Status)'}
            </Typography>
        </div>
    );
  }
}

export default withStyles(adminStyles)(EditProfileDescriptionCastingRequest);
