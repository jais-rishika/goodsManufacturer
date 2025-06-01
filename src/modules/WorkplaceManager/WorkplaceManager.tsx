// import styles from "./WorkplaceManager.module.scss"
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.tsx";
import { getuserDetail } from "../../services/auth.service.ts";
import type { WorkplaceManagerProps } from "./WorkplaceManager.types.ts";

const WorkplaceManager = ({}: WorkplaceManagerProps) => {
  const sideBarList = [
    { title: "Special Requests", link: "/workplace-manager" },
    { title: "Workstation", link: "/workplace-manager/work-station" },
    { title: "Workers", link: "/workplace-manager/workers" },
    { title: "ToolCribManager", link: "/workplace-manager/tool-crib-manager" },
    { title: "Inventory", link: "/workplace-manager/inventory" },
  ];

  const[location, setLocation] = useState("");
  const getData = async () => {
    const user = await getuserDetail();
    setLocation(user.facilityName);
  };

  useEffect(() => {
    getData();
  }, []);

  return <Layout role={`Workplace Manager To ${location}`} sideBarList={sideBarList} />;
};

export default WorkplaceManager;
