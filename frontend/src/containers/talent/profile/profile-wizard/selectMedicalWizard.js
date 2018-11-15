import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentMedicalForm from 'containers/talent/profile/build-profile/medical/talentMedicalForm';
import TalentAPI from 'apis/talentAPIs'


class SelectMedicalWizard extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentMedicalForm}
        formTitle="Build My Profile Wizard"
        contentTitle="Step 11 - My Medical"
        backLink="/profile-wizard/select-metric"
        backButtonTitle="Back"
        nextLink="/profile-wizard/select-bio"
        nextButtonTitle="Next"
        saveInfoAPI={TalentAPI.saveMedicalsWithToken}
      />
    )
  }
}

export default SelectMedicalWizard;
