import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import Spacer from "components/general/spacer";
import SharedTalentTable from './SharedTalentTable';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles';


class TalentSharedBy extends Component {

  state = {
    sharedProfiles: []
  };

  getInfoFromProps = (props) => {

  };

  componentWillMount() {
    ClientAPI.getAllSharedTalents(1, this.handleResponseAllSharedTalents);
  }

  handleResponseAllSharedTalents = (response, isFailed) => {
    console.log('==== handleResponseAllSharedProfiles: response: ', response);
    if(isFailed) {

    } else {
      this.setState({sharedProfiles: response});
    }
  };

  render() {
    return(
      <ClientForm
        formTitle="My Shared Profiles"
        nextLink="/client/myshared_profile"
        nextButtonTitle="Back to My Shared Profiles"
      >
        <Grid container spacing={40} direction="column" justify="center" alignItems="center">
          <Panel title="Talent You Have Shared" bold={true} center={true}>
            <SharedTalentTable
              sharedProfiles={this.state.sharedProfiles}
              sharedTitle="Shared with"
            />
          </Panel>
        </Grid>
      </ClientForm>
    );
  }
}


export default withStyles(styles)(TalentSharedBy);