// import styles from "./FacilityManager.module.scss";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.tsx";
import { getuserDetail } from "../../services/auth.service.ts";
import type { FacilityManagerProps } from "./FacilityManager.types.ts";

const FacilityManager = ({}: FacilityManagerProps) => {
  const sideBarList = [
    { title: "Workplace", link: "/facility-manager" },
    { title: "WorkplaceManager", link: "/facility-manager/workplace-manager" },
    { title: "ToolCribs", link: "/facility-manager/tool-cribs" },
    { title: "Inventory", link: "/facility-manager/inventory" },
    { title: "Logs", link: "/facility-manager/logs" },
  ];

  const [location, setLocation] = useState("");
  const getData = async () => {
    const user = await getuserDetail();
    setLocation(user.facilityName);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout
      role={`Facility Manager To ${location}`}
      sideBarList={sideBarList}
    />
  );
};

export default FacilityManager;
