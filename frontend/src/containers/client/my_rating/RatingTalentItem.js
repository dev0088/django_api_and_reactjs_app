import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TalentItem from '../find_talent/talentItem';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles';


class RatingTalentItem extends Component {

  onRating = (castingRequestTalentId) => {
    ClientAPI.onRating(castingRequestTalentId, this.handleOnRatingResponse);
  };
  
  handleOnRatingResponse = (response, isFailed) => {
    if(isFailed) {

    } else {
      const { onOnRating } = this.props;
      if(onOnRating) onOnRating(this.props.castingRequestTalent.id);
    }
  };

  render() {
    const { castingRequestTalent, classes } = this.props;
    const talent = castingRequestTalent.talent;

    if (castingRequestTalent && talent) {
      return (
        <Grid container spacing={8} justify="center" alignItems="center">
          <Grid item xs={12} >
            <div className={classes.clientRatingTalentControlContainerDiv}>
              <div>
                <Link
                  to={{
                    pathname: "/client/rating_comment",
                    state: { castingRequestTalent }
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    aria-label="remove"
                    className={classes.clientTalentControlRatingButton}
                  >
                    <Typography className={[classes.clientTalentControlRatingButtonText]}>
                      rate
                    </Typography>
                  </Button>
                </Link>
              </div>
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

export default withStyles(styles)(RatingTalentItem);