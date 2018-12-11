import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import VocalistDancerWhoSingsIntroForm from './vocalistDancerWhoSingsIntroForm';


class VocalistDancerWhoSingsIntro extends Component {
  handleClickNextButton = (event) => {
    event.preventDefault();
    this.props.history.goBack();
  };

  render() {
    let position = null;
    let previousFormTitle = '';

    if (this.props.history && this.props.history.location && this.props.history.location.state) {
      let locationState = this.props.history.location.state
      position = locationState.position;
      previousFormTitle = locationState.previousFormTitle
                          ? locationState.previousFormTitle
                          : "My Vocal Audition Videos Instructions"
    }


    const nextLink = {
      pathname: "/talent/video-audition/vocalist-main-intro",
      state: { position: position }
    };

    return (
      <TalentBuildProfileForm
        ContentLayout={VocalistDancerWhoSingsIntroForm}
        formTitle={"My Vocal Audition Videos Instructions"}
        formSubTitle={"(Dancer Who Sings)"}
        nextLink={nextLink}
        nextButtonTitle={`Back to ${previousFormTitle}`}
        handleClickNextButton={this.handleClickNextButton}
        position={position}
      />
    )
  }
}

export default VocalistDancerWhoSingsIntro;
