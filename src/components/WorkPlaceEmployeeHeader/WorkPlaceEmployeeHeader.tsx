import { FaBars } from "react-icons/fa";
import Button from "../Button/Button.tsx";
import styles from "./WorkPlaceEmployeeHeader.module.scss";
import type { WorkPlaceEmployeeHeaderProps } from "./WorkPlaceEmployeeHeader.types.ts";
import { NavLink } from "react-router";

const WorkPlaceEmployeeHeader = ({ links }: WorkPlaceEmployeeHeaderProps) => {
  // const handleSidebar = () => setShowSideBar(true);

  return (
    <header className={styles.Header}>
      <div className={styles.HeaderLeft}>
        <h1>GoodsManufacturer</h1>
      </div>
      <nav>
        <ul className={styles.Nav}>
          {links.map((link) => {
            return <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.Active : "")}
                end
                to={`${link.link}`}
              >
                {link.title}
              </NavLink>
            </li>;
          })}
        </ul>
      </nav>
      <section className={styles.Profile}>
        <div className={styles.ProfileDiv}></div>
        <div className={styles.Show}>
          <p>Name: ABC</p>
          <p>Location: BCD</p>
          <Button primary>Log out</Button>
        </div>
      </section>
    </header>
  );
};

export default WorkPlaceEmployeeHeader;
