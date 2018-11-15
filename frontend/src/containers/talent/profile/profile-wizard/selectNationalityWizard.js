import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentNationalityForm from 'containers/talent/profile/build-profile/nationality/talentNationalityForm';
import TalentAPI from 'apis/talentAPIs'


class SelectContactInfoWizard extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentNationalityForm}
        formTitle="Build My Profile Wizard"
        contentTitle="Step 8 - My Nationality"
        backLink="/profile-wizard/select-contact-info"
        backButtonTitle="Back"
        nextLink="/profile-wizard/select-language"
        nextButtonTitle="Next"
        saveInfoAPI={TalentAPI.saveTalentInfoWithToken}
      />
    )
  }
}

export default SelectContactInfoWizard;
