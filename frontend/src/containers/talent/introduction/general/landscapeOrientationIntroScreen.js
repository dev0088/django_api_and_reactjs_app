import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import LandscapeOrientationIntroForm from './landscapeOrientationIntroForm';


class LandscapeOrientationIntro extends Component {

  handleClickNextButton = (event) => {
    event.preventDefault();
    this.props.history.goBack();
  };

  render() {
    let position = null;
    let previousPath = '#';
    let previousFormTitle = 'Previous Page'

    if (this.props.history && this.props.history.location && this.props.history.location.state) {
      position = this.props.history.location.state.position;
      previousPath = this.props.history.location.state.previousPath;
      previousFormTitle = this.props.history.location.state.previousFormTitle;
    }

    const nextLink = {
      pathname: previousPath,
      state: { position: position }
    }
    return (
      <TalentBuildProfileForm
        ContentLayout={LandscapeOrientationIntroForm}
        formTitle={"Important Note Regarding ALL of Your Audition Videos"}
        nextLink={nextLink}
        nextButtonTitle={`Back to ${previousFormTitle}`}
        handleClickNextButton={this.handleClickNextButton}
        position={position}
      />
    )
  }
}

export default LandscapeOrientationIntro;
