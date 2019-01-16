import React, {Component} from 'react';
import ClientVideoViewForm from 'components/shiptalent/forms/clientVideoViewForm';
import PositionVideosForm from './positionVideosForm';


class PositionVideosView extends Component {

  render() {
    const talent = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.talent
      : null;
    const position = this.props.history && this.props.history.location && this.props.history.location.state
      ? this.props.history.location.state.position
      : null;

    return (
      <ClientVideoViewForm
        ContentLayout={PositionVideosForm}
        formTitle={`${position ? position.name : ''} Audition Videos`}
        nextLink={{pathname: "/client/talent_view", state: {talentId: talent ? talent.id : null}}}
        nextButtonTitle={"Back to Profile"}
        talent={talent}
        position={position}
      />
    )
  }
}

export default PositionVideosView;
