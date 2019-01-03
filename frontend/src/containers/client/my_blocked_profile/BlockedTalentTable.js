import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BlockedTalentItem from './BlockedTalentItem';
import styles from 'styles';


class BlockedTalentTable extends Component {

  render() {
    const { blockedProfiles, onUnblockedProfile } = this.props;
    console.log('=== blockedProfiles: ', blockedProfiles);
    return (
      <Grid container spacing={24}>
        {(blockedProfiles && blockedProfiles.length > 0) ? (
          blockedProfiles.map((blockedProfile, index) => {
            return (
              <Grid item xs={12} key={index}>
                <BlockedTalentItem
                  blockedProfile={blockedProfile}
                  onUnblockedProfile={onUnblockedProfile}
                />
              </Grid>)
          })
        ) : (<Grid item xs={12} />)}
      </Grid>
    )
  }
}

export default withStyles(styles)(BlockedTalentTable);