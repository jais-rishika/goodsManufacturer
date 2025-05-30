import { lazy } from "react";
import ToolCribManager from "../../pages/WorkspaceManager/ToolCribManager/ToolCribManager";

const Inventory = lazy(()=> import ( "../../pages/WorkspaceManager/Inventory/Inventory"));
const SpecialRequests = lazy(()=> import ( "../../pages/WorkspaceManager/SpecialRequests/SpecialRequests"));
const Workers = lazy(()=> import ( "../../pages/WorkspaceManager/Workers/Workers"));
const WorkStation = lazy(()=> import ( "../../pages/WorkspaceManager/WorkStation/WorkStation"));

export const workPlaceManagerRoutes = [
  { index: true, element: <SpecialRequests /> },
  { path: "workers", element: <Workers /> },
  { path: "tool-crib-manager", element: <ToolCribManager /> },
  { path: "work-station", element: <WorkStation /> },
  { path: "inventory", element: <Inventory /> },
];
