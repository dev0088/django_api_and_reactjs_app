import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StarTwoTon from '@material-ui/icons/StarTwoTone';
import styles from 'styles';


class ClientTalentMarkWithStar extends Component {
  render() {
    const { talent, enableAddFavorite, classes } = this.props;

    return (
        <div className={classes.clientFromTalentIDContainer}>
          <Grid container spacing={8} direction="column" justify="flex-start" alignItems="center">
            <Grid item xs={12}>
              <Typography align="center" className={classes.clientFromTalentIDText} >
                {`Talent ID: ${talent.tid}`}
              </Typography>
            </Grid>
            {enableAddFavorite &&
              <Grid item xs={12}>
                <img
                  src={require("images/favorite_star.png")}
                  alt="Star"
                  width="40px"
                />
              </Grid>
            }
            {enableAddFavorite &&
              <Typography align="center" className={classes.clientFromTalentMarkFavoriteText} >
                {`Add to Favorites`}
              </Typography>
            }
          </Grid>
        </div>
    )
  }
}

export default (withStyles(styles)(ClientTalentMarkWithStar));
