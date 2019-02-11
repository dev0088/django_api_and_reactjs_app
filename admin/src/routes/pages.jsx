import NewProfile from "views/NewProfiles/NewProfile.jsx";
import EditProfile from "views/EditProfiles/EditProfile.jsx";
import NewCasting from "views/Castingrequests/NewCasting.jsx";
import CastingRequest from "views/Castingrequests/CastingRequest.jsx";
import CastingDetail from "views/Castingrequests/CastingDetail.jsx";
import MetricTool from "views/Maps/MetricTool.jsx";
import ChooseClient from "views/Maps/ChooseClient.jsx";
import DanceCombo from "views/Maps/DanceCombo.jsx";
import AddEdit from "views/Maps/AddEdit.jsx";
import AddVideo from "views/Maps/AddVideo.jsx";
import ClientLook from "views/Maps/ClientLook.jsx";
import ClientMainten from "views/Maps/ClientMainten.jsx";
import AddClient from "views/Maps/AddClient.jsx";
import HeadLine from "views/EditProfiles/HeadLine.jsx";

const pageRoutes = [
  {
    path: "/admin/new-profile",
    component: NewProfile
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
  //   path: "/admin/new-profile/:id",
  //   component: NewProfile
  // },
];

export default pageRoutes;
