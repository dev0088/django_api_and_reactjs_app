import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SharedTalentItem from './SharedTalentItem';
import styles from 'styles';


class SharedTalentTable extends Component {

  render() {
    const { sharedProfiles } = this.props;

    return (
      <Grid container spacing={24}>
        {(sharedProfiles && sharedProfiles.length > 0) ? (
          sharedProfiles.map((sharedProfile, index) => {
            return (
              <Grid item xs={12} key={index}>
                <SharedTalentItem
                  sharedProfile={sharedProfile}
                />
              </Grid>)
          })
        ) : (<Grid item xs={12} />)}
      </Grid>
    )
  }
}

export default withStyles(styles)(SharedTalentTable);