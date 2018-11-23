import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ImageLoader from 'react-loading-image';
import styles from 'styles';
import Spacer from "../../general/spacer";

class HelpfulHintForm extends Component {
  render() {
    const { classes } = this.props

    return (
      <div>
        <Grid container spacing={8} direction="column" justify="center" alignItems="center">
          <Grid item xs={12} >
            <Spacer size={20}/>
          </Grid>
          <Grid item xs={12} >
            <Typography align="center" className={classes.talentProfileVideoAuditionHelpfulHintTitle}>
              {"Helpful Hints: "}
            </Typography>
          </Grid>
          <Grid item xs={12} >
            <Grid
              container spacing={8}
              direction="column" justify="center" alignItems="center"
              className={classes.talentProfileVideoAuditionHelpfulHintContentGrid}
            >
              <Grid item xs={12} />
              <Grid item xs={12} >
                <Typography align="center" className={classes.talentProfileVideoAuditionHelpfulHintText}>
                  {`Be sure to trim the beginning and ending of each Audition Video so that there
                    is no “dead space” before or after your performance.`}
                </Typography>
              </Grid>

              <Grid item xs={12} >
                <Typography align="center" className={classes.talentProfileVideoAuditionHelpfulHintText}>
                  {`If you are using your smartphone camera, always remember to shoot in `}
                </Typography>
                <Typography align="center"  className={classes.talentProfileVideoAuditionHelpfulHintText}>
                  <b>{`Landscape Orientation.`}</b>
                </Typography>
              </Grid>

              <Grid item xs={12} >
                <ImageLoader
                  className={classes.talentProfileVideoAuditionHelpfulHintImage}
                  src={require('images/phones.png')}
                  loading={() => <div className={classes.talentProfileVideoGreetingImage}>Loading...</div>}
                  error={() => <div>Error</div>}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default (withStyles(styles)(HelpfulHintForm));
