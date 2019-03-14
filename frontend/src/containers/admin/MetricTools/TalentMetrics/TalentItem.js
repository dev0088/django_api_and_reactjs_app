import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeTalentOverviewTitle } from 'utils/appUtils';
import { adminStyles } from 'styles';


class TalentItem extends Component {

  render() {
    const { talent, classes } = this.props;

    if (talent) {

      return (
        <Link
          to={{
            pathname: '/admin/edit-profiles/edit-profile',
            state: { profileId: talent.id }
          }}
        >
          <Grid
            container spacing={0} direction="column" justify="flex-start" alignItems="flex-start"
            key={`casting-request-talent-table-item-${!!talent && talent.id}-description`}
            style={{display: 'inline-block'}}
          >
            <Grid item lg={12} md={12} xs={12}>
              <Typography className={classNames(classes.descriptionText, classes.leftText)}>
                { makeTalentOverviewTitle(talent)}
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <Typography className={classNames(classes.descriptionText, classes.bold, classes.leftText)}>
                {`“${talent.head_line}”`}
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <Typography className={classNames(classes.descriptionText, classes.leftText)}>
                {`Average Rating: ${talent.average_rating ? talent.average_rating : ''}`}
              </Typography>
            </Grid>
          </Grid>
        </Link>
      );
    }

    return <div/>
  }
}

export default withStyles(adminStyles)(TalentItem);