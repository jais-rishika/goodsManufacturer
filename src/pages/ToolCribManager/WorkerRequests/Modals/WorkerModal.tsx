import { useContext } from "react";
import Modal from "../../../../components/Modal/Modal";
import { WorkersRequestsContext } from "../WorkerRequests.states";
import styles from "./Modal.module.scss"
const WorkerModal = () => {
  const { handleWorkerDetailModal, selectedWorker } = useContext(
    WorkersRequestsContext
  )!;
  console.log(selectedWorker);
  
  return (
    <Modal setShowModal={handleWorkerDetailModal}>
      <div className={styles.Modal}>
        <div className={styles.Detail}>
          <p>
            NAME: <span>{selectedWorker?.workerName}</span>
          </p>
          <p>
            EMAIL: <span>{selectedWorker?.workerEmail}</span>
          </p>
        </div>
        <div className={styles.ImgContainer}>
          <img src={selectedWorker?.workerImageUrl} />
        </div>
      </div>
    </Modal>
  );
};

export default WorkerModal;
