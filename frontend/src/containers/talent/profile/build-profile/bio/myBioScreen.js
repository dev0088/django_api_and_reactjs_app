import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentBioForm from './talentBioForm';
import TalentAPI from 'apis/talentAPIs';

class MyBio extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentBioForm}
        formTitle={"My Headline & Biography"}
        nextLink={"/edit-profile"}
        nextButtonTitle={"Back to Build/Edit My Profile"}
        saveInfoAPI={TalentAPI.saveTalentInfoWithToken}
      />
    )
  }
}

export default MyBio;
