import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import { deleteFacilityManager } from "../../../../services/FacilityManager.service";
import type { ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";
import { WorkPlaceManagerContext } from "../WorkPlaceManager.state";
import { useContext } from "react";
import { deleteWorkPlaceManager } from "../../../../services/workplaceManager.service";

const DeleteModal = ({}: ModalProps) => {
  const { hideDeleteModal, getData, selected, urlFilter } = useContext(
    WorkPlaceManagerContext
  )!;

  const handleDelete = async () => {
    try {
      const res = await deleteWorkPlaceManager(selected?.id!);
      getData(urlFilter);
      toast.success("WorkPlace Manager Deleted Successfully");
    } catch (error) {
      toast.error("WorkPlace Manager Deletion Failed");
    } finally {
      hideDeleteModal();
    }
  };

  return (
    <Modal setShowModal={hideDeleteModal}>
      <div className={styles.DeleteContainer}>
        <h2>Delete WorkPlace Manager</h2>
        <h5>Are You sure you want to delete this WorkPlace Manager?</h5>
        <Button danger onClick={handleDelete}>
          DELETE
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
