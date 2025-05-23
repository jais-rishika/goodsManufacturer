import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import { deleteFacility } from "../../../../services/Admin/Facility.service";
import styles from "./Modal.module.scss";
import type { ModalProps } from "./Modal.types";
import { useContext } from "react";
import { FacilityContext } from "../FacilityPage/FacilityPage.state";

const DeleteModal = ({ }: ModalProps) => {
  //context
  const {handleDeleteModal, getData, selected}= useContext(FacilityContext)!;

  //delete Handler
  const handleDelete = async () => {
    try {
      const res = await deleteFacility(selected!.id);
      getData();
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
