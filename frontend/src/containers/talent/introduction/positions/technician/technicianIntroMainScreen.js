import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TechnicianIntroMainForm from './technicianIntroMainForm';


class TechnicianIntroMain extends Component {
  handleClickNextButton = (event) => {
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
        ContentLayout={TechnicianIntroMainForm}
        formTitle={"My Technician Audition Videos Instructions"}
        nextLink={nextLink}
        nextButtonTitle={"Back to My Technician Audition Videos"}
        handleClickNextButton={this.handleClickNextButton}
        position={position}
      />
    )
  }
}

export default TechnicianIntroMain;
