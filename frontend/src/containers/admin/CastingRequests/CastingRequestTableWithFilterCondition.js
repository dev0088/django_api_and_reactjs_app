import React, {Component} from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CastingRequestItem from './CastingRequestItem';
import AdminAPI from 'apis/adminAPIs';
import { adminStyles } from 'styles';


class CastingRequestTableWithFilterCondition extends Component {
  
  state = {
    castingRequests: null,
    filterCondition: null
  }

  initialize = (props) => {
    const { filterCondition, location } = props;
    console.log('===== filterCondition: ', filterCondition);
    if (filterCondition) {
      AdminAPI.searchCastingRequest(filterCondition, this.handleCastingRequestsResponse);
    } else {
      AdminAPI.getAllCastingRequests(this.handleCastingRequestsResponse);
    }
  }
  
  componentWillMount = () => {
    this.initialize(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    this.initialize(nextProps);
  }

  handleCastingRequestsResponse = (response, isFailed) => {
    console.log('===== this: ', this)
    if (isFailed) {}
    else this.setState({castingRequests: response});
  }

  render() {
    const { profile, path } = this.props;
    const { castingRequests } = this.state;
    return (
      (castingRequests) ? (
        <Grid container spacing={24} justify="center" alignItems="center">
        { castingRequests.map((castingRequest, index) => {
            return (
              <Grid item xs={12} key={index}>
                <CastingRequestItem castingRequest={castingRequest} path={path} showStatus={false} />
              </Grid>
            );
          })
        }
        </Grid>
      ) : (
        <div>None</div>
      )        
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { };
};

const mapStateToProps = state => {
  const { talentInfo } = state;
  return {
    profile: talentInfo.value
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(CastingRequestTableWithFilterCondition));