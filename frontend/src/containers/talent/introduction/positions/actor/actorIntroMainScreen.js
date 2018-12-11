import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import ActorIntroMainForm from './actorIntroMainForm';


class ActorIntroMain extends Component {

  render() {
    const position = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.position
      : null;
    const nextLink = {
      pathname: "/video-positions",
      state: { position: position }
    };

    return (
      <TalentBuildProfileForm
        ContentLayout={ActorIntroMainForm}
        formTitle={"My Acting Audition Videos Instructions"}
        nextLink={nextLink}
        nextButtonTitle={"Back to My Acting Audition Videos"}
        position={position}
      />
    )
  }
}

export default ActorIntroMain;
