import React, {Component} from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Panel from 'components/general/panel';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Spacer from 'components/general/spacer';
import defaultValue from 'constants/defaultValues';
import styles from 'styles';


class ClientRating extends Component {

  state = {
    talent: {},
    rating: {}
  };

  getInfoFromProps = (props) => {
    if(props.location && props.location.state)
      return {
        talent: props.location.state.talent,
        rating: props.location.state.rating
      };
    else return {};
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props)}, () => {

    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps)});
  }

  renderItem = (name, value) => {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center">
          <Grid item>
            <Typography className={classes.financeTableTitle} >
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.descriptionText} >
              {value}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  renderContent() {
    const { classes } = this.props;
    const { talent, rating } = this.state;

    return (
      <Panel>
        <Spacer size={30} />
        <Grid container spacing={16} justify="flex-start" alignItems="center">
          {this.renderItem(
            'Rating Entry Date: ',
            moment(rating.updated).format(defaultValue.CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)
          )}
          {this.renderItem('By: ', rating.client.user.email)}
          {this.renderItem('Client: ', `${rating.client.user.first_name} ${rating.client.user.last_name}`)}
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <Spacer size={20} />
          </Grid>
          <Grid item xl={12} lg={12} md={12} xs={12}>
            {this.renderItem('Rating: ', rating.rating)}
            {this.renderItem('Comments: ', rating.comments)}
          </Grid>
        </Grid>
      </Panel>
    )
  }

  render() {
    const { talent, rating } = this.state;
    return (
      <ClientForm
        formTitle={rating && rating.casting_request_talent.casting_request.name}
        nextLink={{pathname: '/client/talent_ratings', state: {talent}}}
        nextButtonTitle="Back to Rating History"
        talent={talent}
      >
        {talent && this.renderContent()}
      </ClientForm>
    );
  }
}

export default withStyles(styles)(ClientRating);
