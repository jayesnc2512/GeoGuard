
import Dashboard from "./views/Dashboard.js";
import Notifications from "./views/Notifications.js";
import Icons from "./views/Icons.js";
import Typography from "./views/Typography.js";
import TableList from "./views/Tables.js";
import Maps from "./views/Map.js";
import UserPage from "./views/User.js";
import UpgradeToPro from "./views/Upgrade.js";
import AddCamera from "./views/AddCamera";
import Cameras from "./views/Cameras";
import Alerts from "./views/Alerts";



var routes = [
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "nc-icon nc-single-02",
  //   component: <Dashboard />,
  //   layout: "",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "",
  },
  {
    path: "/addcam",
    name: "Add Camera",
    icon: "nc-icon nc-simple-add",
    component: <AddCamera />,
    layout: "",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: <Maps />,
    layout: "",
  },
  {
    path: "/your_camera",
    name: "Your Camera",
    icon: "nc-icon nc-camera-compact",
    component: <Cameras />,
    layout: "",
  },
  {
    path: "/alert",
    name: "Alerts",
    icon: "nc-icon nc-bell-55",
    component: <Alerts />,
    layout: "",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "",
  // },
  
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: <UserPage />,
  //   layout: "",
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: <TableList />,
  //   layout: "",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "",
  // },
];
export default routes;
