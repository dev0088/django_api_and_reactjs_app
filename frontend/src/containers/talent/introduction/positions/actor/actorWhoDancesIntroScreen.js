import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import ActorWhoDancesIntroForm from './actorWhoDancesIntroForm';


class ActorWhoDancesIntro extends Component {

  render() {
    const position = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.position
      : null
    const nextLink = {
      pathname: "/talent/video-audition/actor-main-intro",
      state: { position: position }
    }
    return (
      <TalentBuildProfileForm
        ContentLayout={ActorWhoDancesIntroForm}
        formTitle={"My Acting Audition Videos Instructions"}
        formSubTitle={"(Actor Who Dances)"}
        nextLink={nextLink}
        nextButtonTitle={"Back to My Acting Audition Videos Instructions"}
        position={position}
      />
    )
  }
}

export default ActorWhoDancesIntro;
