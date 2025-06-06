import { lazy } from "react";
import WorkPlace from "../../pages/FacilityManager/WorkPlace/WorkPlace";
import ToolCribs from "../../pages/FacilityManager/ToolCribs/ToolCribs";
import WorkplaceInventory from "../../pages/FacilityManager/WorkplaceInventory/WorkplaceInventory";
const ToolsInventory = lazy(
  () => import("../../pages/FacilityManager/ToolsInventory/ToolsInventory")
);
const WorkPlaceManager = lazy(
  () => import("../../pages/FacilityManager/WorkPlaceManager/WorkPlaceManager")
);

const Workers = lazy(
  () => import("../../pages/WorkspaceManager/Workers/Workers")
);
const WorkStation = lazy(
  () => import("../../pages/WorkspaceManager/WorkStation/WorkStation")
);

export const facilityManagerRoutes = [
  { index: true, element: <WorkPlace /> },
  { path: "workplace-manager", element: <WorkPlaceManager /> },
  { path: "workers", element: <Workers /> },
  { path: "tool-cribs", element: <ToolCribs /> },
  { path: "tool-cribs/:id", element: <WorkplaceInventory /> },
  { path: "worker-station", element: <WorkStation /> },
  { path: "inventory", element: <ToolsInventory /> },
  // { path: "logs", element: <Logs /> }
];
