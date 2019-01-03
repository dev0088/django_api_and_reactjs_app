import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import Spacer from "components/general/spacer";
import CallBackTalentTable from './CallBackTalentTable';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles';


class MyCallBack extends Component {

  state = {
    callbacks: []
  };

  getInfoFromProps = (props) => {

  };

  componentWillMount() {
    ClientAPI.getAllCallBacks(this.handleAllCallBacksResponse);
  }

  handleAllCallBacksResponse = (response, isFailed) => {
    console.log('==== handleAllCallBacksResponse: response: ', response);
    if(isFailed) {

    } else {
      this.setState({callbacks: response});
    }
  };

  onRemoveCallback = (callbackId) => {
    const { callbacks } = this.state;
    let newCallBacks = callbacks;
    let index = callbacks.findIndex(callback => {
      return callback.id === callbackId;
    });

    newCallBacks.splice(index, 1);
    this.setState({callbacks: newCallBacks});
  };
  
  render() {
    return(
      <ClientForm
        formTitle="My Callbacks"
        formSubTitle="(Save for Later - Automatically Removed if Added to Casting Request)"
        nextLink="/client/mytalent/saved"
        nextButtonTitle="Back to My Saved Talent"
      >
          <Grid container spacing={40} direction="column" justify="center" alignItems="center">
            <Panel>
              <CallBackTalentTable
                callbacks={this.state.callbacks}
                onRemoveCallback={this.onRemoveCallback}
              />
            </Panel>
          </Grid>
      </ClientForm>
    );
  }
}


export default withStyles(styles)(MyCallBack);