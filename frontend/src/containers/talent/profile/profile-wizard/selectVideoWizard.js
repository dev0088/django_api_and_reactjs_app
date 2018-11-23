import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentVideosForm from 'containers/talent/profile/build-profile/videos/talentVideosForm';
import TalentAPI from 'apis/talentAPIs'


class SelectVideoWizard extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentVideosForm}
        formTitle="Build My Profile Wizard"
        contentTitle="Step 11 - My Videos"
        backLink="/profile-wizard/select-picture"
        backButtonTitle="Back"
        nextLink="/profile"
        nextButtonTitle="Go to View Profile"
        fromWizard={true}
      />
    )
  }
}

export default SelectVideoWizard;
