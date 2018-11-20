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
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import ProfileSearch from "views/ProfileSearch/ProfileSearch.jsx";
import Editprofiles from "views/Editprofiles/Editprofiles.jsx";
import Castingrequests from "views/Castingrequests/Castingrequests.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
// import EditProfile from "views/Typrgraphy/EditProfile.jsx"

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/profile-search",
    sidebarName: "Profile Search",
    navbarName: "Profile Search",
    icon: "content_paste",
    component: ProfileSearch
  },
  {
    path: "/new-profiles",
    sidebarName: "New Profiles",
    navbarName: "New Profiles",
    icon: Person,
    component: UserProfile,
  },
  {
    path: "/edited-profiles",
    sidebarName: "Edit Profiles",
    navbarName: "Edit Profiles",
    icon: LibraryBooks,
    component: Editprofiles
  },
  {
    path: "/casting-requests",
    sidebarName: "Casting Requests",
    navbarName: "Casting Requests",
    icon: BubbleChart,
    component: Castingrequests
  },
  {
    path: "/metrics-tools",
    sidebarName: "Metrics Tools",
    navbarName: "Metrics Tools",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/dance-combo-lockouts",
    sidebarName: "Dance Combo Lockouts",
    navbarName: "Dance Combo Lockouts",
    icon: Notifications,
    component: NotificationsPage
  },
  {
    path: "/medicial-disclosure",
    sidebarName: "Medicial Disclosure",
    navbarName: "Medicial Disclosure",
    icon: Unarchive,
    component: UpgradeToPro
  }
];

export default dashboardRoutes;
