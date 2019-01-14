import React from 'react';
import {Switch, Route} from 'react-router-dom';

// Templates
import TemplateNothing from 'components/shiptalent/template/templateNothing';
import TemplateSidebar from 'components/shiptalent/template/templateSidebar';
import TemplateTopbar from 'components/shiptalent/template/templateTopbar';
import TemplateTopbarOfComingSoon from 'components/shiptalent/template/templateTopbarOfComingSoon';
import TemplateClientTopbar from 'components/shiptalent/template/templateClientTopbar';

// Common routes
import ComingSoonScreen from 'containers/common/comingSoonScreen';
import HomeScreen from 'containers/talent/homeScreen';
import SignUpScreen from 'containers/common/signUpScreen';
import LoginScreen from 'containers/common/loginScreen';
import ForgotPasswordScreen from 'containers/common/forgotPasswordScreen';
import Error from 'components/general/error';

// Profile wizard routes
import WelcomeBuildProfileWizard from "containers/talent/profile/profile-wizard/welcomeBuildProfileWizard";
import SelectMaleWizard from "containers/talent/profile/profile-wizard/selectMaleWizard";
import SelectPositionTypeWizard from "containers/talent/profile/profile-wizard/selectPositionTypeWizard";
import SelectPositionSubTypeWizard from "containers/talent/profile/profile-wizard/selectPositionSubTypeWizard";
import SelectMultiPositionSubTypeWizard from "containers/talent/profile/profile-wizard/selectMultiPositionSubTypeWizard";
import SelectSkillWizard from "containers/talent/profile/profile-wizard/selectSkillWizard";
import SelectSubSkillWizard from "containers/talent/profile/profile-wizard/selectSubSkillWizard";
import SelectMultiSubSkillWizard from "containers/talent/profile/profile-wizard/selectMultiSubSkillWizard";
import LastWizard from "containers/talent/profile/profile-wizard/lastWizard";
import SelectContactInfoWizard from "containers/talent/profile/profile-wizard/selectContactInfoWizard";
import SelectNationalityWizard from "containers/talent/profile/profile-wizard/selectNationalityWizard";
import SelectLanguageWizard from "containers/talent/profile/profile-wizard/selectLanguageWizard";
import SelectMetricWizard from "containers/talent/profile/profile-wizard/selectMetricWizard";
import SelectMedicalWizard from "containers/talent/profile/profile-wizard/selectMedicalWizard";
import SelectBioWizard from "containers/talent/profile/profile-wizard/selectBioWizard";
import SelectResumeWizard from "containers/talent/profile/profile-wizard/selectResumeWizard";
import SelectPictureWizard from "containers/talent/profile/profile-wizard/selectPictureWizard";
import SelectVideoWizard from "containers/talent/profile/profile-wizard/selectVideoWizard";
import SelectMultiAnswerWizard from "containers/talent/profile/profile-wizard/selectMultiAnswerWizard";
import SelectSingleAnswerWizard from "containers/talent/profile/profile-wizard/selectSingleAnswerWizard";

// Videos routes
import MyVideos from "containers/talent/profile/build-profile/videos/myVideosScreen";
import MyVideoGreetings from "containers/talent/profile/build-profile/videos/greetings/myVideoGreetingsScreen";
import MyVideoGreetingsIntroduction from "containers/talent/profile/build-profile/videos/greetings/introductionScreen";
import MyPositionVideos from "containers/talent/profile/build-profile/videos/positions/myPositionVideosScreen";
import MySubSkillVideos from "containers/talent/profile/build-profile/videos/positions/mySubSkillVideosScreen";

// Video interview routes
import InterviewStart from "containers/talent/video-interview/start";
import InterviewInstruction from "containers/talent/video-interview/instruction";
import InterviewInstructionLive from "containers/talent/video-interview/instruction-live";
import InterviewDeviceAllow from "containers/talent/video-interview/allow";
import VideoPreview from "containers/talent/video-interview/preview";
import VideoPractice from "containers/talent/video-interview/practice";
import LiveInterview from "containers/talent/video-interview/live";
import MyPracticeInterviewVideos from "containers/talent/profile/build-profile/interview-videos/myPracticeInterviewVideosScreen";
import MyLiveInterviewVideos from "containers/talent/profile/build-profile/interview-videos/myLiveInterviewVideosScreen";

// Profile routes
import MyProfile from "containers/talent/profile/myProfile";
import ViewProfile from "containers/talent/profile/view-profile/viewProfile";
import MyContactInfo from "containers/talent/profile/build-profile/contact-info/myContactInfoScreen";
import MyNationality from "containers/talent/profile/build-profile/nationality/myNationalityScreen";
import MyPictures from "containers/talent/profile/build-profile/pictures/myPicturesScreen";
import MyResume from "containers/talent/profile/build-profile/resume/myResumeScreen";
import MyBio from "containers/talent/profile/build-profile/bio/myBioScreen";
import MyMetrics from "containers/talent/profile/build-profile/metric/myMetricScreen";
import MyLanguage from "containers/talent/profile/build-profile/language/myLanguagesScreen";
import MyMedical from "containers/talent/profile/build-profile/medical/myMedicalScreen";
import EditProfile from "containers/talent/profile/build-profile/general/editProfile";
import MyAvailability from "containers/talent/availability/myAvailabilityScreen";
import MyAccount from "containers/talent/account/myAccountScreen";
import MyFinance from "containers/talent/account/finance/myFinanceScreen";

// Introduction routes
import LandscapeOrientationIntro from 'containers/talent/introduction/general/landscapeOrientationIntroScreen'
import VocalistIntroMain from 'containers/talent/introduction/positions/vocalist/vocalistIntroMainScreen'
import VocalistIntro from 'containers/talent/introduction/positions/vocalist/vocalistIntroScreen'
import VocalistWhoMovesIntro from 'containers/talent/introduction/positions/vocalist/vocalistWhoMovesIntroScreen'
import VocalistWhoDancesIntro from 'containers/talent/introduction/positions/vocalist/vocalistWhoDancesIntroScreen'
import VocalistWhoActsIntro from 'containers/talent/introduction/positions/vocalist/vocalistWhoActsIntroScreen'
import VocalistDancerWhoSingsIntro from 'containers/talent/introduction/positions/vocalist/vocalistDancerWhoSingsIntroScreen'
import VocalistActorWhoSingsIntro from 'containers/talent/introduction/positions/vocalist/vocalistActorWhoSingsIntroScreen'
import DancerIntroMain from 'containers/talent/introduction/positions/dancer/dancerIntroMainScreen'
import DancerIntro from 'containers/talent/introduction/positions/dancer/dancerIntroScreen'
import DancerWhoSingsIntro from 'containers/talent/introduction/positions/dancer/dancerWhoSingsIntroScreen'
import DancerWhoActsIntro from 'containers/talent/introduction/positions/dancer/dancerWhoActsIntroScreen'
import DancerDanceCombinationIntro from 'containers/talent/introduction/positions/dancer/dancerDanceCombinationIntroScreen'
import DancerMovementCombinationIntro from 'containers/talent/introduction/positions/dancer/dancerMovementCombinationIntroScreen'
import ActorIntroMain from 'containers/talent/introduction/positions/actor/actorIntroMainScreen'
import ActorIntro from 'containers/talent/introduction/positions/actor/actorIntroScreen'
import ActorWhoSingsIntro from 'containers/talent/introduction/positions/actor/actorWhoSingsIntroScreen'
import ActorWhoSingsMoreIntro from 'containers/talent/introduction/positions/actor/actorWhoSingsMoreIntroScreen'
import ActorWhoMovesIntro from 'containers/talent/introduction/positions/actor/actorWhoMovesIntroScreen'
import ActorWhoDancesIntro from 'containers/talent/introduction/positions/actor/actorWhoDancesIntroScreen'
import ActorVocalistWhoActsIntro from 'containers/talent/introduction/positions/actor/actorVocalistWhoActsIntroScreen'
import ActorDancerWhoActsIntro from 'containers/talent/introduction/positions/actor/actorDancerWhoActsIntroScreen'
import AerialistIntroMain from 'containers/talent/introduction/positions/aerialist/aerialistIntroMainScreen'
import AerialistIntro from 'containers/talent/introduction/positions/aerialist/aerialistIntroScreen'
import AerialistWhoSingsIntro from 'containers/talent/introduction/positions/aerialist/aerialistWhoSingsIntroScreen'
import AerialistWhoSingsMoreIntro from 'containers/talent/introduction/positions/aerialist/aerialistWhoSingsMoreIntroScreen'
import AerialistWhoMovesIntro from 'containers/talent/introduction/positions/aerialist/aerialistWhoMovesIntroScreen'
import AerialistWhoDancesIntro from 'containers/talent/introduction/positions/aerialist/aerialistWhoDancesIntroScreen'
import AerialistWhoActsIntro from 'containers/talent/introduction/positions/aerialist/aerialistWhoActsIntroScreen'
import MusicianIntroMain from 'containers/talent/introduction/positions/musician/musicianIntroMainScreen'
import TechnicianIntroMain from 'containers/talent/introduction/positions/technician/technicianIntroMainScreen'
import CruiseStaffIntroMain from 'containers/talent/introduction/positions/cruise-staff/cruiseStaffIntroMainScreen'
import YouthStaffIntroMain from 'containers/talent/introduction/positions/youth-staff/youthStaffIntroMainScreen'

import MyAuditions from 'containers/talent/audition/myAuditionsScreen'

// Footer routes
import SubFaq from "containers/common/subFaq";
import Faq from "containers/common/faq";
import Terms from "containers/common/terms";
import ContactUs from "containers/common/contactUs";

// client side
import ClientLogin from "containers/client/login";
import ClientHomeScreen from "containers/client/clientHomeScreen"
import TalentSearch from 'containers/client/find_talent/talent.seach'
import TalentSearchResult from "containers/client/find_talent/talent.search.result";
import TalentView from "containers/client/talent_view/talent.view";
import Immigration from "containers/client/talent_view/immigration";
import Medical from "containers/client/talent_view/medical";
import RequestSelection from "containers/client/my_casting_request/request.selection";
import CastingRequestNew from "containers/client/my_casting_request/casting.request.new";
import CastingRequestAddConfirm from "containers/client/my_casting_request/casting.request.add.confirm";
import CastingRequestListView from "containers/client/my_casting_request/casting.request.list.view";
import CastingRequestView from "containers/client/my_casting_request/casting.request.view";
import CastingRequestSubmitConfirm from "containers/client/my_casting_request/submit.confirm";
import CastingRequestAddWageForm from "containers/client/my_casting_request/castingRequestAddWageForm";
import CastingRequestSearchTalentsForm from "containers/client/my_casting_request/castingRequestSearchTalentsForm";
import MyTalentSaved from "containers/client/my_saved_talent/mytalent.saved";
import MyCallback from "containers/client/my_saved_talent/mycallback";
import MyFavorite from "containers/client/favorite/myfavorite";
import CallBackConfirm from "containers/client/my_saved_talent/mycallback.confirm";
import MySharedProfile from "containers/client/my_shared_profile/myshared.profile";
import SelectTeamMembers from "containers/client/my_shared_profile/selectTeamMembers";
import SharedProfileConfirm from "containers/client/my_shared_profile/sharedProfileConfirm";
import InviteTeamMembers from "containers/client/my_shared_profile/inviteTeamMember";
import InviteTeamMembersConfirm from "containers/client/my_shared_profile/inviteTeamMemberConfirm";
import TalentSharedWith from "containers/client/my_shared_profile/talent.shared.with";
import TalentSharedBy from "containers/client/my_shared_profile/talent.shared.by";
import TalentSharedTeam from "containers/client/my_shared_profile/talent.shared.team";
import BlockedProfile from "containers/client/my_blocked_profile/blocked.profile";
import BlockedProfileEdit from "containers/client/my_blocked_profile/blocked.profile.edit";
import BlockedProfileConfirm from "containers/client/my_blocked_profile/blocked.profile.confirm";
import MyRate from "containers/client/my_rating/myrate";
import RatingAndComment from "containers/client/my_rating/rating.and.comment";
import MyrateSubmitted from "containers/client/my_rating/myrate.submitted";
import TalentChangePassword from "containers/talent/account/change-password/changePasswordScreen";
import ClientCommunity from "containers/client/community/clientCommunity";
import ClientCommunityConfirm from "containers/client/community/clientCommunityConfirm";
import ClientRequestMoreInfo from "containers/client/request_more_info/clientRequestMoreInfo";
import ClientRequestMoreInfoConfirm from "containers/client/request_more_info/clientRequestMoreInfoConfirm";


function renderRouter(path, topBar, layout) {
  return(
    <Route
      path={path}
      render={props => (
        <topBar>
          <layout {...props}/>
        </topBar>
      )}
    />
  );
}

const Index = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <TemplateTopbarOfComingSoon>
          <ComingSoonScreen {...props} />
        </TemplateTopbarOfComingSoon>
      )}
    />
    <Route
      path="/home"
      render={props => (
        <TemplateTopbar>
          <HomeScreen {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/sign-up"
      render={props => (
        <TemplateNothing>
          <SignUpScreen {...props} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/login"
      render={props => (
        <TemplateNothing>
          <LoginScreen {...props} />
        </TemplateNothing>
      )}
    />

    <Route
      path="/forgot-password"
      render={props => (
        <TemplateNothing>
          <ForgotPasswordScreen {...props} />
        </TemplateNothing>
      )}
    />

    <Route
      path="/client/login"
      render={props => (
        <TemplateNothing>
          <ClientLogin {...props}/>
        </TemplateNothing>
      )}
    />
    <Route
      path="/client/home"
      render={props => (
        <TemplateClientTopbar>
          <ClientHomeScreen {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/talent_search"
      render={props => (
        <TemplateClientTopbar>
          <TalentSearch {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/talent_search_result"
      render={props => (
        <TemplateClientTopbar>
          <TalentSearchResult {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/talent_view"
      render={props => (
      <TemplateClientTopbar>
        <TalentView {...props}/>
      </TemplateClientTopbar>
      )}
    />
    <Route
      exact
      path="/client/talent_immigration"
      render={props => (
        <TemplateClientTopbar>
          <Immigration {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      exact
      path="/client/talent_medical"
      render={props => (
        <TemplateClientTopbar>
          <Medical {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/request_selection"
      render={props => (
        <TemplateClientTopbar>
        <RequestSelection {...props} />
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/casting_request/new"
      render={props => (
        <TemplateClientTopbar>
        <CastingRequestNew {...props} />
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/casting_request/confirm"
      render={props => (
        <TemplateClientTopbar>
        <CastingRequestAddConfirm {...props} />
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/casting_request/list_view"
      render={props => (
        <TemplateClientTopbar>
          <CastingRequestListView {...props} />
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/casting_request/view"
      render={props => (
        <TemplateClientTopbar>
          <CastingRequestView {...props} />
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/casting_request/add_wage"
      render={props => (
        <TemplateClientTopbar>
          <CastingRequestAddWageForm {...props} />
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/casting_request/submit_confirm"
      render={props => (
        <TemplateClientTopbar>
          <CastingRequestSubmitConfirm {...props} />
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/casting_request/search_talent"
      render={props => (
        <TemplateClientTopbar>
          <CastingRequestSearchTalentsForm {...props} />
        </TemplateClientTopbar>
      )}
    />


    <Route
      path="/client/mytalent/saved"
      render={props => (
        <TemplateClientTopbar>
          <MyTalentSaved {...props} />
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/mycallback"
      render={props => (
        <TemplateClientTopbar>
          <MyCallback {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/myfavorite"
      render={props => (
        <TemplateClientTopbar>
          <MyFavorite {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/callback/confirm"
      render={props => (
        <TemplateClientTopbar>
          <CallBackConfirm {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/select_team_members"
      render={props => (
        <TemplateClientTopbar>
          <SelectTeamMembers {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      exact
      path="/client/request"
      render={props => (
        <TemplateClientTopbar>
          <ClientRequestMoreInfo {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      exact
      path="/client/request/confirm"
      render={props => (
        <TemplateClientTopbar>
          <ClientRequestMoreInfoConfirm {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/myshared_profile"
      render={props => (
        <TemplateClientTopbar>
          <MySharedProfile {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/shared_profile/confirm"
      render={props => (
        <TemplateClientTopbar>
          <SharedProfileConfirm {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/shared_profile/invitation"
      render={props => (
        <TemplateClientTopbar>
          <InviteTeamMembers {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/shared_profile/invite_confirm"
      render={props => (
        <TemplateClientTopbar>
          <InviteTeamMembersConfirm {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/talent_shared"
      render={props => (
        <TemplateClientTopbar>
        <TalentSharedWith {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/talent_shared_by"
      render={props => (
        <TemplateClientTopbar>
        <TalentSharedBy {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/talent_shared_team"
      render={props => (
        <TemplateClientTopbar>
          <TalentSharedTeam {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/blocked_profile"
      render={props => (
        <TemplateClientTopbar>
          <BlockedProfile {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/block_profile/edit"
      render={props => (
        <TemplateClientTopbar>
          <BlockedProfileEdit {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/block_profile/confirm"
      render={props => (
        <TemplateClientTopbar>
          <BlockedProfileConfirm {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/client/my_rate"
      render={props => (
        <TemplateClientTopbar>
        <MyRate {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      exact
      path="/client/rating_comment"
      render={props => (
        <TemplateClientTopbar>
          <RatingAndComment {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      exact
      path="/client/rating_comment/submitted"
      render={props => (
        <TemplateClientTopbar>
        <MyrateSubmitted {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      exact
      path="/client/community"
      render={props => (
        <TemplateClientTopbar>
          <ClientCommunity {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      exact
      path="/client/community/confirm"
      render={props => (
        <TemplateClientTopbar>
          <ClientCommunityConfirm {...props}/>
        </TemplateClientTopbar>
      )}
    />
    <Route
      path="/interview-start"
      render={props => (
        <TemplateTopbar>
          <InterviewStart {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/interview-instruction/:pageId"
      render={props => (
        <TemplateTopbar>
          <InterviewInstruction {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/interview-instruction-live/:pageId"
      render={props => (
        <TemplateTopbar>
          <InterviewInstructionLive {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/interview-device-allow/:pageId"
      render={props => (
        <TemplateTopbar>
          <InterviewDeviceAllow {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/video-interview/:pageId"
      render={props => (
        <TemplateTopbar>
          <VideoPreview {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/live-interview/:pageId"
      render={props => (
        <TemplateTopbar>
          <LiveInterview {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/video-practice/:pageId"
      render={props => (
        <TemplateTopbar>
          <VideoPractice {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/my-profile"
      render={props => (
        <TemplateTopbar>
          <MyProfile {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/profile-wizard/welcome"
      render={props => (
        <TemplateTopbar>
          <WelcomeBuildProfileWizard {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/profile-wizard/select-male"
      render={props => (
        <TemplateTopbar>
          <SelectMaleWizard {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/profile-wizard/select-position-type"
      render={props => (
        <TemplateTopbar>
          <SelectPositionTypeWizard {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/profile-wizard/select-position-sub-type"
      render={props => (
        <TemplateTopbar>
          <SelectPositionSubTypeWizard {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/profile-wizard/select-multi-position-sub-type"
      render={props => (
        <TemplateTopbar>
          <SelectMultiPositionSubTypeWizard {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/profile-wizard/select-skill"
      render={props => (
        <TemplateTopbar>
          <SelectSkillWizard {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/profile-wizard/select-sub-skill"
      render={props => (
        <TemplateTopbar>
          <SelectSubSkillWizard {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/profile-wizard/select-multi-sub-skill"
      render={props => (
        <TemplateTopbar>
          <SelectMultiSubSkillWizard {...props} />
        </TemplateTopbar>
      )}
    />


    <Route
      path="/profile-wizard/lastWizard"
      render={props => (
        <TemplateTopbar>
          <LastWizard {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/profile-wizard/select-contact-info"
      render={props => (
      <TemplateTopbar>
        <SelectContactInfoWizard {...props} />
      </TemplateTopbar>
      )}
    />
    <Route
      path="/profile-wizard/select-nationality"
      render={props => (
      <TemplateTopbar>
        <SelectNationalityWizard {...props} />
      </TemplateTopbar>
      )}
    />
    <Route
      path="/profile-wizard/select-language"
      render={props => (
      <TemplateTopbar>
        <SelectLanguageWizard {...props} />
      </TemplateTopbar>
      )}
    />
    <Route
      path="/profile-wizard/select-metric"
      render={props => (
        <TemplateTopbar>
          <SelectMetricWizard {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/profile-wizard/select-medical"
      render={props => (
        <TemplateTopbar>
          <SelectMedicalWizard {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/profile-wizard/select-bio"
      render={props => (
      <TemplateTopbar>
        <SelectBioWizard {...props} />
      </TemplateTopbar>
      )}
    />
    <Route
      path="/profile-wizard/select-resume"
      render={props => (
        <TemplateTopbar>
          <SelectResumeWizard {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/profile-wizard/select-picture"
      render={props => (
        <TemplateTopbar>
          <SelectPictureWizard {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/profile-wizard/select-video"
      render={props => (
        <TemplateTopbar>
          <SelectVideoWizard {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/profile-wizard/select-multi-answer"
      render={props => (
        <TemplateTopbar>
          <SelectMultiAnswerWizard {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/profile-wizard/select-single-answer"
      render={props => (
        <TemplateTopbar>
          <SelectSingleAnswerWizard {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/profile"
      render={props => (
        <TemplateTopbar>
          <ViewProfile {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/edit-profile"
      render={props => (
        <TemplateTopbar>
          <EditProfile {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/contact-info"
      render={props => (
        <TemplateTopbar>
          <MyContactInfo {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/nationality-info"
      render={props => (
        <TemplateTopbar>
          <MyNationality {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/bio-info"
      render={props => (
        <TemplateTopbar>
          <MyBio {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/metrics-info"
      render={props => (
        <TemplateTopbar>
          <MyMetrics {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/bio-info"
      render={props => (
        <TemplateTopbar>
          <MyBio {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/language-info"
      render={props => (
        <TemplateTopbar>
          <MyLanguage {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/medical-info"
      render={props => (
        <TemplateTopbar>
          <MyMedical {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/videos-info"
      render={props => (
        <TemplateTopbar>
          <MyVideos {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/video-greetings"
      render={props => (
        <TemplateTopbar>
          <MyVideoGreetings {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/talent/video-greetings/introduction"
      render={props => (
        <TemplateTopbar>
          <MyVideoGreetingsIntroduction {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/video-positions"
      render={props => (
        <TemplateTopbar>
          <MyPositionVideos {...props} />
        </TemplateTopbar>
      )}
    />
    <Route
      path="/video-sub-skill"
      render={props => (
        <TemplateTopbar>
          <MySubSkillVideos {...props} />
        </TemplateTopbar>
      )}
    />


    <Route
      path="/pictures-info"
      render={props => (
        <TemplateTopbar>
          <MyPictures {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/resume-info"
      render={props => (
        <TemplateTopbar>
          <MyResume {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/practice-interview-videos"
      render={props => (
        <TemplateTopbar>
          <MyPracticeInterviewVideos {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/live-interview-videos"
      render={props => (
        <TemplateTopbar>
          <MyLiveInterviewVideos {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/availability-info"
      render={props => (
      <TemplateTopbar>
        <MyAvailability {...props} />
      </TemplateTopbar>
      )}
    />

    <Route
      path="/finance-info"
      render={props => (
        <TemplateTopbar>
          <MyFinance {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/my-account"
      render={props => (
        <TemplateTopbar>
          <MyAccount {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/change-password"
      render={props => (
        <TemplateTopbar>
          <TalentChangePassword {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/vocalist-main-intro"
      render={props => (
        <TemplateTopbar>
          <VocalistIntroMain {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/vocalist-general-intro"
      render={props => (
        <TemplateTopbar>
          <VocalistIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/vocalist-moves-intro"
      render={props => (
        <TemplateTopbar>
          <VocalistWhoMovesIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/vocalist-dances-intro"
      render={props => (
        <TemplateTopbar>
          <VocalistWhoDancesIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/vocalist-acts-intro"
      render={props => (
        <TemplateTopbar>
          <VocalistWhoActsIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/vocalist-dancer-sings-intro"
      render={props => (
        <TemplateTopbar>
          <VocalistDancerWhoSingsIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/vocalist-actor-sings-intro"
      render={props => (
        <TemplateTopbar>
          <VocalistActorWhoSingsIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/dancer-main-intro"
      render={props => (
        <TemplateTopbar>
          <DancerIntroMain {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/dancer-intro"
      render={props => (
        <TemplateTopbar>
          <DancerIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/dancer-sings-intro"
      render={props => (
        <TemplateTopbar>
          <DancerWhoSingsIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/dancer-acts-intro"
      render={props => (
        <TemplateTopbar>
          <DancerWhoActsIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/dancer-dance-combination-intro"
      render={props => (
        <TemplateTopbar>
          <DancerDanceCombinationIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/dancer-movement-combination-intro"
      render={props => (
        <TemplateTopbar>
          <DancerMovementCombinationIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/actor-main-intro"
      render={props => (
        <TemplateTopbar>
          <ActorIntroMain {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/actor-intro"
      render={props => (
        <TemplateTopbar>
          <ActorIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/actor-sings-intro"
      render={props => (
        <TemplateTopbar>
          <ActorWhoSingsIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/actor-sings-more-intro"
      render={props => (
        <TemplateTopbar>
          <ActorWhoSingsMoreIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/actor-moves-intro"
      render={props => (
        <TemplateTopbar>
          <ActorWhoMovesIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/actor-dances-intro"
      render={props => (
        <TemplateTopbar>
          <ActorWhoDancesIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/actor-vocalist-acts-intro"
      render={props => (
        <TemplateTopbar>
          <ActorVocalistWhoActsIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/actor-dancer-acts-intro"
      render={props => (
        <TemplateTopbar>
          <ActorDancerWhoActsIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/aerialist-main-intro"
      render={props => (
        <TemplateTopbar>
          <AerialistIntroMain {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/aerialist-intro"
      render={props => (
        <TemplateTopbar>
          <AerialistIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/aerialist-sings-intro"
      render={props => (
        <TemplateTopbar>
          <AerialistWhoSingsIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/aerialist-sings-more-intro"
      render={props => (
        <TemplateTopbar>
          <AerialistWhoSingsMoreIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/aerialist-moves-intro"
      render={props => (
        <TemplateTopbar>
          <AerialistWhoMovesIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/aerialist-dances-intro"
      render={props => (
        <TemplateTopbar>
          <AerialistWhoDancesIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/aerialist-acts-intro"
      render={props => (
        <TemplateTopbar>
          <AerialistWhoActsIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/musician-main-intro"
      render={props => (
        <TemplateTopbar>
          <MusicianIntroMain {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/technician-main-intro"
      render={props => (
        <TemplateTopbar>
          <TechnicianIntroMain {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/cruise-staff-main-intro"
      render={props => (
        <TemplateTopbar>
          <CruiseStaffIntroMain {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/youth-staff-main-intro"
      render={props => (
        <TemplateTopbar>
          <YouthStaffIntroMain {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent/video-audition/landscape-orientation"
      render={props => (
        <TemplateTopbar>
          <LandscapeOrientationIntro {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/talent-auditions"
      render={props => (
        <TemplateTopbar>
          <MyAuditions {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/faq/:pageId"
      render={props => (
        <TemplateTopbar>
          <SubFaq {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/terms"
      render={props => (
        <TemplateTopbar>
          <Terms {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/faq"
      render={props => (
        <TemplateTopbar>
          <Faq {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      path="/contact-us"
      render={props => (
        <TemplateTopbar>
          <ContactUs {...props} />
        </TemplateTopbar>
      )}
    />

    <Route
      render={props => (
        <TemplateSidebar>
          <Error {...props} title="404" content="Sorry, the route you requested does not exist"/>
        </TemplateSidebar>
      )}
    />

  </Switch>
);

export default Index;
