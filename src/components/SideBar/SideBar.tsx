import styles from "./SideBar.module.scss";
import type { SideBarProps } from "./SideBar.types.ts";
import { FaBars } from "react-icons/fa";
import Button from "../Button/Button.tsx";
import { NavLink } from "react-router";

const SideBar = ({ role, sideBarList, setShowSideBar }: SideBarProps) => {
  const handleSidebar = () => setShowSideBar(false);

  return (
    <div className={styles.Sidebar}>
      <Button className={styles.Bar} onClick={handleSidebar}>
        <FaBars />
      </Button>
      <div>
        <h1>Welcome!! {role}</h1>
        <ul className={styles.List}>
          {sideBarList.map((listItem, idx) => {
            return (
              <NavLink
                className={({ isActive }) => (isActive ? styles.Active : "")} end
                to={listItem.link}
              >
                <li key={idx}>{listItem.title}</li>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
