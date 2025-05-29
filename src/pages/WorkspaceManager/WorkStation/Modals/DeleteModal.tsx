import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import styles from "./Modal.module.scss";
import type { ModalProps } from "./Modal.types";
import { useContext } from "react";
import { WorkStationContext } from "../WorkStation.state";
import { deleteWorkStation } from "../../../../services/workstation.service";

const DeleteModal = ({ }: ModalProps) => {
  //context
  const {handleDeleteModal, getData, selected}= useContext(WorkStationContext)!;

  //delete Handler
  const handleDelete = async () => {
    try {
      const res = await deleteWorkStation(selected!.id);
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

        <h2>Delete WorkStation Manager</h2>
        <h5>Are You sure you want to delete this WorkStationManager?</h5>
        
        <Button danger onClick={handleDelete}>
          DELETE
        </Button>

      </div>

    </Modal>
  );
};

export default DeleteModal;
