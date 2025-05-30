import { lazy } from "react";

const Penalties = lazy(()=> import ( "../../pages/Worker/Penalties/Penalties"));
const Requests = lazy(()=> import ( "../../pages/Worker/Requests/Requests"));
const Inventory = lazy(()=> import ( "../../pages/Worker/ToolsInventory/ToolsInventory"));


export const workerRoutes = [
  { index: true, element: <Inventory /> },
  { path: "requests", element: <Requests /> },
  { path: "penalties", element: <Penalties /> },
];
export default workerRoutes