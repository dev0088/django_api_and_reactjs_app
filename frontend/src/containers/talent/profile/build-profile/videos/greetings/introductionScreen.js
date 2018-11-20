import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import IntroductionForm from './introductionForm';


class Introduction extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={IntroductionForm}
        formTitle={"My Video Greetings and Introduction"}
        nextLink={"/video-greetings"}
        nextButtonTitle={"Back to My Video Greeting and Introduction"}
      />
    )
  }
}

export default Introduction;
