import { lazy } from "react";
import AllEmployee from "../../pages/Admin/AllEmployee/AllEmployee";

const Reports = lazy(()=> import ( "../../pages/Admin/Reports/Reports"));
const Tools = lazy(()=> import ( "../../pages/Admin/Tools/Tools"));

const FacilityPage = lazy(()=> import ( "../../pages/Admin/Facility/FacilityPage/FacilityPage"));
const FacilityManagerPage = lazy(()=> import ( "../../pages/Admin/FacilityManager/FacilityManagerPage/FacilityManagerPage"));

export const adminRoutes = [
  { index: true, element: <Reports /> },
  { path: "facility-manager", element: <FacilityManagerPage /> },
  { path: "facility", element: <FacilityPage /> },
  { path: "tools", element: <Tools /> },
  { path: "all-employee", element: <AllEmployee /> },
];
