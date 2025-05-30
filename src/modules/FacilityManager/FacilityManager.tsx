// import styles from "./FacilityManager.module.scss";
import Layout from "../../components/Layout/Layout.tsx";
import type { FacilityManagerProps } from "./FacilityManager.types.ts";

const FacilityManager = ({}: FacilityManagerProps) => {    
  const sideBarList = [
    { title: "Workplace", link: "/facilityManager" },
    { title: "WorkplaceManager", link: "/facilityManager/workplace-manager" },
    { title: "Workstation", link: "/facilityManager/worker-station" },
    { title: "ToolCribs", link: "/facilityManager/tool-cribs-" },
    { title: "Workers", link: "/facilityManager/workers" },
    { title: "Inventory", link: "/facilityManager/inventory" },
  ];
  return <Layout role={"Facility Manager"} sideBarList={sideBarList} />;
};

export default FacilityManager;
