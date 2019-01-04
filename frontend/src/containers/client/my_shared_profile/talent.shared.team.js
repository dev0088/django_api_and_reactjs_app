import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import SharedTeamMemberTable from './SharedTeamMemberTable';
import ClientAPI from 'apis/clientAPIs';
import styles from 'styles';


class TalentSharedTeam extends Component {

  state = {
    sharedProfiles: []
  };

  getInfoFromProps = (props) => {

  };

  componentWillMount() {
    ClientAPI.getAllTalentSharedByTeamMember(1, this.handleResponseAllgetAllTalentSharedByTeamMember);
  }

  handleResponseAllgetAllTalentSharedByTeamMember = (response, isFailed) => {
    console.log('==== handleResponseAllgetAllTalentSharedByTeamMember: response: ', response);
    if(isFailed) {

    } else {
      this.setState({sharedProfiles: response});
    }
  };

  render() {
    return(
      <ClientForm
        formTitle="My Shared Profiles"
        formSubTitle="Shared Talent by Team Member"
        nextLink="/client/myshared_profile"
        nextButtonTitle="Back to My Shared Profiles"
      >
        <Grid container spacing={40} direction="column" justify="center" alignItems="center">
          <Panel title="Select Team Member to View Talent You Have Shared" bold={true} center={true}>
            <SharedTeamMemberTable
              sharedProfiles={this.state.sharedProfiles}
            />
          </Panel>
        </Grid>
      </ClientForm>
    );
  }
}


export default withStyles(styles)(TalentSharedTeam);