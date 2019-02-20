import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from "moment";
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import Spacer from 'components/general/spacer';
import * as adminActions from 'actions/adminActions';
import defaultValues from 'constants/defaultValues';
import { adminStyles } from 'styles';


class CastRequestRating extends React.Component  {
  state = {
    profileId: 0,
    castingRequest: null,
    rating: null
  };

  getInfoFromProps = (props) => {
    const { profile, location } = props;
    let castingRequest = (location && location.state && location.state.castingRequest) ? location.state.castingRequest : null;
    let profileId = profile && profile.user.id;
    let rating = null;
    if (profile) rating = profile.talent_ratings.find(tr => tr.casting_request_talent.casting_request.id === castingRequest.id);

    return { profileId, castingRequest, rating };
  };

  componentWillMount = () => this.setState({...this.getInfoFromProps(this.props)});

  componentWillReceiveProps = (nextProps) => this.setState({...this.getInfoFromProps(nextProps)});

  renderContent() {
    const { profile, classes } = this.props;
    const { castingRequest, rating } = this.state;

    return (
      <Panel>
        <Grid container spacing={0} justify="flex-start" alignItems="flex-start">
          <Grid item xs={12} spacing={0}>
            <Typography className={classNames(classes.adminGeneralDescriptionText, classes.inlineText)}>
                <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
                    {'Rating Entry Date: '}
                </Typography>
                {rating ? moment(rating.updated).format(defaultValues.CASTING_REQUEST_DESCRIPTION_DATE_FORMAT) : ''}
            </Typography>
          </Grid>
          <Grid item xs={12} spacing={0}>
            <Typography className={classNames(classes.adminGeneralDescriptionText, classes.inlineText)}>
                <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
                    {'By: '}
                </Typography>
                {rating ? rating.client.user.email : ''}
            </Typography>
          </Grid>
          <Grid item xs={12} spacing={0}>
            <Typography className={classNames(classes.adminGeneralDescriptionText, classes.inlineText)}>
                <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
                    {'Client: '}
                </Typography>
                {rating ? `${rating.client.user.first_name} ${rating.client.user.last_name}` : ''}
            </Typography>
          </Grid>

          <Grid item xs={12} spacing={0}><Spacer size={15} /></Grid>

          <Grid item xs={12} spacing={0}>
            <Typography className={classNames(classes.adminGeneralDescriptionText, classes.inlineText)}>
                <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
                    {`Rating: ${rating ? rating.rating : ''}`}
                </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} spacing={0}>
            <Typography className={classNames(classes.adminGeneralDescriptionText, classes.inlineText)}>
                <Typography className={classNames(classes.adminGeneralDescriptionText, classes.bold, classes.inlineText)}>
                    {'Comment: '}
                </Typography>
                {rating ? rating.comments : ''}
            </Typography>
          </Grid>
        </Grid>
      </Panel>
    );
  }

  render() {
    const { profile } = this.props;
    const { castingRequest } = this.state;

    return (
      <AdminForm
        talent={profile}
        showName
        formSubTitle={ castingRequest ? `${castingRequest.name} ${moment(castingRequest.created).format(defaultValues.ADMIN_CASTING_REQUEST_TITLE_FORMAT)}` : '' }
        nextLink={{pathname: "/admin/edit-profiles/edit-profile", state: {profileId: profile ? profile.id : null}}}
        nextButtonTitle="Back to Ratings"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}


const mapStateToProps = state => {
  const { talentInfo } = state;
  return {
    profile: talentInfo.value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    adminActions: bindActionCreators(adminActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(CastRequestRating));
