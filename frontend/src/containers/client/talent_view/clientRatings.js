import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Panel from 'components/general/panel';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Spacer from 'components/general/spacer';
import styles from 'styles';


class ClientRatings extends Component {

  state = {
    talent: {},
  };

  getInfoFromProps = (props) => {
    if(props.location && props.location.state)
      return {
        talent: props.location.state.talent,
      };
    else return {};
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props)});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps)});
  }

  renderContent() {
    const { classes } = this.props;
    const { talent } = this.state;

    return (
      <Panel>
        <Spacer size={30} />
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <Typography align='center' className={classes.clientFormSubTitle}>
              AVERAGE RATING
            </Typography>
          </Grid>
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <Typography align='center' className={classes.clientFormSubTitle}>
              {(talent && talent.average_rating) ? talent.average_rating : ''}
            </Typography>
          </Grid>
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <Spacer size={30} />
          </Grid>
          <Grid item xl={12} lg={12} md={12} xs={12} className={classes.centerText}>
            <Typography
              align='center'
              className={classNames(
                classes.clientFormSubTitle,
                classes.underlineText,
                classes.centerText
              )}
            >
              RATING HISTORY
            </Typography>
          </Grid>

          <Grid item xl={12} lg={12} md={12} xs={12}>
            <Grid container spacing={16} direction="column" justify="center" alignItems="center">
              {(talent && talent.talent_ratings) && talent.talent_ratings.map(rating => {
                return (
                  /*<Grid item xl={12} lg={12} md={12} xs={12}>
                    <Link to={{pathname: '/client/talent_ratings/detail', state: {talent, rating}}}>
                      <Typography align='center'>
                        {rating.casting_request_talent.casting_request.name}
                      </Typography>
                    </Link>
                  </Grid>*/
                  <ColumnButton
                    link={{pathname: '/client/talent_ratings/detail', state: {talent, rating}}}
                    itemClass={classes.clientTalentViewMoreInfoButtonGridItem}
                    buttonClass={classNames(classes.clientTalentViewVideoButton, classes.centerText)}
                    title={rating.casting_request_talent.casting_request.name}
                    titleClass={classes.clientTalentViewVideoButtonText}
                    xl={7} lg={7} md={7} sm={8} xs={8} color={'primary'} fullWidth={true}
                  />
                );})
              }
            </Grid>
          </Grid>
        </Grid>

      </Panel>
    )
  }

  render() {
    const { talent } = this.state;
    return (
      <ClientForm
        nextLink={{pathname: '/client/talent_view', state: {talentId: talent && talent.id}}}
        nextButtonTitle="Back to Profile"
        talent={talent}
      >
        {talent && this.renderContent()}
      </ClientForm>
    );
  }
}

export default withStyles(styles)(ClientRatings);
