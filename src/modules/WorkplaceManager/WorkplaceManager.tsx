// import styles from "./WorkplaceManager.module.scss"
import Layout from "../../components/Layout/Layout.tsx";
import type { WorkplaceManagerProps } from "./WorkplaceManager.types.ts";

const WorkplaceManager = ({}: WorkplaceManagerProps) => {
  const sideBarList = [
    { title: "Special Requests", link: "/workplace-manager" },
    { title: "Workstation", link: "/workplace-manager/work-station" },
    { title: "Workers", link: "/workplace-manager/workers" },
    { title: "ToolCribManager", link: "/workplace-manager/tool-crib-manager" },
    { title: "Inventory", link: "/workplace-manager/inventory" },
  ];
  return <Layout role={"WorkPlace Manager"} sideBarList={sideBarList} />;
};

export default WorkplaceManager;
