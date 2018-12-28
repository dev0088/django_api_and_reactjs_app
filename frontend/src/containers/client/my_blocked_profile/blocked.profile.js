import React, {Component} from 'react'
import ClientForm from 'components/shiptalent/forms/clientForm';
import Panel from 'components/general/panel';
import BlockedTalentTable from './BlockedTalentTable';
import ClientAPI from 'apis/clientAPIs';


class BlockedProfile extends Component {
  state = {
    blockedProfiles: []
  };

  getInfoFromProps = (props) => {

  };

  componentWillMount() {
    ClientAPI.getAllBlockedProfiles(this.handleAllBlockedProfilesResponse);
  }

  handleAllBlockedProfilesResponse = (response, isFailed) => {
    console.log('==== handleAllBlockedProfilesResponse: response: ', response);
    if(isFailed) {

    } else {
      this.setState({blockedProfiles: response});
    }
  };

  onUnblockedProfile = (blockedProfileID) => {
    const { blockedProfiles } = this.state;
    let newBLockedProfiles = blockedProfiles;
    let index = blockedProfiles.findIndex(profile => {
      return profile.id === blockedProfileID;
    });

    newBLockedProfiles.splice(index, 1);
    this.setState({blockedProfiles: newBLockedProfiles});
  };

  renderContent = () => {
    return (
      <Panel title="Talent currently Blocked from your search Results" bold={true} center={true} >
        <BlockedTalentTable
          blockedProfiles={this.state.blockedProfiles}
          onUnblockedProfile={this.onUnblockedProfile}
        />
      </Panel>
    )
  };

  render() {
    return (
      <ClientForm
        formTitle="My Blocked Profiles"
        formSubTitle=""
        nextLink="/client/home"
        nextButtonTitle="Back to My Home Page"
      >
        {this.renderContent()}
      </ClientForm>
    )
  }
}

export default BlockedProfile