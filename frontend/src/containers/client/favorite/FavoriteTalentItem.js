import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ClearRounded from '@material-ui/icons/ClearRounded';
import TalentItem from '../find_talent/talentItem';
import ClientAPI from 'apis/clientAPIs';
import styles, {themeClientSpecialActionButton} from 'styles';


class FavoriteTalentItem extends Component {

  removeFavorite = (favoriteId) => {
    ClientAPI.removeFavorite(favoriteId, this.handleRemoveFavoriteResponse);
  };
  
  handleRemoveFavoriteResponse = (response, isFailed) => {
    if(isFailed) {

    } else {
      const { onRemoveFavorite } = this.props;
      if(onRemoveFavorite) onRemoveFavorite(this.props.favorite.id);
    }
  };

  render() {
    const { favorite, classes } = this.props;
    const talent = favorite.talent;

    if (favorite && talent) {
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
                    onClick={() => this.removeFavorite(favorite.id)}
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

export default withStyles(styles)(FavoriteTalentItem);