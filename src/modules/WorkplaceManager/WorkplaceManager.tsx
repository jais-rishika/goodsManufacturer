// import styles from "./WorkplaceManager.module.scss"
import Layout from "../../components/Layout/Layout.tsx";
import type { WorkplaceManagerProps } from "./WorkplaceManager.types.ts";

const WorkplaceManager = ({}: WorkplaceManagerProps) => {
  const sideBarList = [
    { title: "Special Requests", link: "/workplaceManager" },
    { title: "Workstation", link: "/workplaceManager/work-station" },
    { title: "Workers", link: "/workplaceManager/workers" },
    { title: "ToolCribManager", link: "/workplaceManager/tool-crib-manager" },
    { title: "Inventory", link: "/workplaceManager/inventory" },
  ];
  return <Layout role={"WorkPlace Manager"} sideBarList={sideBarList} />;
};

export default WorkplaceManager;
