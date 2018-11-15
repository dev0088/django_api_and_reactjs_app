import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentLanguageForm from './talentLanguageForm';
import TalentAPI from 'apis/talentAPIs'

class MyLanguage extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentLanguageForm}
        formTitle={"My Languages"}
        nextLink={"/edit-profile"}
        nextButtonTitle={"Back to Build/Edit My Profile"}
        saveInfoAPI={TalentAPI.saveLanguagesWithToken}
      />
    )
  }
}

export default MyLanguage;
