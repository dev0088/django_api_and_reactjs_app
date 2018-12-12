import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import AerialistIntroMainForm from './aerialistIntroMainForm';


class AerialistIntroMain extends Component {

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
        ContentLayout={AerialistIntroMainForm}
        formTitle={"My Aerialist Audition Videos Instructions"}
        nextLink={nextLink}
        nextButtonTitle={"Back to My Aerialist Audition Videos"}
        position={position}
      />
    )
  }
}

export default AerialistIntroMain;
