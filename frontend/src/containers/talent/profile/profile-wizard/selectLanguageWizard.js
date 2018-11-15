import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentLanguageForm from 'containers/talent/profile/build-profile/language/talentLanguageForm';
import TalentAPI from 'apis/talentAPIs'


class SelectLanguageWizard extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentLanguageForm}
        formTitle="Build My Profile Wizard"
        contentTitle="Step 9 - My Language"
        backLink="/profile-wizard/select-nationality"
        backButtonTitle="Back"
        nextLink="/profile-wizard/select-metric"
        nextButtonTitle="Next"
        saveInfoAPI={TalentAPI.saveTalentInfoWithToken}
      />
    )
  }
}

export default SelectLanguageWizard;
