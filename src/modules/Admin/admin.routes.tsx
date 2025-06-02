import { lazy } from "react";
const AllEmployee= lazy(()=> import("../../pages/Admin/AllEmployee/AllEmployee"));
const ReportPage= lazy(()=> import("../../pages/Admin/Reports/ReportPage/ReportPage"));

const Tools = lazy(()=> import ( "../../pages/Admin/Tools/Tools"));

const FacilityPage = lazy(()=> import ( "../../pages/Admin/Facility/FacilityPage/FacilityPage"));
const FacilityManagerPage = lazy(()=> import ( "../../pages/Admin/FacilityManager/FacilityManagerPage/FacilityManagerPage"));

export const adminRoutes = [
  { index: true, element: <ReportPage /> },
  { path: "facility-manager", element: <FacilityManagerPage /> },
  { path: "facility", element: <FacilityPage /> },
  { path: "tools", element: <Tools /> },
  { path: "all-employee", element: <AllEmployee /> },
];
