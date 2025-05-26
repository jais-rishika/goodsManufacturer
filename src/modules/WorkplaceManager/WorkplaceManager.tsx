// import styles from "./WorkplaceManager.module.scss"
import Layout from "../../components/Layout/Layout.tsx";
import type { WorkplaceManagerProps } from "./WorkplaceManager.types.ts";

const WorkplaceManager = ({}: WorkplaceManagerProps) => {
  const sideBarList = [
    {title: "Home", link: "/workplaceManager"},
    { title: "Workstation", link: "/workplaceManager/workstation" },
    { title: "Workers", link: "/workplaceManager/workers" },
    { title: "Inventory", link: "/workplaceManager/inventory" },
  ];
  return <Layout role={"Facility Manager"} sideBarList={sideBarList} />;
};

export default WorkplaceManager;
