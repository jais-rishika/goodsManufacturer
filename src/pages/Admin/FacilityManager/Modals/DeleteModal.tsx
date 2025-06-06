import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import { deleteFacilityManager } from "../../../../services/FacilityManager.service";
import type { ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";
import { useContext } from "react";
import { FacilityManagerContext } from "../FacilityManagerPage/FacilityManager.state";
const DeleteModal = ({}: ModalProps) => {
  const { hideDeleteModal, getData, selected, urlFilter } = useContext(
    FacilityManagerContext
  )!;

  const handleDelete = async () => {
    try {
      await deleteFacilityManager(selected!.id);
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
        <h5>Are You sure you want to delete this FacilityManager?</h5>
        <Button danger onClick={handleDelete}>
          DELETE
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
