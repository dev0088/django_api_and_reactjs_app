import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import DancerMovementCombinationIntroForm from './dancerMovementCombinationIntroForm';


class DancerMovementCombinationIntro extends Component {

  render() {
    const position = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.position
      : null
    const nextLink = {
      pathname: "/talent/video-audition/dancer-main-intro",
      state: { position: position }
    }
    return (
      <TalentBuildProfileForm
        ContentLayout={DancerMovementCombinationIntroForm}
        formTitle={"Movement Combination Video Instructions"}
        nextLink={nextLink}
        nextButtonTitle={"Back to My Dancer Audition Videos Instructions"}
        position={position}
      />
    )
  }
}

export default DancerMovementCombinationIntro;
