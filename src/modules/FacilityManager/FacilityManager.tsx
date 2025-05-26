// import styles from "./FacilityManager.module.scss";
import Layout from "../../components/Layout/Layout.tsx";
import type { FacilityManagerProps } from "./FacilityManager.types.ts";

const FacilityManager = ({}: FacilityManagerProps) => {    
  const sideBarList = [
    { title: "Workplace", link: "/facilityManager" },
    { title: "WorkplaceManager", link: "/facilityManager/workplaceManager" },
    { title: "Workstation", link: "/owner/workstation" },
    { title: "Workers", link: "/owner/workers" },
    { title: "Inventory", link: "/facilityManager/tools" },
  ];
  return <Layout role={"Facility Manager"} sideBarList={sideBarList} />;
};

export default FacilityManager;
