import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import DancerIntroForm from './dancerIntroForm';


class DancerIntro extends Component {

  render() {
    const position = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.position
      : null
    const nextLink = {
      pathname: "/talent/video-audition/vocalist-main-intro",
      state: { position: position }
    }
    return (
      <TalentBuildProfileForm
        ContentLayout={DancerIntroForm}
        formTitle={"My Vocal Audition Videos Instructions"}
        formSubTitle={"(Vocalist)"}
        nextLink={nextLink}
        nextButtonTitle={"Back to My Vocal Audition Videos Instructions"}
        position={position}
      />
    )
  }
}

export default DancerIntro;
