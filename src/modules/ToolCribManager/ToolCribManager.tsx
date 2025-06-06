import { Outlet } from "react-router";
import WorkPlaceEmployeeHeader from "../../components/WorkPlaceEmployeeHeader/WorkPlaceEmployeeHeader.tsx";
import type { ToolCribManagerProps } from "./ToolCribManager.types.ts";
import styles from "./ToolCribManager.module.scss";
const ToolCribManager = ({}: ToolCribManagerProps) => {
  const links = [
    { title: "Inventory", link: "/tool-crib-manager" },
    { title: "Workers Request", link: "/tool-crib-manager/workers-request" },
  ];
  return (
    <div className={styles.Layout}>
      <div>
        <WorkPlaceEmployeeHeader links={links} />
      </div>
      <div className={styles.MainContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default ToolCribManager;
