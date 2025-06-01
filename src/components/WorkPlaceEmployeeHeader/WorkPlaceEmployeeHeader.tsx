import Button from "../Button/Button.tsx";
import styles from "./WorkPlaceEmployeeHeader.module.scss";
import type { WorkPlaceEmployeeHeaderProps } from "./WorkPlaceEmployeeHeader.types.ts";
import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { HeaderContext, withHeaderContext } from "./WorkPlace.state.tsx";
import UploadImageModal from "./uploadImageModal.tsx";

const WorkPlaceEmployeeHeader = ({ links }: WorkPlaceEmployeeHeaderProps) => {
  const { handleModal, modalStatus } = useContext(HeaderContext)!;
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <>
      <header className={styles.Header}>
        <div className={styles.HeaderLeft}>
          <h1>GoodsManufacturer</h1>
        </div>
        <nav>
          <ul className={styles.Nav}>
            {links.map((link) => {
              return (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? styles.Active : ""
                    }
                    end
                    to={`${link.link}`}
                  >
                    {link.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <section className={styles.Profile}>
          <div className={styles.ProfileDiv}></div>
          <div className={styles.Show}>
            <Button primary onClick={handleModal}>
              Upload Image
            </Button>
            <Button primary onClick={logout}>Log out</Button>
          </div>
        </section>
      </header>
      {modalStatus && <UploadImageModal />}
    </>
  );
};

export default withHeaderContext(WorkPlaceEmployeeHeader);
