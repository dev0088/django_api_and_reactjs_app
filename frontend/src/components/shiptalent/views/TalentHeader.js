import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeTitleWithAllPositionTypes } from 'utils/appUtils';
import styles from 'styles';


class TalentHeader extends Component {

  render() {
    const { talent, classes } = this.props;
    const { user, head_line, average_rating } = talent;

    let title = user ? `${user.first_name} ${user.last_name}` : ``;
    let ratingTitle = average_rating ? ` - ${average_rating}` : ``;
    title = `${title}${ratingTitle}`;
    let subTitle = makeTitleWithAllPositionTypes(talent);

    return (
      <Grid container spacing={8} direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography align="center" className={classNames(classes.h4SmallMargin, classes.bold)}>
            {title}
          </Typography>
          <Typography align="center" className={classes.clientFormSubTitle}>
            {subTitle}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.clientTalentViewHeaderTitleText}>
            {head_line}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TalentHeader);