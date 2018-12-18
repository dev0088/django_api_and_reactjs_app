import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentChangePasswordForm from './talentChangePasswordForm';


class TalentChangePassword extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentChangePasswordForm}
        formTitle={"Change Password"}
        nextLink={"/my-account"}
        nextButtonTitle={"Back to My Account"}
      />
    )
  }
}

export default TalentChangePassword;
