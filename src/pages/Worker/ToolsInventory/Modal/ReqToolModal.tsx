import styles from "./Modal.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext} from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Modal from "../../../../components/Modal/Modal";
import { ToolInventoryContext } from "../ToolsInventory.state";
import { ReqToolFormSchema, type ReqToolForm } from "./Modal.types";
import type { ReqTable } from "../ToolsInventory.types";
import { toast } from "react-toastify";

const ReqToolModal = () => {
  const { hideReqToolModal, updateReqTable, selectedTool, reqTableData } =
    useContext(ToolInventoryContext)!;

  const { register, handleSubmit, formState } = useForm<ReqToolForm>({
    resolver: zodResolver(ReqToolFormSchema),
  });

  
  const handleReqTool = async (data: ReqToolForm) => {
    const newTable = [...reqTableData];

    const reqIdx = newTable.findIndex((val) => val.id === selectedTool!.toolId);

    if (reqIdx !== -1) {
      newTable[reqIdx].qty += data.quantity;
    } else {
      const payload: ReqTable = {
        qty: +data.quantity,
        id: selectedTool!.toolId,
        name: data.toolName,
      };      
      
      newTable.push(payload);
    }

    updateReqTable(newTable);

    toast.success("Tool Added");
    hideReqToolModal();
  };

  return (
    <Modal setShowModal={hideReqToolModal}>
      <form onSubmit={handleSubmit(handleReqTool)} className={styles.Form}>
        <h2>Req Tool To Workplaces</h2>
        <div className={styles.Inputs}>
          <div>
            <Input
              type="text"
              value={selectedTool!.toolName}
              {...register("toolName")}
            />
            {!!formState.errors.toolName && (
              <small>{formState.errors.toolName.message}</small>
            )}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Enter Quantity"
              {...register("quantity", { valueAsNumber: true })}
            />
            {!!formState.errors.quantity && (
              <small>{formState.errors.quantity?.message}</small>
            )}
          </div>
        </div>
        <Button type="submit">Req</Button>
      </form>
    </Modal>
  );
};

export default ReqToolModal;
