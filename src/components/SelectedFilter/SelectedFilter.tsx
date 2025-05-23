import { FaX } from "react-icons/fa6";
import styles from "./SelectedFilter.module.scss";
import type { SelectedFilterProps } from "./SelectedFilter.types.ts";

const SelectedFilter = ({ text }: SelectedFilterProps) => {
  const removeFromFilter = () => {};
  return (
    <div className={styles.SelectedFilter}>
      <small>{text}</small>
      <FaX className={styles.Cross} onClick={removeFromFilter} />
    </div>
  );
};

export default SelectedFilter;
