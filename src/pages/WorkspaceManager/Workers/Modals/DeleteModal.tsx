import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import type { ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";
import { useContext } from "react";
import { deleteWorkers } from "../../../../services/worker.service";
import { WorkersContext } from "../Workers.state";

const DeleteModal = ({}: ModalProps) => {
  const { handleDeleteModal, getData, selected, urlFilter } = useContext(
    WorkersContext
  )!;

  const handleDelete = async () => {
    try {
      const res = await deleteWorkers(selected!.id);
      getData(urlFilter);
      toast.success("Facilty Manager Deleted Successfully");
    } catch (error) {
      toast.error("Facilty Manager Deletion Failed");
    } finally {
      handleDeleteModal();
    }
  };

  return (
    <Modal setShowModal={handleDeleteModal}>
      <div className={styles.DeleteContainer}>
        <h2>Delete Worker</h2>
        <h5>Are You sure you want to delete this Workers?</h5>
        <Button danger onClick={handleDelete}>
          DELETE
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
