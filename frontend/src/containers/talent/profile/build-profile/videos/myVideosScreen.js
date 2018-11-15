import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentVideosForm from './talentVideosForm';


class MyVideos extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentResumeForm}
        formTitle={"My Resume"}
        nextLink={"/edit-profile"}
        nextButtonTitle={"Back to Build/Edit My Profile"}
      />
    )
  }
}

export default MyVideos;
