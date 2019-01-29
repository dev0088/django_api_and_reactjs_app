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

const pageRoutes = [
  {
    path: "/admin/view-profile",
    component: ViewProfile
  },
  {
    path: "/admin/edit-profiles/edit-profile",
    component: EditProfile
  },
  {
    path: "/admin/new-casting",
    component: NewCasting
  },
  {
    path: "/admin/casting-request",
    component: CastingRequest
  },
  {
    path: "/admin/casting-detail",
    component: CastingDetail
  },
  {
    path: "/admin/metric-tool",
    component: MetricTool
  },
  {
    path: "/admin/choose-client",
    component: ChooseClient
  },
  {
    path: "/admin/dance-combo",
    component: DanceCombo
  },
  {
    path: "/admin/add-edit",
    component: AddEdit
  },
  {
    path: "/admin/add-video",
    component: AddVideo
  },
  {
    path: "/admin/client-look",
    component: ClientLook
  },
  {
    path: "/admin/client-mainten",
    component: ClientMainten
  },
  {
    path: "/admin/add-client",
    component: AddClient
  },
  {
    path: "/admin/head-line",
    component: HeadLine
  },
  // {
  //   path: "/admin/view-profile/:id",
  //   component: ViewProfile
  // },
];

export default pageRoutes;
