import React from "react";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Panel from "components/general/panel";
import AdminForm from 'components/shiptalent/forms/adminForm';
import ProfileVideosTable from './ProfileVideosTable';
import { adminStyles } from 'styles';

class ProfileVideos extends React.Component {

  state = {
    profile: null,
    profileId: null
  };

  getInfoFromProps = (props) => {
    const { location } = props;
    let profile = (location && location.state && location.state.profile) ? location.state.profile : null;
    let profileId = (location && location.state && location.state.profileId) ? location.state.profileId : null;
    return {profile, profileId };
  };

  componentWillMount() {
    this.setState({
      ...this.getInfoFromProps(this.props)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.getInfoFromProps(nextProps)
    });
  }

  renderContent = () => {
    const { profile } = this.state;
    const { allPositionTypes, allSkills } = this.props;
    return (
      <Panel>
        { profile && (
          <ProfileVideosTable
            profile={profile}
            greetingsVideos={profile.talent_video_greetings}
            interviewVideos={profile.talent_videos}
            subSkillVideos={profile.talent_video_sub_skills}
            allPositionTypes={allPositionTypes.value}
            allSkills={allSkills.value}
          />
        )}
      </Panel>
    );
  }

  render = () => {
    const { profile } = this.state;
    return (
      <AdminForm
        formSubTitle="VIDEOS"
        talent={profile}
        loading={false}
        showName
        backLink={{pathname: "/admin/edit-profiles/edit-profile", state: {profileId: profile ? profile.id : null}}}
        backButtonTitle="Back to Profile"
        nextLink="/admin/dashboard"
        nextButtonTitle="Agent Dashboard"
      >
        {this.renderContent()}
      </AdminForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    
  };
};

const mapStateToProps = state => {
  const { allPositionTypes, allSkills } = state;
  return {
    allPositionTypes, 
    allSkills
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(adminStyles)(ProfileVideos));
