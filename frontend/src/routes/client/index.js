import {
  TemplateNothing, TemplateClientTopbar
} from 'components/shiptalent/template';

// client side
import ClientLogin from "containers/client/login";
import ClientHomeScreen from "containers/client/clientHomeScreen"
import TalentSearch from 'containers/client/find_talent/talent.seach'
import TalentSearchResult from "containers/client/find_talent/talent.search.result";
import TalentView from "containers/client/talent_view/talent.view";
import Immigration from "containers/client/talent_view/immigration";
import Medical from "containers/client/talent_view/medical";
import Availability from "containers/client/talent_view/availability";
import GreetingsVideoView from "containers/client/talent_view/video_views/greetingsVideoView";
import PositionVideosScreen from "containers/client/talent_view/video_views/positions/positionVideosScreen";
import SubSkillVideos from "containers/client/talent_view/video_views/positions/subSkillVideosScreen";
import ClientRatings from "containers/client/talent_view/clientRatings";
import ClientRating from "containers/client/talent_view/clientRating";
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


export const clientComponents = {
  ClientLogin, ClientHomeScreen,

  TalentSearch, TalentSearchResult, TalentView, Immigration, Medical, Availability,

  GreetingsVideoView, PositionVideosScreen, SubSkillVideos,

  ClientRatings, ClientRating,
  RequestSelection, CastingRequestNew, CastingRequestAddConfirm,
  CastingRequestListView, CastingRequestView, CastingRequestSubmitConfirm,
  CastingRequestAddWageForm, CastingRequestSearchTalentsForm,
  ClientRequestMoreInfo, ClientRequestMoreInfoConfirm,

  MySharedProfile, SelectTeamMembers, SharedProfileConfirm,
  InviteTeamMembers, InviteTeamMembersConfirm,
  TalentSharedWith, TalentSharedBy, TalentSharedTeam,

  MyTalentSaved, MyCallback, MyFavorite, CallBackConfirm,

  BlockedProfile, BlockedProfileEdit, BlockedProfileConfirm,

  MyRate, RatingAndComment, MyrateSubmitted,

  TalentChangePassword,

  ClientCommunity,
  ClientCommunityConfirm,
};


const clientRoutes = [
  {
    path: "/client/login",
    layout: TemplateNothing,
    component: ClientLogin,
    exact: false
  },
  {
    path: "/client/home",
    layout: TemplateClientTopbar,
    component: ClientHomeScreen,
    exact: false
  },
  {
    path: "/client/talent_search",
    layout: TemplateClientTopbar,
    component: TalentSearch,
    exact: false
  },
  {
    path: "/client/talent_search_result",
    layout: TemplateClientTopbar,
    component: TalentSearchResult,
    exact: false
  },
  {
    path: "/client/talent_view",
    layout: TemplateClientTopbar,
    component: TalentView,
    exact: true
  },
  {
    path: "/client/talent_immigration",
    layout: TemplateClientTopbar,
    component: Immigration,
    exact: true
  },
  {
    path: "/client/talent_medical",
    layout: TemplateClientTopbar,
    component: Medical,
    exact: true
  },
  {
    path: "/client/talent_availability",
    layout: TemplateClientTopbar,
    component: Availability,
    exact: true
  },
  {
    path: "/client/talent_ratings",
    layout: TemplateClientTopbar,
    component: ClientRatings,
    exact: true
  },
  {
    path: "/client/talent_ratings/detail",
    layout: TemplateClientTopbar,
    component: ClientRating,
    exact: true
  },
  {
    path: "/client/talent_view/video_greetings",
    layout: TemplateClientTopbar,
    component: GreetingsVideoView,
    exact: true
  },
  {
    path: "/client/talent_view/position_videos_view",
    layout: TemplateClientTopbar,
    component: PositionVideosScreen,
    exact: true
  },
  {
    path: "/client/talent_view/sub_skill_videos_view",
    layout: TemplateClientTopbar,
    component: SubSkillVideos,
    exact: true
  },
  {
    path: "/client/request_selection",
    layout: TemplateClientTopbar,
    component: RequestSelection,
    exact: false
  },
  {
    path: "/client/casting_request/new",
    layout: TemplateClientTopbar,
    component: CastingRequestNew,
    exact: false
  },
  {
    path: "/client/casting_request/confirm",
    layout: TemplateClientTopbar,
    component: CastingRequestAddConfirm,
    exact: false
  },
  {
    path: "/client/casting_request/list_view",
    layout: TemplateClientTopbar,
    component: CastingRequestListView,
    exact: false
  },
  {
    path: "/client/casting_request/add_wage",
    layout: TemplateClientTopbar,
    component: CastingRequestAddWageForm,
    exact: false
  },
  {
    path: "/client/casting_request/submit_confirm",
    layout: TemplateClientTopbar,
    component: CastingRequestSubmitConfirm,
    exact: false
  },
  {
    path: "/client/casting_request/search_talent",
    layout: TemplateClientTopbar,
    component: CastingRequestSearchTalentsForm,
    exact: false
  },
  {
    path: "/client/mytalent/saved",
    layout: TemplateClientTopbar,
    component: MyTalentSaved,
    exact: false
  },
  {
    path: "/client/myfavorite",
    layout: TemplateClientTopbar,
    component: MyFavorite,
    exact: false
  },
  {
    path: "/client/callback/confirm",
    layout: TemplateClientTopbar,
    component: CallBackConfirm,
    exact: false
  },
  {
    path: "/client/select_team_members",
    layout: TemplateClientTopbar,
    component: SelectTeamMembers,
    exact: false
  },
  {
    path: "/client/request",
    layout: TemplateClientTopbar,
    component: ClientRequestMoreInfo,
    exact: true
  },
  {
    path: "/client/request/confirm",
    layout: TemplateClientTopbar,
    component: ClientRequestMoreInfoConfirm,
    exact: true
  },
  {
    path: "/client/myshared_profile",
    layout: TemplateClientTopbar,
    component: MySharedProfile,
    exact: true
  },
  {
    path: "/client/shared_profile/confirm",
    layout: TemplateClientTopbar,
    component: SharedProfileConfirm,
    exact: true
  },
  {
    path: "/client/shared_profile/invitation",
    layout: TemplateClientTopbar,
    component: InviteTeamMembers,
    exact: true
  },
  {
    path: "/client/shared_profile/invite_confirm",
    layout: TemplateClientTopbar,
    component: InviteTeamMembersConfirm,
    exact: true
  },
  {
    path: "/client/talent_shared",
    layout: TemplateClientTopbar,
    component: TalentSharedWith,
    exact: true
  },
  {
    path: "/client/talent_shared_by",
    layout: TemplateClientTopbar,
    component: TalentSharedBy,
    exact: false
  },
  {
    path: "/client/talent_shared_team",
    layout: TemplateClientTopbar,
    component: TalentSharedTeam,
    exact: false
  },
  {
    path: "/client/blocked_profile",
    layout: TemplateClientTopbar,
    component: BlockedProfile,
    exact: false
  },
  {
    path: "/client/blocked_profile/edit",
    layout: TemplateClientTopbar,
    component: BlockedProfileEdit,
    exact: false
  },
  {
    path: "/client/blocked_profile/confirm",
    layout: TemplateClientTopbar,
    component: BlockedProfileConfirm,
    exact: false
  },
  {
    path: "/client/my_rate",
    layout: TemplateClientTopbar,
    component: MyRate,
    exact: false
  },
  {
    path: "/client/rating_comment",
    layout: TemplateClientTopbar,
    component: RatingAndComment,
    exact: true
  },
  {
    path: "/client/rating_comment/submitted",
    layout: TemplateClientTopbar,
    component: MyrateSubmitted,
    exact: true
  },
  {
    path: "/client/community",
    layout: TemplateClientTopbar,
    component: ClientCommunity,
    exact: true
  },
  {
    path: "/client/community/confirm",
    layout: TemplateClientTopbar,
    component: ClientCommunityConfirm,
    exact: true
  },
];

export default clientRoutes;