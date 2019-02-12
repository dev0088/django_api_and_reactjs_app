import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CastingRequestTalent from './CastingRequestTalent';
import { adminStyles } from 'styles';


class CastingRequestTable extends Component {
  render() {
    const {profile, castingRequests, classes } = this.props;
    return (
      (profile && castingRequests) ? (
        <Grid container spacing={24} justify="center" alignItems="center">
        { castingRequests.map((castingRequestTalent, index) => {
            return (
              <Grid item xs={12} key={index}>
                <CastingRequestTalent castingRequestTalent={castingRequestTalent}/>
              </Grid>
            );
          })
        }
        </Grid>
      ) : (
        <div>None</div>
      )        
    );
  }
}

export default withStyles(adminStyles)(CastingRequestTable);