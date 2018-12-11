import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import ActorWhoMovesIntroForm from './actorWhoMovesIntroForm';


class ActorWhoMovesIntro extends Component {

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
        ContentLayout={ActorWhoMovesIntroForm}
        formTitle={"My Acting Audition Videos Instructions"}
        formSubTitle={"(Actor Who Moves)"}
        nextLink={nextLink}
        nextButtonTitle={"Back to My Acting Audition Videos Instructions"}
        position={position}
      />
    )
  }
}

export default ActorWhoMovesIntro;
