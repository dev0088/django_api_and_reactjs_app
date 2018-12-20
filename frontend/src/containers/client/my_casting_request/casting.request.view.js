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
import styles from 'styles';
import '../client.css';


class CastingRequestView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      castingRequest: null,
      castingRequestTalents: [],
      error: false
    };
  }

  getInfoFromProps(props) {
    return {
      castingRequest: (props.location && props.location.state) ? props.location.state.castingRequest : null
    }
  }

  componentWillMount() {
    const { castingRequest } = this.getInfoFromProps(this.props);

    this.setState({ ...castingRequest }, () => {
      if (castingRequest && castingRequest.id) {
        ClientAPI.getCastingRequestDetail(castingRequest.id, this.handleGetCastingRequestResponse);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { castingRequest } = this.getInfoFromProps(nextProps);

    this.setState({ ...castingRequest }, () => {
      if (castingRequest && castingRequest.id) {
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

  render() {
    const { castingRequest, castingRequestTalents } = this.state;

    return (
      <ClientForm
        formTitle="Casting Request"
        backLink={'#'}
        backButtonTitle="Add Talent to this Casting Request"
        nextLink={'/client/casting_request/list_view'}
        nextButtonTitle="Save Changes and Return to My Casting Requests"
      >
        { !!castingRequest && <CastingRequestSubmitForm
            title={`${castingRequest.name}
            ${moment(castingRequest.employment_start_date).format(defaultValues.CASTING_REQUEST_TITLE_DATE_FORMAT)} -
            ${moment(castingRequest.employment_end_date).format(defaultValues.CASTING_REQUEST_DESCRIPTION_DATE_FORMAT)
              }`}
            castingRequest={castingRequest}
          />
        }
        { !!castingRequest && <CastingRequestTalentsForm
            title="Talent Included in this Casting Request"
            castingRequest={castingRequest}
            castingRequestTalents={castingRequestTalents}
          />
        }
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