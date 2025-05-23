import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import { deleteFacilityManager } from "../../../../services/Admin/FacilityManager.service";
import type { ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss"
const DeleteModal = ({ handleModal, updateData,id }: ModalProps) => {

  const handleDelete = async () => {
    try {
      const res = await deleteFacilityManager(id!);
      updateData();
      toast.success("Facilty Manager Deleted Successfully");
    } catch (error) {
        toast.error("Facilty Manager Deletion Failed");
    }finally{
        handleModal();
    }
  };
  
  return (
    <Modal setShowModal={handleModal}>
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
