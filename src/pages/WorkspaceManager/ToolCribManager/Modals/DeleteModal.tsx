import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import type { ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";
import { useContext } from "react";
import { ToolCribManagerContext } from "../ToolCribManager.state";
import { deleteToolCribManagers } from "../../../../services/toolCribManager.service";

const DeleteModal = ({}: ModalProps) => {
  const { hideDeleteModal, getData, selected, urlFilter } = useContext(
    ToolCribManagerContext
  )!;

  const handleDelete = async () => {
    try {
      const res = await deleteToolCribManagers(selected!.id);
      getData(urlFilter);
      toast.success("Facilty Manager Deleted Successfully");
    } catch (error) {
      toast.error("Facilty Manager Deletion Failed");
    } finally {
      hideDeleteModal();
    }
  };

  return (
    <Modal setShowModal={hideDeleteModal}>
      <div className={styles.DeleteContainer}>
        <h2>Delete Facility Manager</h2>
        <h5>Are You sure you want to delete this ToolCribManager?</h5>
        <Button danger onClick={handleDelete}>
          DELETE
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
