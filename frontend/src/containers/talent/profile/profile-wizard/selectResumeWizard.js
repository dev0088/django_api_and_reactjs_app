import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentResumeForm from 'containers/talent/profile/build-profile/resume/talentResumeForm';


class SelectResumeWizard extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentResumeForm}
        formTitle="Build My Profile Wizard"
        contentTitle="Step 13 - My Resume"
        backLink="/profile-wizard/select-bio"
        backButtonTitle="Back"
        nextLink="/profile-wizard/select-picture"
        nextButtonTitle="Next"
      />
    )
  }
}

export default SelectResumeWizard;
