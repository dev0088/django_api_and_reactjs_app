import React, {Component} from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Spacer from 'components/general/spacer';
import ClientForm from 'components/shiptalent/forms/clientForm';
import TalentPictures from 'components/shiptalent/views/TalentPictures';
import TalentResume from 'components/shiptalent/views/TalentResume';
import TalentBio from 'components/shiptalent/views/TalentBio';
import TalentGeneralInfo from 'components/shiptalent/views/TalentGeneralInfo';
import TalentHeader from 'components/shiptalent/views/TalentHeader';
import MoreActions from './MoreActions';
import DetailButtonsGroup from './DetailButtonsGroup';
import VideoButtonsGroup from './VideoButtonsGroup';
import AdditionalButtonsGroup from './AdditionalButtonsGroup';
import * as talentActions from 'actions/talentActions';
import * as globalNotificationActions from 'actions/globalNotificationActions';
import styles from 'styles';


class TalentView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      talentId: (props && props.location && props.location.state) ? props.location.state.talentId : null,
      talent: props.talent,
      notification: false,
    };
  }

  getInfoFromProps(props) {
    const { talentId, talent } = props;
    let res = {};

    if (talentId) res = {...res, talentId};
    if (talent) res = {...res, talent};

    return res
  }

  componentWillMount() {
    const locationState = this.props.location.state;
    const { talentId } = locationState;

    if (locationState) {
      this.setState({...this.getInfoFromProps(locationState)});
      this.props.talentActions.getTalentInfo(talentId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const locationState = nextProps.location.state;
    const { talent } = nextProps;

    if (talent) {
      this.setState({...this.getInfoFromProps(nextProps)})
    }
    // else if (locationState) {
    //   this.setState({...this.getInfoFromProps(locationState)});
    //   this.props.talentActions.getTalentInfo(talentId);
    // }
  }

  onAddCallBackConfirm = (response, isFailed) => {
    console.log('==== handleAddCallBacksResponse: response: ', response, isFailed);
    if(isFailed) {
      this.props.globalNotificationActions.notify(true, 'error', response['talent'] ? response['talent'][0] : 'Unhandled error.');
    } else {
      this.props.globalNotificationActions.notify(true, 'success', 'Added successfully');
      this.props.history.push('/client/callback/confirm', {talentId: response['talent']})
    }

  };

  renderContent() {
    const { talent, client, talentId } = this.state;

    if (!this.state.talent) return <div/>;

    return (
      <Grid container spacing={8}>
        {this.state.notification && <Alert color="info">{this.state.notification}</Alert>}
        <Grid item xs={12}>
          <TalentHeader talent={talent} />
        </Grid>
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
          <VideoButtonsGroup talent={talent} />
        </Grid>
        <Grid item md={3} xs={12}>
          <DetailButtonsGroup />
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
    );
  }

  render() {
    return(
      <Grid container spacing={24}>
        <Grid item xs={12} >
          <ClientForm
            formTitle=""
            formSubTitle=""
            backLink="/client/talent_search_result"
            backButtonTitle="Back to Search Result"
            nextLink="/client/home"
            nextButtonTitle="Back to My Home Page"
          >
            {this.renderContent()}
          </ClientForm>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { talentInfo } = state;
  return {
    talent: talentInfo.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    talentActions: bindActionCreators(talentActions, dispatch),
    globalNotificationActions: bindActionCreators(globalNotificationActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TalentView));
