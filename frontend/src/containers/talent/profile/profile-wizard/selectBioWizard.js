import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentBioForm from 'containers/talent/profile/build-profile/bio/talentBioForm';
import TalentAPI from 'apis/talentAPIs'


class SelectBioWizard extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentBioForm}
        formTitle="Build My Profile Wizard"
        contentTitle="Step 12 - My Headline & Biography"
        backLink="/profile-wizard/select-medical"
        backButtonTitle="Back"
        nextLink="/profile-wizard/select-resume"
        nextButtonTitle="Next"
        saveInfoAPI={TalentAPI.saveTalentInfoWithToken}
      />
    )
  }
}

export default SelectBioWizard;
