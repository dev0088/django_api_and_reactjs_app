import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentContactInfoForm from './talentContactInfoForm';
import TalentAPI from 'apis/talentAPIs'

class MyContactInfo extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentContactInfoForm}
        formTitle={"My Contact Info"}
        nextLink={"/edit-profile"}
        nextButtonTitle={"Back to Build/Edit My Profile"}
        saveInfoAPI={TalentAPI.saveTalentInfoWithToken}
      />
    )
  }
}

export default MyContactInfo;
