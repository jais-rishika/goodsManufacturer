import { lazy } from "react";

const Requests = lazy(()=> import ( "../../pages/Worker/Requests/Requests"));
const Inventory = lazy(()=> import ( "../../pages/Worker/ToolsInventory/ToolsInventory"));


export const workerRoutes = [
  { index: true, element: <Inventory /> },
  { path: "requests", element: <Requests /> },
];
export default workerRoutes