import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import App from "../App";
import {GUARDS} from "./route.guards"
import { workerRoutes } from "../modules/Worker/Worker.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import { facilityManagerRoutes } from "../modules/FacilityManager/FacilityManager.routes";
import { workPlaceManagerRoutes } from "../modules/WorkplaceManager/WorkPlaceManager.routes";
import { toolCribManagerRoutes } from "../modules/ToolCribManager/ToolCribManager.routes";
import { canActivate } from "./canActivate";

// AUTH
const Login = lazy(() => import("../pages/Auth/Login/Login"));

// ADMIN
const Admin = lazy(() => import("../modules/Admin/Admin"));

// FacilityManager
const FacilityManager = lazy(
  () => import("../modules/FacilityManager/FacilityManager")
);

// WorkPlaceManager
const WorkplaceManager = lazy(
  () => import("../modules/WorkplaceManager/WorkplaceManager")
);

//ToolCribManager
const ToolCribManager = lazy(
  () => import("../modules/ToolCribManager/ToolCribManager")
);

//worker
const Worker = lazy(() => import("../modules/Worker/Worker"));

export default createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "owner",
        Component: canActivate(Admin,[GUARDS.checkLogin,GUARDS.isOwner]),
        // children should be in Admin folder
        children: adminRoutes,
      },
      {
        path: "facility-manager",
        Component: canActivate(FacilityManager,[GUARDS.checkLogin,GUARDS.isFacilityManager]),
        children: facilityManagerRoutes,
      },
      {
        path: "workplace-manager",
        Component:canActivate(WorkplaceManager,[GUARDS.checkLogin,GUARDS.isWorkplaceManager]),
        children: workPlaceManagerRoutes,
      },
      {
        // routes should not be camel cased, they should be kebab-cased
        // tool-crib-manager
        path: "tool-crib-manager",
        Component: canActivate(ToolCribManager,[GUARDS.checkLogin,GUARDS.isToolCribManager]),
        children: toolCribManagerRoutes,
      },
      {
        path: "worker",
        Component: canActivate(Worker,[GUARDS.checkLogin,GUARDS.isWorker]),
        children: workerRoutes,
      },
    ],
  },
]);
