import { FaBars } from "react-icons/fa";
import Button from "../Button/Button.tsx";
import styles from "./Header.module.scss";
import type { HeaderProps } from "./Header.types.ts";
import { useNavigate } from "react-router";

const Header = ({ setShowSideBar }: HeaderProps) => {
  const navigate=useNavigate();
  const handleSidebar = () => setShowSideBar(true);
  const logOut=()=>{
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <header className={styles.Header}>
      <div className={styles.HeaderLeft}>
        <Button primary className={styles.Bar} onClick={handleSidebar}>
          <FaBars />
        </Button>
        <h1>GoodsManufacturer</h1>
      </div>
      <Button primary onClick={logOut}>Log out</Button>
    </header>
  );
};

export default Header;
