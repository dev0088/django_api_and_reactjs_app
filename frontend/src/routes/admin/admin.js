// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "containers/admin/Dashboard/Dashboard.jsx";
import UserProfile from "containers/admin/UserProfile/UserProfile.jsx";
import ProfileSearch from "containers/admin/ProfileSearch/ProfileSearch.jsx";
import Editprofiles from "containers/admin/Editprofiles/Editprofiles.jsx";
import Castingrequests from "containers/admin/Castingrequests/Castingrequests.jsx";
import Maps from "containers/admin/Maps/Maps.jsx";
import NotificationsPage from "containers/admin/Notifications/Notifications.jsx";
import UpgradeToPro from "containers/admin/UpgradeToPro/UpgradeToPro.jsx";
// import EditProfile from "views/Typrgraphy/EditProfile.jsx"

const dashboardRoutes = [
  {
    path: "/admin/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/admin/profile-search",
    sidebarName: "Profile Search",
    navbarName: "Profile Search",
    icon: "content_paste",
    component: ProfileSearch
  },
  {
    path: "/admin/new-profiles",
    sidebarName: "New Profiles",
    navbarName: "New Profiles",
    icon: Person,
    component: UserProfile,
  },
  {
    path: "/admin/edited-profiles",
    sidebarName: "Edit Profiles",
    navbarName: "Edit Profiles",
    icon: LibraryBooks,
    component: Editprofiles
  },
  {
    path: "/admin/casting-requests",
    sidebarName: "Casting Requests",
    navbarName: "Casting Requests",
    icon: BubbleChart,
    component: Castingrequests
  },
  {
    path: "/admin/metrics-tools",
    sidebarName: "Metrics Tools",
    navbarName: "Metrics Tools",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/admin/dance-combo-lockouts",
    sidebarName: "Dance Combo Lockouts",
    navbarName: "Dance Combo Lockouts",
    icon: Notifications,
    component: NotificationsPage
  },
  {
    path: "/admin/medicial-disclosure",
    sidebarName: "Medicial Disclosure",
    navbarName: "Medicial Disclosure",
    icon: Unarchive,
    component: UpgradeToPro
  }
];

export default dashboardRoutes;
