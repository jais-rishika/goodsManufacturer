import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import App from "../App";

// AUTH
const Login = lazy(() => import("../pages/Auth/Login/Login"));

// ADMIN
  const Admin = lazy(() => import("../modules/Admin/Admin"));
  const Reports = lazy(() => import("../pages/Admin/Reports/Reports"));
  const FacilityManagerPage = lazy(
  () => import("../pages/Admin/FacilityManager/FacilityManagerPage/FacilityManagerPage"));
  const FacilityPage = lazy( () => import("../pages/Admin/Facility/FacilityPage/FacilityPage"));
  const Tools = lazy(() => import("../pages/Admin/Tools/Tools"));
  
  // FacilityManager
  const FacilityManager = lazy( () => import("../modules/FacilityManager/FacilityManager"));
  const Workplace = lazy(() => import("../pages/Admin/Workplace/Workplace"));
  const WorkplaceManager = lazy(() => import("../modules/WorkplaceManager/WorkplaceManager"));
  const ToolsInventory = lazy(()=> import( "../pages/FacilityManager/ToolsInventory/ToolsInventory"));
  
  // WorkPlaceManager
  const WorkPlaceManager = lazy(()=> import( "../pages/FacilityManager/WorkPlaceManager/WorkPlaceManager"));
  const SpecialRequests = lazy(()=> import( "../pages/WorkspaceManager/SpecialRequests/SpecialRequests"));
  const Workers = lazy(()=> import( "../pages/WorkspaceManager/Workers/Workers"));
  const WorkStation = lazy(()=> import( "../pages/WorkspaceManager/WorkStation/WorkStation"));
  const Inventory = lazy(()=> import( "../pages/WorkspaceManager/Inventory/Inventory"));
  
  //ToolCribManager
  const ToolCribManager = lazy( () => import("../modules/ToolCribManager/ToolCribManager"));
  
  //Worker
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
        children: [
          { index: true, element: <Reports /> },
          { path: "facilityManager", element: <FacilityManagerPage /> },
          { path: "facility", element: <FacilityPage /> },
          { path: "workplaceManager", element: <WorkplaceManager /> },
          { path: "workplace", element: <Workplace /> },
          { path: "toolcribManager", element: <ToolCribManager /> },
          { path: "workers", element: <Workers /> },
          { path: "tools", element: <Tools /> },
        ],
      },
      {
        path: "facilityManager",
        Component: FacilityManager,
        children: [
          { index: true, element: <Workplace /> },
          { path: "workplaceManager", element: <WorkPlaceManager /> },
          { path: "inventory", element: <ToolsInventory /> },
        ],
      },
      {
        path: "workplaceManager",
        Component: WorkplaceManager,
        children: [
          { index: true, element: <SpecialRequests /> },
          { path: "workers", element: <Workers /> },
          { path: "workers", element: <WorkStation /> },
          { path: "tools", element: <Inventory /> }
        ],
      },
      {
        path: "toolCribManager",
        Component: ToolCribManager,
        children: [{ index: true, element: <></> }],
      },
      {
        path: "worker",
        Component: Worker,
        children: [{ index: true, element: <></> }],
      },
    ],
  },
]);
