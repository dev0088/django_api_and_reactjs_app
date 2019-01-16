import React, {Component} from 'react';
import ClientVideoViewForm from 'components/shiptalent/forms/clientVideoViewForm';
import AuditionVideoType0Form from 'containers/client/talent_view/video_views/auditions/auditionVideoType0Form';
import AuditionVideoType1Form from 'containers/client/talent_view/video_views/auditions/auditionVideoType1Form';
import AuditionVideoType2Form from 'containers/client/talent_view/video_views/auditions/auditionVideoType2Form';
import AuditionVideoType3Form from 'containers/client/talent_view/video_views/auditions/auditionVideoType3Form';

class SubSkillVideos extends Component {
  handleClickNextButton = (event) => {
    event.preventDefault();
    this.props.history.goBack();
  };

  render() {
    const talent = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.talent
      : null;
    const position = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.position
      : null;
    const subSkill = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.subSkill
      : null;
    const link =  {
        pathname: '/client/talent_view/position_videos_view',
        state: { talent: talent, position: position }
      };

    let title = '';

    let contentLayout = AuditionVideoType0Form
    if (subSkill) {
      title = `${subSkill.name} Audition Videos`;

      switch(subSkill.video_audition_type) {
        case 0:
          contentLayout = AuditionVideoType0Form;
          break;
        case 1:
          contentLayout = AuditionVideoType0Form;
          break;
        case 2:
          contentLayout = AuditionVideoType0Form;
          break;
        case 3:
          contentLayout = AuditionVideoType0Form;
          break;
        default:
          contentLayout = AuditionVideoType0Form
          break;
      }
    }
    return (
      <ClientVideoViewForm
        ContentLayout={contentLayout}
        formTitle={title}
        nextLink={link}
        nextButtonTitle={`Back to My ${position ? position.name : ''} Audition Videos`}
        handleClickNextButton={this.handleClickNextButton}
        subSkill={subSkill}
        talent={talent}
      />
    )
  }
}

export default SubSkillVideos;
