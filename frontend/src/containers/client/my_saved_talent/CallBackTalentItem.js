import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import ClearRounded from '@material-ui/icons/ClearRounded';
import TalentItem from '../find_talent/talentItem';
import ClientAPI from 'apis/clientAPIs';
import styles, {themeClientSpecialActionButton} from 'styles';


class CallBackTalentItem extends Component {

  removeCallBack = (callbackId) => {
    ClientAPI.removeCallBack(callbackId, this.handleRemoveCallBackResponse);
  };
  
  handleRemoveCallBackResponse = (response, isFailed) => {
    if(isFailed) {

    } else {
      const { onRemoveCallback } = this.props;
      if(onRemoveCallback) onRemoveCallback(this.props.callback.id);
    }
  };

  render() {
    const { callback, classes } = this.props;
    const talent = callback.talent;

    if (callback && talent) {
      return (
        <Grid container spacing={8} justify="center" alignItems="center">
          <Grid item xs={12} >
            <div className={classes.clientCallbackTalentControlContainerDiv}>
              <MuiThemeProvider theme={themeClientSpecialActionButton}>
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    aria-label="remove"
                    className={classes.clientTalentControlDeleteButton}
                    onClick={() => this.removeCallBack(callback.id)}
                  >
                    <ClearRounded className={classes.clientTalentControlDeleteIcon}/>
                  </Button>
                </div>
              </MuiThemeProvider>
            </div>
            <div className={classes.clientTalentContainerDiv}>
              <TalentItem talent={talent} />
            </div>
          </Grid>
        </Grid>
      );
    }

    return <div/>
  }
}

export default withStyles(styles)(CallBackTalentItem);