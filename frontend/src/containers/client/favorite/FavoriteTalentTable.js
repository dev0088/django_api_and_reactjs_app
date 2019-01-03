import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FavoriteTalentItem from './FavoriteTalentItem';
import styles from 'styles';


class FavoriteTalentTable extends Component {

  render() {
    const { favorites, onRemoveFavorite } = this.props;

    return (
      <Grid container spacing={24}>
        {(favorites && favorites.length > 0) ? (
          favorites.map((favorite, index) => {
            return (
              <Grid item xs={12} key={index}>
                <FavoriteTalentItem
                  favorite={favorite}
                  onRemoveFavorite={onRemoveFavorite}
                />
              </Grid>)
          })
        ) : (<Grid item xs={12} />)}
      </Grid>
    )
  }
}

export default withStyles(styles)(FavoriteTalentTable);