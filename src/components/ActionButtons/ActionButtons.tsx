import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./ActionButtons.module.scss";
import type { ActionButtonsProps } from "./ActionButtons.types.ts";
import Button from "../Button/Button.tsx";

const ActionButtons = <T extends {}>(props: ActionButtonsProps<T>) => {
  const {
    item,
    setSelectedItem,
    setShowDeleteModal,
    setShowEditModal,
    className,
  } = props;
  const handleEdit = () => {
    setSelectedItem(item);
    setShowEditModal(true);
  };
  const handleDelete = () => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };
  return (
    <div className={className}>
      <Button className={styles.editBtn} onClick={handleEdit}>
        <FaEdit />
      </Button>

      <Button className={styles.deleteBtn} onClick={handleDelete}>
        <FaTrash />
      </Button>
    </div>
  );
};

export default ActionButtons;
