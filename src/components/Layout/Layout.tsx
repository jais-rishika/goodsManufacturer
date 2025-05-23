import styles from "./Layout.module.scss";
import type { LayoutProps } from "./Layout.types.ts";

import { Outlet } from "react-router";

import Header from "../Header/Header.tsx";
import SideBar from "../SideBar/SideBar.tsx";
import {useState } from "react";


const Layout = ({role,sideBarList}: LayoutProps) => {
  const [showSideBar, setShowSideBar] = useState(true);
  let sidebarStyle;
  sidebarStyle = `${styles.SideBar} ${
    showSideBar ? styles.active : ""
  }`;

  return (
    <div className={styles.Layout}>
      <Header setShowSideBar={setShowSideBar} />
      <main className={styles.MainContainer}>
        <div className={sidebarStyle}>
          <SideBar role={role} setShowSideBar={setShowSideBar} sideBarList={sideBarList}/>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
