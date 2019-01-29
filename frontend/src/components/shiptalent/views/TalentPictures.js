import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TalentPicture from './TalentPicture';
import styles from 'styles';


class TalentPictures extends Component {

  render() {
    const { pictures, classes } = this.props;
    if (pictures) {
      return (
        <Grid container spacing={8} direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography className="profile-picture-name">{"Pictures"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.talentProfilePictureViewContainer}>
              <Grid container spacing={0} style={{textAlign: 'center'}}>
                <Grid item xs={12}>
                  <TalentPicture caption="My Current Headshot" pictures={pictures} />
                  <TalentPicture caption="My Current Body Shot 1" pictures={pictures} />
                  <TalentPicture caption="My Current Body Shot 2" pictures={pictures} />
                </Grid>
                <Grid item xs={12}>
                  <TalentPicture caption="My Other Pic 1" pictures={pictures} />
                  <TalentPicture caption="My Other Pic 2" pictures={pictures} />
                  <TalentPicture caption="My Other Pic 3" pictures={pictures} />
                </Grid>
                <Grid item xs={12}>
                  <TalentPicture caption="My Other Pic 4" pictures={pictures} />
                  <TalentPicture caption="My Other Pic 5" pictures={pictures} />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      );
    }

    return <div/>
  }
}

export default withStyles(styles)(TalentPictures);