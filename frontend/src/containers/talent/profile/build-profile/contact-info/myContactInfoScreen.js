import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentContactInfoForm from './talentContactInfoForm';

class MyContactInfo extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentContactInfoForm}
        formTitle={"My Contact Info"}
        nextLink={"/edit-profile"}
        nextButtonTitle={"Back to Build/Edit My Profile"}
      />
    )
  }
}

export default MyContactInfo;
