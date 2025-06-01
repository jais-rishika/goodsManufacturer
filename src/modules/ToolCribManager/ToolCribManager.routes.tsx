import { lazy } from "react";

const ToolsInventory = lazy(()=> import( "../../pages/ToolCribManager/ToolsInventory/ToolsInventory"));
const WorkerRequests = lazy(()=> import( "../../pages/ToolCribManager/WorkerRequests/WorkerRequests"));

export const toolCribManagerRoutes = [
    { index: true, element:  <ToolsInventory/>},
    { path: "workers-request", element:  <WorkerRequests/> },
]