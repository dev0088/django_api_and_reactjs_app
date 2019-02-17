import React, {Component} from 'react';
import {connect} from "react-redux";
import { Alert } from 'reactstrap';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Panel from 'components/general/panel';
import ClientForm from 'components/shiptalent/forms/clientForm';
import TalentTable from './talentTable';
import TalentSearchBar from './talentSearchBar';
import ClientAPI from 'apis/clientAPIs';
import * as clientActions from 'actions/clientActions';
import { arrayUnique } from 'utils/appUtils';
import styles from 'styles';


class CastingRequestSearchTalentsForm extends Component {

  state = {
    castingRequest: {},
    talentSearchResult: [],
    selectedTalentIDs: [],
    newCastingRequestTalents: [],
    searchKeyword: '',
    error: false,
    errorMessage: null
  };

  getInfoFromProps = (props) => {
    let castingRequest = (props.location && props.location.state)
      ? props.location.state.castingRequest
      : null;
    let newCastingRequestTalents = (props.location && props.location.state)
      ? props.location.state.newCastingRequestTalents
      : [];
    return {
      castingRequest: castingRequest,
      newCastingRequestTalents: newCastingRequestTalents,
      talentSearchResult: props.talentSearchResult
    }
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props)}, () => {
      let data = {};
      if(this.state.castingRequest) {
        data = {casting_request_id: this.state.castingRequest.id}
      }
      this.props.clientActions.talentSearch(data);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps)});
  }

  handleSelectTalent = talentIDs => this.setState({ selectedTalentIDs: talentIDs });

  handleClickAddTalents = (event) => {
    const { castingRequest, selectedTalentIDs } = this.state;

    event.preventDefault();

    let data = selectedTalentIDs.map(talentID => {
      return {talent: talentID, casting_request: castingRequest.id}
    });

    ClientAPI.createAllCastingRequestTalents(data, this.handleAddTalentResponse);
  };

  handleAddTalentResponse = (response, isFailed) => {
    const { castingRequest } = this.state;
    let newCastingRequestTalents = this.state.newCastingRequestTalents;
    if(isFailed) {
      this.setState({ error: true, errorMessage: 'Failed to add talents.' });
    } else {
      this.setState({ error: false, errorMessage: false });
      this.props.history.push(
        '/client/casting_request/view',
        {castingRequest, newCastingRequestTalents: newCastingRequestTalents ? newCastingRequestTalents.concat(response) : response}
      );
    }
  };

  renderContent = () => {
    const { title, classes } = this.props;
    const { castingRequest, talentSearchResult } = this.state;

    return (
      <Panel
        title={title} bold={true} center={true} key="cr-aw-f"
        className={classNames(classes.h4NoMargin, classes.bold, classes.centerText)}
      >
        <Grid container spacing={16} justify="flex-start" alignItems="flex-start">
          <Grid item xs={12} >
            <TalentSearchBar castingRequestID={castingRequest ? castingRequest.id : 0} />
          </Grid>
          <Grid item xs={12} className={classes.leftText}>
            <TalentTable talents={talentSearchResult} onChange={this.handleSelectTalent} />
          </Grid>
        </Grid>
      </Panel>
    );
  };

  render() {
    const { castingRequest, error, errorMessage } = this.state;

    let backLink = {
      pathname: "/client/casting_request/view",
      state: {castingRequest}
    };
    let nextLink = {
      pathname: "/client/casting_request/view",
      state: {castingRequest: castingRequest}
    };

    return (
      <ClientForm
        formTitle="Add Talent to Casting Request"
        backLink={backLink}
        backButtonTitle="Add and Return to Casting Request"
        handleClickBackButton={this.handleClickAddTalents}
        nextLink={nextLink}
        nextButtonTitle="Cancel and Return to Casting Request"
      >
        {this.renderContent()}
        {error && <Alert color="danger">{errorMessage}</Alert>}
      </ClientForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clientActions: bindActionCreators(clientActions, dispatch)
  }
};

const mapStateToProps = state => {
  const { talentSearchResult } = state
  return {
    talentSearchResult: talentSearchResult && talentSearchResult.value ? talentSearchResult.value : null
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CastingRequestSearchTalentsForm));
