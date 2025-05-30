import { lazy } from "react";

const ToolsInventory = lazy(()=> import ( "../../pages/FacilityManager/ToolsInventory/ToolsInventory"));
const ToolCribManager = lazy(()=> import ( "../ToolCribManager/ToolCribManager"));

const Workplace = lazy(()=> import ( "../../pages/Admin/Workplace/Workplace"));
const WorkPlaceManager = lazy(()=> import ( "../../pages/FacilityManager/WorkPlaceManager/WorkPlaceManager"));

const Workers = lazy(()=> import ( "../../pages/WorkspaceManager/Workers/Workers"));
const WorkStation = lazy(()=> import ( "../../pages/WorkspaceManager/WorkStation/WorkStation"));

export const facilityManagerRoutes = [
  { index: true, element: <Workplace /> },
  { path: "workplace-manager", element: <WorkPlaceManager /> },
  { path: "workers", element: <Workers /> },
  { path: "tool-crib-manager", element: <ToolCribManager /> },
  { path: "worker-station", element: <WorkStation /> },
  { path: "inventory", element: <ToolsInventory /> },
];
