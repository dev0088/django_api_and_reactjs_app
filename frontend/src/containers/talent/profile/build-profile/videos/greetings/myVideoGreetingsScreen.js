import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentVideoGreetingsForm from './talentVideoGreetingsForm';


class MyVideosGreetings extends Component {
  render() {
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentVideoGreetingsForm}
        formTitle={"My Video Greetings and Introduction"}
        nextLink={"/videos-info"}
        nextButtonTitle={"Back to My Videos"}
      />
    )
  }
}

export default MyVideosGreetings;
