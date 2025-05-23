import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import App from "../App";
// AUTH
const Login = lazy(()=> import( "../pages/Auth/Login/Login"));
// ADMIN
const Admin = lazy(()=> import( "../modules/Admin/Admin"));
const FacilityManagerPage = lazy(()=> import( "../pages/Admin/FacilityManager/FacilityManagerPage/FacilityManagerPage"));
const WorkplaceManager = lazy(()=> import( "../modules/WorkplaceManager/WorkplaceManager"));
const ToolCribManager = lazy(()=> import( "../modules/ToolCribManager/ToolCribManager"));
const Worker = lazy(()=> import( "../modules/Worker/Worker"));
const Reports = lazy(()=> import( "../pages/Admin/Reports/Reports"));
const FacilityPage = lazy(()=> import( "../pages/Admin/Facility/FacilityPage/FacilityPage"));
const Workplace = lazy(()=> import( "../pages/Admin/Workplace/Workplace"));
const Tools = lazy(()=> import( "../pages/Admin/Tools/Tools"));
const Employee = lazy(()=> import( "../pages/Admin/Employee/Employee"));

// FacilityManager 
const FacilityManager = lazy(()=> import( "../modules/FacilityManager/FacilityManager"));
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
          { path: "facility", element: <FacilityPage /> },
          { path: "facilityManager", element: <FacilityManagerPage /> },
          { path: "workplace", element: <Workplace /> },
          { path: "workplaceManager", element: <WorkplaceManager /> },
          { path: "tools", element: <Tools /> },
          { path: "employee", element: <Employee /> },
        ],
      },
      {
        path: "facilityManager",
        Component: FacilityManager,
        children: [{ index: true, element: <></> }],
      },
      {
        path: "workplaceManager",
        Component: WorkplaceManager,
        children: [{ index: true, element: <></> }],
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
