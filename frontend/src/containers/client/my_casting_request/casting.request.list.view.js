import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import * as clientActions from 'actions/clientActions';
import CastingRequestTable from './castingRequestTable';
import ClientForm from 'components/shiptalent/forms/clientForm';
import styles from 'styles';
import '../client.css';


class CastingRequestListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      castingRequests: [],
      error: false
    };
  }

  getInfoFromProps = (props) => {
    return {
      castingRequests: props.clientInfo ? props.clientInfo.casting_requests : []
    }
  }

  componentWillMount() {
    this.setState({ ...this.getInfoFromProps(this.props) });
    this.props.clientActions.getCurrentClientInfo();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps) })
  }

  filterCastingRequestsByStatus = (conditions) => {
    return this.state.castingRequests.filter((castingRequest) => {
      return conditions.indexOf(castingRequest.status) > -1
    });
  };

  render() {

    return (
      <ClientForm
        formTitle='My Casting Requests'
        backLink={'/client/casting_request/new'}
        backButtonTitle='Create New Casting Request'
        nextLink={'/client/home'}
        nextButtonTitle="Back to My Home Page"
      >

        <CastingRequestTable
          title="My Submitted Casting Requests"
          castingRequests={this.filterCastingRequestsByStatus(['Requested', 'In Progress'])}
          key="submit-cr-t"
        />

        <CastingRequestTable
          title="My Saved Casting Requests"
          castingRequests={this.filterCastingRequestsByStatus(['Draft'])}
          key="saved-cr-t"
        />

        <CastingRequestTable
          title="My Completed Casting Requests"
          castingRequests={this.filterCastingRequestsByStatus(['Completed', 'Canceled'])}
          key="completed-cr-t"
        />

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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CastingRequestListView));