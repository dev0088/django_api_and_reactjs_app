import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import FavoriteTalentTable from './FavoriteTalentTable';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles';


class MyFavorite extends Component {

  state = {
    favorites: []
  };

  componentWillMount() {
    ClientAPI.getAllFavorites(this.handleAllFavoritesResponse);
  }

  handleAllFavoritesResponse = (response, isFailed) => {
    console.log('==== handleAllFavoritesResponse: response: ', response);
    if(isFailed) {

    } else {
      this.setState({favorites: response});
    }
  };

  onRemoveFavorite = (favoriteId) => {
    const { favorites } = this.state;
    let newFavorites = favorites;
    let index = favorites.findIndex(favorite => {
      return favorite.id === favoriteId;
    });

    newFavorites.splice(index, 1);
    this.setState({favorites: newFavorites});
  };

  render() {
    return(
      <ClientForm
        formTitle="My Favorites"
        nextLink="/client/mytalent/saved"
        nextButtonTitle="Back to My Saved Talent"
      >
        <Grid container spacing={40} direction="column" justify="center" alignItems="center">
          <Panel>
            <FavoriteTalentTable
              favorites={this.state.favorites}
              onRemoveFavorite={this.onRemoveFavorite}
            />
          </Panel>
        </Grid>
      </ClientForm>
    );
  }
}


export default withStyles(styles)(MyFavorite);