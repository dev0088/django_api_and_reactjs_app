import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import DancerIntroMainForm from './dancerIntroMainForm';


class DancerIntroMain extends Component {

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
        ContentLayout={DancerIntroMainForm}
        formTitle={"My Dance Audition Videos Instructions"}
        nextLink={nextLink}
        nextButtonTitle={"Back to My Vocal Audition Videos"}
        position={position}
      />
    )
  }
}

export default DancerIntroMain;
