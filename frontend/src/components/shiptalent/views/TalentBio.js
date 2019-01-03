import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import styles from 'styles';


class TalentBio extends Component {

  render() {
    const { bio } = this.props;

    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography className="profile-picture-name">{"Biography"}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="multiline-static"
            multiline
            rows="8"
            value={bio ? bio : ''}
            fullWidth
            className="profile-bio-textfield"
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TalentBio);