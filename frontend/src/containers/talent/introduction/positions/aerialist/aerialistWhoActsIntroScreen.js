import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import AerialistWhoActsIntroForm from './aerialistWhoActsIntroForm';


class AerialistWhoActsIntro extends Component {

  render() {
    const position = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.position
      : null
    const nextLink = {
      pathname: "/talent/video-audition/aerialist-main-intro",
      state: { position: position }
    }
    return (
      <TalentBuildProfileForm
        ContentLayout={AerialistWhoActsIntroForm}
        formTitle={"My Aerialist Audition Videos Instructions"}
        formSubTitle={"(Aerialist Who Acts)"}
        nextLink={nextLink}
        nextButtonTitle={"Back to My Aerialist Audition Videos Instructions"}
        position={position}
      />
    )
  }
}

export default AerialistWhoActsIntro;
