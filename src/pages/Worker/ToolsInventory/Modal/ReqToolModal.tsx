import styles from "./Modal.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Modal from "../../../../components/Modal/Modal";
import {
  ToolInventoryContext,
  withToolInventory,
} from "../ToolsInventory.state";
import { ReqToolFormSchema, type ReqToolForm } from "./Modal.types";
import type { ReqTable } from "../ToolsInventory.types";
import { FaEdit, FaTrash } from "react-icons/fa";
import ShowReqModal from "../../../WorkspaceManager/Inventory/Modal/ReqToolModal";

const ReqToolModal = () => {
  const { handleReqToolModal, selectedTool, reqTableData, updateReqTable } =
    useContext(ToolInventoryContext)!;

  const { register, handleSubmit, formState } = useForm<ReqToolForm>({
    resolver: zodResolver(ReqToolFormSchema),
  });

  const handleDelete = (idx: number) => {
    const newTable = reqTableData;
    newTable.splice(idx, 1);
    updateReqTable(newTable);
  };

  const handleReqTool = async (data: ReqToolForm) => {
    const newTable = reqTableData;

    const reqIdx = newTable.findIndex((val) => val.id === selectedTool!.id);

    if (reqIdx !== -1) {
      newTable[reqIdx].qty += data.quantity;
    } else {
      const payload: ReqTable = {
        idx: reqTableData.length + 1,
        qty: +data.quantity,
        id: selectedTool!.id,
        name: data.toolName,
        action: (
          <Button onClick={() => handleDelete(reqTableData.length)}>
            <FaTrash />
          </Button>
        ),
      };
      
      newTable.push(payload);
    }
    updateReqTable(newTable);

    toast.success("Tool Added");
    ShowReqModal();
  };

  return (
    <Modal setShowModal={ShowReqModal}>
      <form onSubmit={handleSubmit(handleReqTool)} className={styles.Form}>
        <h2>Req Tool To ToolCrib</h2>

        <div className={styles.Inputs}>
          <div>
            <Input
              type="text"
              value={selectedTool?.name}
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

        <Button type="submit">Add To Req</Button>
      </form>
    </Modal>
  );
};

export default withToolInventory(ReqToolModal);
