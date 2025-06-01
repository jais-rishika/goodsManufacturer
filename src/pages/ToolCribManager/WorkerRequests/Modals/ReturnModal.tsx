import { useContext, useRef } from "react";
import Modal from "../../../../components/Modal/Modal";
import { WorkersRequestsContext } from "../WorkerRequests.states";
import Input from "../../../../components/Input/Input";
import { returnTool } from "../../../../services/Requests.service";
import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import styles from "../WorkerRequests.module.scss"
const ReturnModal = () => {
  const { handleReturnModal, selectedRequest } = useContext(
    WorkersRequestsContext
  )!;
  const itemCountRef = useRef<HTMLInputElement>(null);

  const handleReturn = async () => {
    const returnedQty=itemCountRef.current?.value;
    if(returnedQty){
        if(+returnedQty>selectedRequest!.reqQuantity) return alert("Return Qty can be more than Allocated")
        if(+returnedQty<1) return alert("Returned Quantity can't be less than 0")
    }
    try {
      const payload = {
        requestItemId: selectedRequest!.requestItemId,
        returnQuantity: itemCountRef.current?.value,
        actualReturnDate: new Date(),
      };
      const res = await returnTool(payload);
      toast.success("Tools Returned");
    } catch (error) {
      toast.error("Tools Return Failed");
    }finally{
        handleReturnModal()
    }
  };
  
  return (
    <Modal setShowModal={handleReturnModal}>
      <div className={styles.Modal}>
        <h2>Return Item</h2>
        <p>
          Total item quantity alloted to worker: {selectedRequest?.reqQuantity}
        </p>
        <Input placeholder="returned item Quantity" ref={itemCountRef} type="number" min={0} max={selectedRequest?.reqQuantity}/>
        <Button primary onClick={handleReturn}>
          RETURN
        </Button>
      </div>
    </Modal>
  );
};

export default ReturnModal;
