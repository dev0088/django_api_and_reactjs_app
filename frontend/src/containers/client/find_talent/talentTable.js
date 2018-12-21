import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TalentItem from './talentItem';
import styles from 'styles';
import '../client.css';

class TalentTable extends Component {

  render() {
    const { talents } = this.props;

    return (
      <Grid container spacing={24}>
        {(talents && talents.length > 0) ? (
          talents.map((talent, index) => {
            return (
              <Grid item xs={12} key={index}>
                <TalentItem talent={talent}/>
              </Grid>)
          })
        ) : (<Grid item xs={12} />)}
      </Grid>
    )
  }
}

export default withStyles(styles)(TalentTable);