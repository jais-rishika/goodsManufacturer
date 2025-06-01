// import styles from "./Admin.module.scss";
import type { AdminProps } from "./Admin.types.ts";
import Layout from "../../components/Layout/Layout.tsx";

const Admin = ({}: AdminProps) => {
  const sideBarList = [
    { title: "Home", link: "/owner" },
    { title: "FacilityManager", link: "/owner/facility-manager" },
    { title: "Facility", link: "/owner/facility" },
    { title: "AllEmployees", link: "/owner/all-employee" },
    { title: "Tools", link: "/owner/tools" }
  ];
  return <Layout role={"ADMIN"} sideBarList={sideBarList}/>;
};

export default Admin;
