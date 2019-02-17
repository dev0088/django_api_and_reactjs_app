import { TemplateAdminSidebar } from 'components/shiptalent/template';
import NewProfile from "containers/admin/NewProfiles/NewProfile.jsx";
import EditProfile from "containers/admin/EditProfiles/EditProfile.jsx";
import NewCasting from "containers/admin/CastingRequests/NewCasting.jsx";
import CastingRequest from "containers/admin/CastingRequests/CastingRequest.jsx";
import CastingRequestDetail from "containers/admin/CastingRequests/CastingRequestDetail.jsx";
import MetricTool from "containers/admin/Maps/MetricTool.jsx";
import ChooseClient from "containers/admin/Maps/ChooseClient.jsx";
import DanceCombo from "containers/admin/Maps/DanceCombo.jsx";
import AddEdit from "containers/admin/Maps/AddEdit.jsx";
import AddVideo from "containers/admin/Maps/AddVideo.jsx";
import ClientLook from "containers/admin/Maps/ClientLook.jsx";
import ClientMainten from "containers/admin/Maps/ClientMainten.jsx";
import AddClient from "containers/admin/Maps/AddClient.jsx";
import HeadLine from "containers/admin/EditProfiles/HeadLine/HeadLine.jsx";
import EditResume from "containers/admin/EditProfiles/Resume/EditResume";
import ProfilePictures from "containers/admin/EditProfiles/Pictures/ProfilePictures";
import EditProfilePicture from "containers/admin/EditProfiles/Pictures/ProfileEditPicture";
import ProfileVideos from "containers/admin/EditProfiles/Videos/ProfileVideos";
import EditGreetingVideos from "containers/admin/EditProfiles/Videos/EditGreetingVideos/EditGreetingVideos";
import EditGreetingVideo from "containers/admin/EditProfiles/Videos/EditGreetingVideos/EditGreetingVideo";
import EditPositionVideos from "containers/admin/EditProfiles/Videos/EditPositionVideos/EditPositionVideos";
import EditPositionVideo from "containers/admin/EditProfiles/Videos/EditPositionVideos/EditPositionVideo";
import ProfileCastingRequests from "containers/admin/EditProfiles/CastingRequests/ProfileCastingRequests";
import DashboardPage from "containers/admin/Dashboard/Dashboard.jsx";
import NewProfiles from "containers/admin/NewProfiles/NewProfiles.jsx";
import ProfileSearch from "containers/admin/ProfileSearch/ProfileSearch.jsx";
import ProfileSearchResults from "containers/admin/ProfileSearch/ProfileSearchResults";
import EditProfiles from "containers/admin/EditProfiles/EditProfiles.jsx";
import Castingrequests from "containers/admin/CastingRequests/Castingrequests.jsx";
import Maps from "containers/admin/Maps/Maps.jsx";
import NotificationsPage from "containers/admin/Notifications/Notifications.jsx";
import UpgradeToPro from "containers/admin/UpgradeToPro/UpgradeToPro.jsx";

const adminPageRoutes = [
  {
    path: "/admin",
    component: DashboardPage,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/new-profiles/new-profile",
    layout: TemplateAdminSidebar,
    component: NewProfile,
    exact: true
  },
  {
    path: "/admin/edit-profiles/edit-profile",
    component: EditProfile,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/new-casting",
    component: NewCasting,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/casting-request",
    component: CastingRequest,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/casting-detail",
    component: CastingRequestDetail,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/metric-tool",
    component: MetricTool,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/choose-client",
    component: ChooseClient,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/dance-combo",
    component: DanceCombo,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/add-edit",
    component: AddEdit,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/add-video",
    component: AddVideo,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/client-look",
    component: ClientLook,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/client-mainten",
    component: ClientMainten,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/add-client",
    component: AddClient,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/head-line",
    component: HeadLine,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/resume",
    component: EditResume,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/profile-pictures",
    component: ProfilePictures,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/profile-pictures/edit-picture",
    component: EditProfilePicture,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/edit-profiles/profile-videos",
    component: ProfileVideos,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/edit-profiles/profile-videos/greetings",
    component: EditGreetingVideos,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/edit-profiles/profile-videos/edit-greeting-video",
    component: EditGreetingVideo,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/edit-profiles/profile-videos/edit-position-videos",
    component: EditPositionVideos,
    layout: TemplateAdminSidebar,
    exact: true
  },  
  {
    path: "/admin/edit-profiles/profile-videos/edit-position-video",
    component: EditPositionVideo,
    layout: TemplateAdminSidebar,
    exact: true
  },  
  {
    path: "/admin/edit-profiles/profile-casting-request",
    component: ProfileCastingRequests,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/profile-search-results",
    component: ProfileSearchResults,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/dashboard",
    component: DashboardPage,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/profile-search",
    component: ProfileSearch,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/new-profiles",
    component: NewProfiles,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/edit-profiles",
    component: EditProfiles,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/casting-requests",
    component: Castingrequests,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/metrics-tools",
    component: Maps,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/dance-combo-lockouts",
    component: NotificationsPage,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/medicial-disclosure",
    component: UpgradeToPro,
    layout: TemplateAdminSidebar,
    exact: true
  }
];

export default adminPageRoutes;