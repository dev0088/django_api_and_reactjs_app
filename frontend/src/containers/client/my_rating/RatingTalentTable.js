import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RatingTalentItem from './RatingTalentItem';
import styles from 'styles';


class RatingTalentTable extends Component {

  render() {
    const { castingRequestTalents } = this.props;

    return (
      <Grid container spacing={24}>
        {(castingRequestTalents && castingRequestTalents.length > 0) ? (
          castingRequestTalents.map((castingRequestTalent, index) => {
            return (
              <Grid item xs={12} key={index}>
                <RatingTalentItem
                  castingRequestTalent={castingRequestTalent}
                />
              </Grid>)
          })
        ) : (<Grid item xs={12} />)}
      </Grid>
    )
  }
}

export default withStyles(styles)(RatingTalentTable);