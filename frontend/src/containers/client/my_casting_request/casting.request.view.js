import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import ClientForm from 'components/shiptalent/forms/clientForm';
import CastingRequestSubmitForm from './castingRequestSubmitForm';
import CastingRequestTalentsForm from './castingRequestTalentsForm';
import * as clientActions from 'actions/clientActions';
import ClientAPI from 'apis/clientAPIs';
import defaultValues from 'constants/defaultValues';
import { arrayUnique } from 'utils/appUtils';
import styles from 'styles';
import '../client.css';


class CastingRequestView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // castingRequest: (props.location && props.location.state) ? props.location.state.castingRequest : null,
      // castingRequestTalents: (props.location && props.location.state && props.location.state.castingRequestTalents)
      //                         ? props.location.state.castingRequestTalents : [],
      // newCastingRequestTalents: (props.location && props.location.state &&
      //                             props.location.state.newCastingRequestTalents)
      //                         ? props.location.state.newCastingRequestTalents : [],

      castingRequest: null,
      castingRequestTalents: [],
      newCastingRequestTalents: [],

      error: false
    };
  }

  getInfoFromProps = (props) => {
    let castingRequest = null;
    let castingRequestTalents = [];
    let newCastingRequestTalents = [];

    if (props.location && props.location.state) {
      castingRequest = props.location.state.castingRequest;
      castingRequestTalents = castingRequest.casting_request_talents ;
      newCastingRequestTalents = props.location.state.newCastingRequestTalents;
      let stateNCRTs = this.state.newCastingRequestTalents;
      if (stateNCRTs && stateNCRTs.length > 0) {
        newCastingRequestTalents = arrayUnique(stateNCRTs.concat(newCastingRequestTalents), 'id');
      }
    }

    return { castingRequest, castingRequestTalents, newCastingRequestTalents }
  };

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props) }, () => {
      const { castingRequest, castingRequestTalents, newCastingRequestTalents } = this.state;
      if (castingRequest && !castingRequestTalents) {
        ClientAPI.getCastingRequestDetail(castingRequest.id, this.handleGetCastingRequestResponse);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps) }, () => {
      const { castingRequest, castingRequestTalents, newCastingRequestTalents } = this.state;
      if (castingRequest && !castingRequestTalents) {
        console.log('===== view: componentWillReceiveProps: castingRequest: ', castingRequest);
        ClientAPI.getCastingRequestDetail(castingRequest.id, this.handleGetCastingRequestResponse);
      }
    });
  }

  handleGetCastingRequestResponse = (response, isFailed) => {
    console.log('==== response: ', response, isFailed);
    if (isFailed) {
      this.setState({ castingRequestTalents: [] })
    } else {
      this.setState({
        castingRequest: response,
        castingRequestTalents: response.casting_request_talents
      })
    }
  };

  removeTalentFromArray = (arrayObject, crtID) => {
    if (!arrayObject) return [];

    let crts = arrayObject;
    let index = crts.findIndex(crt => crt.id === crtID);

    if (index >= 0) crts.splice(index, 1);

    return crts;
  };

  handleRemoveTalent = (castingRequestTalentID) => {
    this.setState({
      castingRequestTalents: this.removeTalentFromArray(this.state.castingRequestTalents, castingRequestTalentID),
      newCastingRequestTalents: this.removeTalentFromArray(this.state.newCastingRequestTalents, castingRequestTalentID)
    });
  };

  render() {
    const { castingRequest, castingRequestTalents, newCastingRequestTalents } = this.state;
    let forms = [];
    if (castingRequest) {
      forms.push(
        <CastingRequestSubmitForm
          title={`${castingRequest.name}
            ${moment(castingRequest.employment_start_date).format(defaultValues.CASTING_REQUEST_TITLE_DATE_FORMAT)} -
            ${moment(castingRequest.employment_end_date).format(defaultValues.CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)
            }`}
          castingRequest={castingRequest}
        />
      );
      forms.push(
        <CastingRequestTalentsForm
          title="Talent Included in this Casting Request"
          castingRequest={castingRequest}
          castingRequestTalents={castingRequestTalents}
          newCastingRequestTalents={newCastingRequestTalents}
          handleRemoveTalent={this.handleRemoveTalent}
        />
      )
    }
    return (
      <ClientForm
        formTitle="Casting Request"
        backLink={{
          pathname: '/client/casting_request/search_talent',
          state: {castingRequest, castingRequestTalents, newCastingRequestTalents}
        }}
        backButtonTitle="Add Talent to this Casting Request"
        nextLink={'/client/casting_request/list_view'}
        nextButtonTitle="Save Changes and Return to My Casting Requests"
      >
        {forms}
      </ClientForm>
    )
  }
}

function mapStateToProps(state) {
  const { clientInfo } = state;

  return {
    clientInfo: clientInfo.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clientActions: bindActionCreators(clientActions, dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CastingRequestView));