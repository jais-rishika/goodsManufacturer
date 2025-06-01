import { Outlet } from "react-router";
import WorkPlaceEmployeeHeader from "../../components/WorkPlaceEmployeeHeader/WorkPlaceEmployeeHeader.tsx";
import styles from "./Worker.module.scss";
import type { WorkerProps } from "./Worker.types.ts";

const Worker = ({}: WorkerProps) => {
  const links = [
    { title: "Inventory", link: "/worker" },
    { title: "Requests", link: "/worker/requests" },
    { title: "Penalties", link: "/worker/penalties" },
  ];
  return (
    <div className={styles.Layout}>
      <div>
        <WorkPlaceEmployeeHeader links={links} />
      </div>
      <main className={styles.MainContainer}>
        <Outlet />
      </main>
    </div>
  );
};

export default Worker;
