// import styles from "./Admin.module.scss";
import type { AdminProps } from "./Admin.types.ts";
import Layout from "../../components/Layout/Layout.tsx";

const Admin = ({}: AdminProps) => {
  const sideBarList = [
    { title: "Home", link: "/owner" },
    { title: "FacilityManager", link: "/owner/facilityManager" },
    { title: "Facility", link: "/owner/facility" },
    { title: "WorkplaceManager", link: "/owner/workplaceManager" },
    { title: "Workplace", link: "/owner/workplace" },
    { title: "Workstation", link: "/owner/workstation" },
    { title: "ToolCribManager", link: "/owner/toolCribManager" },
    { title: "Workers", link: "/owner/workers" },
    { title: "Tools", link: "/owner/tools" }
  ];
  return <Layout role={"ADMIN"} sideBarList={sideBarList}/>;
};

export default Admin;
