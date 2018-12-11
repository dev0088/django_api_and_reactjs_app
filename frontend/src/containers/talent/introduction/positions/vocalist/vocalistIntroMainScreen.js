import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import VocalistIntroMainForm from './vocalistIntroMainForm';


class VocalistIntroMain extends Component {
  handleClickNextButton = (event) => {
    // event.preventDefault();
    // this.props.history.goBack();
  };

  render() {
    const position = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.position
      : null
    const nextLink = {
      pathname: "/video-positions",
      state: { position: position }
    }
    return (
      <TalentBuildProfileForm
        ContentLayout={VocalistIntroMainForm}
        formTitle={"My Vocal Audition Videos Instructions"}
        nextLink={nextLink}
        nextButtonTitle={"Back to My Vocal Audition Videos"}
        handleClickNextButton={this.handleClickNextButton}
        position={position}
      />
    )
  }
}

export default VocalistIntroMain;
