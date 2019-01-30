import { TemplateAdminSidebar } from 'components/shiptalent/template';
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Group from "@material-ui/icons/Group";


const dashboardRoutes = [
  {
    path: "/admin/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
  },
  {
    path: "/admin/profile-search",
    sidebarName: "Profile Search",
    navbarName: "Profile Search",
    icon: Group,
  },
  {
    path: "/admin/new-profiles",
    sidebarName: "New Profiles",
    navbarName: "New Profiles",
    icon: Person,
  },
  {
    path: "/admin/edited-profiles",
    sidebarName: "Edit Profiles",
    navbarName: "Edit Profiles",
    icon: LibraryBooks,
  },
  {
    path: "/admin/casting-requests",
    sidebarName: "Casting Requests",
    navbarName: "Casting Requests",
    icon: BubbleChart,
  },
  {
    path: "/admin/metrics-tools",
    sidebarName: "Metrics Tools",
    navbarName: "Metrics Tools",
    icon: LocationOn,
  },
  {
    path: "/admin/dance-combo-lockouts",
    sidebarName: "Dance Combo Lockouts",
    navbarName: "Dance Combo Lockouts",
    icon: Notifications,
  },
  {
    path: "/admin/medicial-disclosure",
    sidebarName: "Medicial Disclosure",
    navbarName: "Medicial Disclosure",
    icon: Unarchive,
  }
];

export default dashboardRoutes;
