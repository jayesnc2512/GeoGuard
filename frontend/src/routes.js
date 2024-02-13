import Dashboard from "./views/Dashboard.js";
import Notifications from "./views/Notifications.js";
import TableList from "./views/Tables.js";
import GeotagPage from "./components/owner/geotag/GeotagPage.js";
import UserPage from "./views/User.js";
import { Alert } from "@mui/material";
import AlertPage from "./components/owner/alert/AlertPage.js";
import CameraPage from "./components/owner/home/formData.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <CameraPage/>,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: <GeotagPage/>,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: <AlertPage/>,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
  },
];

export default routes;
