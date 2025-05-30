import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import App from "../App";

import { workerRoutes } from "../modules/Worker/Worker.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import { facilityManagerRoutes } from "../modules/FacilityManager/FacilityManager.routes";
import { workPlaceManagerRoutes } from "../modules/WorkplaceManager/WorkPlaceManager.routes";
import { toolCribManagerRoutes } from "../modules/ToolCribManager/ToolCribManager.routes";

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
        Component: Admin,
        // children should be in Admin folder
        children: adminRoutes,
      },
      {
        path: "facilityManager",
        Component: FacilityManager,
        children: facilityManagerRoutes,
      },
      {
        path: "workplaceManager",
        Component: WorkplaceManager,
        children: workPlaceManagerRoutes,
      },
      {
        // routes should not be camel cased, they should be kebab-cased
        // tool-crib-manager
        path: "toolCribManager",
        Component: ToolCribManager,
        children: toolCribManagerRoutes,  //is wrong currenty
      },
      {
        path: "worker",
        Component: Worker,
        children: workerRoutes,
      },
    ],
  },
]);
