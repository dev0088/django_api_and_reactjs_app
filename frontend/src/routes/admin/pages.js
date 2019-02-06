import { TemplateAdminSidebar } from 'components/shiptalent/template';
import ViewProfile from "containers/admin/UserProfile/ViewProfile.jsx";
import EditProfile from "containers/admin/Editprofiles/EditProfile.jsx";
import NewCasting from "containers/admin/Castingrequests/NewCasting.jsx";
import CastingRequest from "containers/admin/Castingrequests/CastingRequest.jsx";
import CastingDetail from "containers/admin/Castingrequests/CastingDetail.jsx";
import MetricTool from "containers/admin/Maps/MetricTool.jsx"
import ChooseClient from "containers/admin/Maps/ChooseClient.jsx"
import DanceCombo from "containers/admin/Maps/DanceCombo.jsx"
import AddEdit from "containers/admin/Maps/AddEdit.jsx"
import AddVideo from "containers/admin/Maps/AddVideo.jsx"
import ClientLook from "containers/admin/Maps/ClientLook.jsx"
import ClientMainten from "containers/admin/Maps/ClientMainten.jsx"
import AddClient from "containers/admin/Maps/AddClient.jsx"
import HeadLine from "containers/admin/Editprofiles/HeadLine.jsx"
import DashboardPage from "containers/admin/Dashboard/Dashboard.jsx";
import UserProfile from "containers/admin/UserProfile/UserProfile.jsx";
import ProfileSearch from "containers/admin/ProfileSearch/ProfileSearch.jsx";
import ProfileSearchResults from "containers/admin/ProfileSearch/ProfileSearchResults";
import Editprofiles from "containers/admin/Editprofiles/Editprofiles.jsx";
import Castingrequests from "containers/admin/Castingrequests/Castingrequests.jsx";
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
    path: "/admin/view-profile",
    layout: TemplateAdminSidebar,
    component: ViewProfile,
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
    component: CastingDetail,
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
    component: UserProfile,
    layout: TemplateAdminSidebar,
    exact: true
  },
  {
    path: "/admin/edited-profiles",
    component: Editprofiles,
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