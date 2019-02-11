import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProfileItem from './ProfileItem';
import Typography from '@material-ui/core/Typography';
import { adminStyles } from 'styles';

class ProfileTable extends Component {

  render() {
    const { profiles, path, classes } = this.props;

    return (
      <Grid container spacing={24}>
        {(profiles && profiles.length > 0) ? (
          profiles.map((profile, index) => {
            return (
              <Grid item xs={12} key={index}>
                <ProfileItem profile={profile} path={path} />
              </Grid>
            )
          })
        ) : (
          <Grid item xs={12} >
            <Typography className={[classes.italicText]}>
              { `No Results` }
            </Typography>
          </Grid>
        )}
      </Grid>
    )
  }
}

export default withStyles(adminStyles)(ProfileTable);