import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import Grid from '@material-ui/core/Grid';
import styles from 'styles';


class DetailButtonsGroup extends Component {

  renderOtherButton(link, title, statusValue) {
    const { classes } = this.props;

    return (
      <ColumnButton
        link={link}
        title={title} titleClass={classes.clientTalentViewVideoButtonText}
        subTitle={statusValue} subTitleClass={classes.clientTalentViewVideoButtonStatusText}
        itemClass={classes.clientTalentViewVideoButtonGridItem}
        buttonClass={classes.clientTalentViewVideoButton}
        xs={12} color='' fullWidth={false}
      />
    );
  }

  render() {
    const { talent } = this.props;
    return (
      <Grid container spacing={24} direction="column" justify="center" alignItems="center">
        {this.renderOtherButton(
          {pathname: '/client/talent_immigration', state: {talent}},
          "Immigration", '2 Active Visas'
        )}
        {this.renderOtherButton(
          {pathname: '/client/talent_medical', state: {talent}},
          "Medical", 'no conditions'
        )}
        {this.renderOtherButton(
          '#',
          "Availability", 'Last updated 04/11/2018'
        )}
        {this.renderOtherButton(
          '#', "Client Ratings", '3 Submissions'
        )}
      </Grid>
    )
  }

}

export default withStyles(styles)(DetailButtonsGroup);