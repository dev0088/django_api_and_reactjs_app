import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentPositionVideosForm from './talentPositionVideosForm';


class MyPositionVideos extends Component {
  render() {
    const position = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.position
      : null
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentPositionVideosForm}
        formTitle={`My ${position ? position.name : ''} Audition Videos`}
        nextLink={"/videos-info"}
        nextButtonTitle={"Back to My Videos"}
        position={position}
      />
    )
  }
}

export default MyPositionVideos;
