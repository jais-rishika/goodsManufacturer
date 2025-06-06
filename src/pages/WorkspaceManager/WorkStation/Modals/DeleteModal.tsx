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
  const {hideDeleteModal, getData, selected}= useContext(WorkStationContext)!;

  //delete Handler
  const handleDelete = async () => {
    try {
      const res = await deleteWorkStation(selected!.id);
      if(!(res.status>=200 && res.status<300)){throw Error("DELETE unsuccessfull")}
      getData();
      toast.success("WorkStation Deleted Successfully");
    } catch (error) {
      toast.error("WorkStation Deletion Failed");
    } finally {
      hideDeleteModal();
    }
  };
  
  return (
    <Modal setShowModal={hideDeleteModal}>

      <div className={styles.DeleteContainer}>

        <h2>Delete WorkStation </h2>
        <h5>Are You sure you want to delete this WorkStation?</h5>
        
        <Button danger onClick={handleDelete}>
          DELETE
        </Button>

      </div>

    </Modal>
  );
};

export default DeleteModal;
