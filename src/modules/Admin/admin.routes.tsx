import { lazy } from "react";

const Reports = lazy(()=> import ( "../../pages/Admin/Reports/Reports"));
const Tools = lazy(()=> import ( "../../pages/Admin/Tools/Tools"));

const FacilityPage = lazy(()=> import ( "../../pages/Admin/Facility/FacilityPage/FacilityPage"));
const FacilityManagerPage = lazy(()=> import ( "../../pages/Admin/FacilityManager/FacilityManagerPage/FacilityManagerPage"));

const Workplace = lazy(()=> import ( "../../pages/Admin/Workplace/Workplace"));
const WorkPlaceManager = lazy(()=> import ( "../../pages/FacilityManager/WorkPlaceManager/WorkPlaceManager"));

const Workers = lazy(()=> import ( "../../pages/WorkspaceManager/Workers/Workers"));
const ToolCribManager = lazy(()=> import ( "../ToolCribManager/ToolCribManager"));

export const adminRoutes = [
  { index: true, element: <Reports /> },
  { path: "facility-manager", element: <FacilityManagerPage /> },
  { path: "facility", element: <FacilityPage /> },
  { path: "workplace-manager", element: <WorkPlaceManager /> },
  { path: "workplace", element: <Workplace /> },
  { path: "toolcrib-manager", element: <ToolCribManager /> },
  { path: "workers", element: <Workers /> },
  { path: "tools", element: <Tools /> },
];
