import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CallBackTalentItem from './CallBackTalentItem';
import styles from 'styles';


class CallBackTalentTable extends Component {

  render() {
    const { callbacks, onRemoveCallback } = this.props;
    console.log('=== callbacks: ', callbacks);
    return (
      <Grid container spacing={24}>
        {(callbacks && callbacks.length > 0) ? (
          callbacks.map((callback, index) => {
            return (
              <Grid item xs={12} key={index}>
                <CallBackTalentItem
                  callback={callback}
                  onRemoveCallback={onRemoveCallback}
                />
              </Grid>)
          })
        ) : (<Grid item xs={12} />)}
      </Grid>
    )
  }
}

export default withStyles(styles)(CallBackTalentTable);