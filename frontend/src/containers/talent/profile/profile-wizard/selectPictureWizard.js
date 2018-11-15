import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentPicturesForm from 'containers/talent/profile/build-profile/pictures/talentPicturesForm';


class SelectPictureWizard extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentPicturesForm}
        formTitle="Build My Profile Wizard"
        contentTitle="Step 14 - My Pictures"
        backLink="/profile-wizard/select-resume"
        backButtonTitle="Back"
        nextLink="/profile-wizard/select-video"
        nextButtonTitle="Next"
      />
    )
  }
}

export default SelectPictureWizard;
