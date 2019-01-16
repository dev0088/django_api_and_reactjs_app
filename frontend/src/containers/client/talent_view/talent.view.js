import React, {Component} from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Spacer from 'components/general/spacer';
import Panel from 'components/general/panel';
import ClientForm from 'components/shiptalent/forms/clientForm';
import TalentPictures from 'components/shiptalent/views/TalentPictures';
import TalentResume from 'components/shiptalent/views/TalentResume';
import TalentBio from 'components/shiptalent/views/TalentBio';
import TalentGeneralInfo from 'components/shiptalent/views/TalentGeneralInfo';
import TalentHeader from 'components/shiptalent/views/TalentHeader';
import ClientTalentMarkWithStar from 'components/shiptalent/forms/clientTalentMarkWithStar';
import MoreActions from './MoreActions';
import DetailButtonsGroup from './DetailButtonsGroup';
import VideoButtonsGroup from './VideoButtonsGroup';
import AdditionalButtonsGroup from './AdditionalButtonsGroup';
import * as talentActions from 'actions/talentActions';
import * as globalNotificationActions from 'actions/globalNotificationActions';
import { makeTitleWithAllPositionTypes } from 'utils/appUtils';
import styles from 'styles';


class TalentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      talentId: (props && props.location && props.location.state) ? props.location.state.talentId : null,
      talent: props.talent,
      notification: false,
      allPositionTypes: null,
      allSkills: null
    };
  }

  getInfoFromProps = (props) => {
    const { talentId, talent, allPositionTypes, allSkills } = props;
    let res = {};

    if (talentId) res = {...res, talentId};
    if (talent) res = {...res, talent};
    if (allPositionTypes) res = {...res, allPositionTypes};
    if (allSkills) res = {...res, allSkills};

    return res;
  };

  componentWillMount = () => {
    const locationState = this.props.location.state;
    const { talentId } = locationState;

    if (locationState) {
      this.setState({...this.getInfoFromProps(locationState)});
      this.props.talentActions.getTalentInfo(talentId);
      this.props.talentActions.getAllPositionTypes();
      this.props.talentActions.getAllSkills();
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const locationState = nextProps.location.state;
    const { talent, allPositionTypes, allSkills } = nextProps;

    if (talent || allPositionTypes || allSkills) {
      this.setState({...this.getInfoFromProps(nextProps)})
    }
  };

  onAddCallBackConfirm = (response, isFailed) => {
    console.log('==== handleAddCallBacksResponse: response: ', response, isFailed);
    if(isFailed) {
      this.props.globalNotificationActions.notify(true, 'error', response['talent'] ? response['talent'][0] : 'Unhandled error.');
    } else {
      this.props.globalNotificationActions.notify(true, 'success', 'Added successfully');
      this.props.history.push('/client/callback/confirm', {talentId: response['talent']})
    }
  };

  renderContent = () => {
    const { classes } = this.props;
    const { talent, talentId, allPositionTypes, allSkills } = this.state;

    if (!this.state.talent) return <div/>;

    const { head_line } = talent;

    return (
      <Panel title={head_line} center bold titleClassName={classes.clientTalentViewHeaderTitleText}>
        <Grid container spacing={8}>
          {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}

          <Grid item xs={12}>
            <Spacer size={10} />
          </Grid>

          <Grid item md={3} xs={12}>
            <TalentGeneralInfo talent={talent} />
          </Grid>
          <Grid item md={9} xs={12} className="profile-bio">
            <Grid container spacing={8}>
              <Grid item md={3} xs={12}>
                <TalentPictures pictures={talent.talent_pictures} />
              </Grid>
              <Grid item md={9} xs={12}>
                <Grid container spacing={8}>
                  <Grid item md={4} xs={12}>
                    <TalentResume resume={talent.talent_resume} />
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TalentBio bio={talent.bio} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={12} xs={12}>
            <Spacer size={50} />
          </Grid>

          <Grid item md={3} xs={12} style={{margin: 'auto'}}>
            <MoreActions talent={talent} />
          </Grid>
          <Grid item md={6} xs={12}>
            <VideoButtonsGroup
              talent={talent}
              allPositionTypes={allPositionTypes ? allPositionTypes.value : null}
              allSkills={allSkills ? allSkills.value : null}
              loading={
                ((allPositionTypes && !allPositionTypes.isFetched) ||
                  (allPositionTypes && !allPositionTypes.isFetched))
              }
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <DetailButtonsGroup talent={talent} />
          </Grid>

          <Grid item xs={12}>
            <Spacer size={30} />
          </Grid>

          <Grid item xs={12}>
            <AdditionalButtonsGroup
              talentId={talentId}
              onAddCallBackConfirm={this.onAddCallBackConfirm}
            />
          </Grid>

          <Grid item xs={12}>
            <Spacer size={50} />
          </Grid>

        </Grid>
      </Panel>
    );
  };

  render() {
    const { talent } = this.state;

    if (!talent) return <div/>;

    const { user, average_rating } = talent;

    let title = user ? `${user.first_name} ${user.last_name}` : ``;
    let ratingTitle = average_rating ? ` - ${average_rating}` : ``;
    title = `${title}${ratingTitle}`;
    let subTitle = makeTitleWithAllPositionTypes(talent);

    return (
      <ClientForm
        formTitle={title}
        formSubTitle={subTitle}
        backLink="/client/talent_search_result"
        backButtonTitle="Back to Search Result"
        nextLink="/client/home"
        nextButtonTitle="Back to My Home Page"
      >
        { talent && <ClientTalentMarkWithStar talent={talent} enableAddFavorite/> }
        {this.renderContent()}
      </ClientForm>
    );
  }
}

function mapStateToProps(state) {
  const { talentInfo, allPositionTypes, allSkills } = state;
  return {
    talent: talentInfo.value,
    allPositionTypes,
    allSkills
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch),
    globalNotificationActions: bindActionCreators(globalNotificationActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentView));
