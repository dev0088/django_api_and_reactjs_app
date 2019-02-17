import React, {Component} from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ColumnButton from 'components/shiptalent/buttons/columnButton';
import TextField from '@material-ui/core/TextField';
import Panel from 'components/general/panel';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Spacer from 'components/general/spacer';
import RatingTalentAvatar from './RatingTalentAvatar';
import RatingValues from './RatingValues';
import ClientAPI from 'apis/clientAPIs';
import * as globalNotificationActions from 'actions/globalNotificationActions';
import styles from 'styles';


class RatingAndComment extends Component {

  state = {
    castingRequestTalent: {},
    rating: 0,
    comment: '',
  };

  getInfoFromProps = (props) => {
    let castingRequestTalent = (props.location && props.location.state)
      ? props.location.state.castingRequestTalent
      : {};

    return {
      castingRequestTalent
    }
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props)});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps)});
  }

  onChangeComment = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onChangeRatingValue = (rating) => {
    this.setState({rating});
  };

  handleSubmit = (event) => {
    const { castingRequestTalent, rating, comment } = this.state;
    let data = {
      talent: castingRequestTalent.talent.id,
      rating: rating,
      comments: comment,
      client: castingRequestTalent.casting_request.client.id,
      casting_request_talent: castingRequestTalent.id
    };

    event.preventDefault();

    ClientAPI.addRating(data, this.handleSubmitResponse);
  };

  handleSubmitResponse = (response, isFailed) => {
    if(isFailed) {
      // this.setState({ error: true, errorMessage: 'Failed save wages.' });
      this.props.globalNotificationActions.notify(true, 'error', response['talent'] ? response['talent'][0] : 'Failed rating. Please try later.');
    } else {
      // this.setState({ error: false, errorMessage: false });
      this.props.globalNotificationActions.notify(true, 'success', 'Add rating of the talent successfully.');
      this.props.history.push('/client/rating_comment/submitted');
    }
  };

  renderContent = () => {
    const { classes } = this.props;
    const { castingRequestTalent, comment } = this.state;
    const { casting_request, talent } = castingRequestTalent;
    // let castingRequest = castingRequestTalent ? castingRequestTalent.castingRequest : null;
    // let talent = castingRequestTalent ? castingRequestTalent.talent : null;

    return (
      <Panel>
        <Grid container spacing={16} justify="center" alignItems="center">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <RatingTalentAvatar talent={talent} castingRequest={casting_request} />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.leftText}>
            <RatingValues castingRequest={casting_request} talent={talent} onChange={this.onChangeRatingValue} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.leftText}>
            <Typography className={classes.financeTableTitle}>
              {'Comments'}
            </Typography>
            <TextField
              id="outlined-name"
              label=""
              value={comment}
              type="text"
              onChange={this.onChangeComment('comment')}
              margin="normal"
              variant="outlined"
              placeholder="Type comments here..."
              multiline
              rows={5}
              rowsMax={2}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Spacer size={30} />
          </Grid>

          <ColumnButton
            link='/client/rating_comment/submitted'
            itemClass={classes.clientTalentViewMoreInfoButtonGridItem}
            buttonClass={classNames(classes.clientTalentViewMoreInfoButton, classes.centerText)}
            title={'Submit'} titleClass={classes.clientTalentViewVideoButtonText}
            xl={5} lg={5} md={6} sm={7} xs={8} color={'secondary'} fullWidth={true}
            onClickButton={this.handleSubmit}
          />

        </Grid>
      </Panel>
    );
  };

  render() {
    return (
      <ClientForm
        formTitle="Rating and Comments"
        nextLink={'/client/my_rate'}
        nextButtonTitle="Back to My Rating"
      >
        {this.renderContent()}
      </ClientForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    globalNotificationActions: bindActionCreators(globalNotificationActions, dispatch)
  }
};


export default connect(null, mapDispatchToProps)(withStyles(styles)(RatingAndComment));
