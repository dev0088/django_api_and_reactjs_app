import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import * as clientActions from 'actions/clientActions';
import CastingRequestTable from './castingRequestTable';
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

  btnStyle = {
    width: '18rem'
  };

  getInfoFromProps(props) {
    return {
      castingRequests: props.clientInfo ? props.clientInfo.client_casting_requests : []
    }
  }

  componentWillMount() {
    this.props.clientActions.getCurrentClientInfo();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.getInfoFromProps(nextProps) })
  }

  onCreateNew = () => {
    this.props.history.push("/client/casting_request/new");
  };

  goWelcomeScreen = () => {
    this.props.history.push("/client/home");
  };

  filterCastingRequestsByStatus = (conditions) => {
    return this.state.castingRequests.filter((castingRequest) => {
      return conditions.indexOf(castingRequest.status) > -1
    });
  };

  render() {

    return (
      <div className="ml-3">
        <div className="title text-center mt-3">My Casting Requests</div>

        <CastingRequestTable
          title="My Submitted Casting Requests"
          castingRequests={this.filterCastingRequestsByStatus(['Requested', 'In Progress'])}
        />

        <CastingRequestTable
          title="My Saved Casting Requests"
          castingRequests={this.filterCastingRequestsByStatus(['Draft'])}
        />

        <CastingRequestTable
          title="My Submitted Casting Requests"
          castingRequests={this.filterCastingRequestsByStatus(['Completed', 'Canceled'])}
        />

        <div className="mt-5 pb-4">
          <div className="d-flex justify-content-end mr-3">
            <button className="btn btn-dark" style={this.btnStyle} onClick={this.onCreateNew}>
              Create New Casting Request
            </button>
          </div>
          <div className="mt-2 d-flex justify-content-end mr-3">
            <button className="btn btn-dark" style={this.btnStyle} onClick={this.goWelcomeScreen}>
              Back to My Home Page
            </button>
          </div>
        </div>
      </div>
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