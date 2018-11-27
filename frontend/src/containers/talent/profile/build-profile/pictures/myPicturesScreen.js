import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentPicturesForm from './talentPicturesForm';
import TalentAPI from 'apis/talentAPIs'

class MyPictures extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentPicturesForm}
        formTitle={"My Pictures"}
        nextLink={"/edit-profile"}
        nextButtonTitle={"Back to Build/Edit My Profile"}
      />
    )
  }
}

export default MyPictures;
