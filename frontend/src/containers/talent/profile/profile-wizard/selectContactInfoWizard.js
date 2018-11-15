import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentContactInfoForm from 'containers/talent/profile/build-profile/contact-info/talentContactInfoForm';
import TalentAPI from 'apis/talentAPIs'


class SelectNationalityWizard extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentContactInfoForm}
        formTitle="Build My Profile Wizard"
        contentTitle="Step 7 - My Contact Info"
        backLink="/profile-wizard/lastWizard"
        backButtonTitle="Back"
        nextLink="/profile-wizard/select-nationality"
        nextButtonTitle="Next"
        saveInfoAPI={TalentAPI.saveTalentInfoWithToken}
      />
    )
  }
}

export default SelectNationalityWizard;
