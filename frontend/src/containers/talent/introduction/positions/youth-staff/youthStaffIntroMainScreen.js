import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import YouthStaffIntroMainForm from './youthStaffIntroMainForm';


class YouthStaffIntroMain extends Component {
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
        ContentLayout={YouthStaffIntroMainForm}
        formTitle={"My YouthStaff Audition Videos Instructions"}
        nextLink={nextLink}
        nextButtonTitle={"Back to My YouthStaff Audition Videos"}
        handleClickNextButton={this.handleClickNextButton}
        position={position}
      />
    )
  }
}

export default YouthStaffIntroMain;
