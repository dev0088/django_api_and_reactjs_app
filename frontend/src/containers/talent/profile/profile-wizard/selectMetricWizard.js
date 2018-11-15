import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentMetricForm from 'containers/talent/profile/build-profile/metric/talentMetricForm';
import TalentAPI from 'apis/talentAPIs'


class SelectMetricWizard extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentMetricForm}
        formTitle="Build My Profile Wizard"
        contentTitle="Step 10 - My Height, Weight, & Age Range"
        backLink="/profile-wizard/select-language"
        backButtonTitle="Back"
        nextLink="/profile-wizard/select-medical"
        nextButtonTitle="Next"
        saveInfoAPI={TalentAPI.saveTalentInfoWithToken}
      />
    )
  }
}

export default SelectMetricWizard;
