import { Outlet } from "react-router";
import WorkPlaceEmployeeHeader from "../../components/WorkPlaceEmployeeHeader/WorkPlaceEmployeeHeader.tsx";
import type { ToolCribManagerProps } from "./ToolCribManager.types.ts";

const ToolCribManager = ({}: ToolCribManagerProps) => {
  const links = [
    { title: "Inventory", link: "/" },
    { title: "Workers Request", link: "toolCribManager/workers-request" },
  ];
  return (
    <div>
      <WorkPlaceEmployeeHeader links={links} />
      <Outlet />
    </div>
  );
};

export default ToolCribManager;
