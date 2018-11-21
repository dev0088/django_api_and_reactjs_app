import React, {Component} from 'react';
import TalentBuildProfileForm from 'components/shiptalent/forms/talentBuildProfileForm';
import TalentSubSkillVideosForm from './talentSubSkillVideosForm';


class MySubSkillVideos extends Component {
  render() {
    const position = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.position
      : null
    const subSkill = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.subSkill
    const link =  {
        pathname: '/video-positions',
        state: { position: position }
      }
    return (
      <TalentBuildProfileForm
        ContentLayout={TalentSubSkillVideosForm}
        formTitle={`My ${subSkill ? subSkill : ''} Videos`}
        nextLink={link}
        nextButtonTitle={`Back to My ${position ? position.name : ''} Audition Videos`}
        subSkill={subSkill}
      />
    )
  }
}

export default MySubSkillVideos;
