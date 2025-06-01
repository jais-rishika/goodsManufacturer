import styles from "./Modal.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Modal from "../../../../components/Modal/Modal";
import { SendToolFormSchema, type SendToolForm } from "./Modal.types";
import { sendTool } from "../../../../services/inventory.service";
import { ToolInventoryContext } from "../../../FacilityManager/ToolsInventory/ToolsInventory.state";

const ShowReqModal = () => {
  const { handleSendToolModal, selectedTool} =
    useContext(ToolInventoryContext)!;

  const { register, handleSubmit, formState } = useForm<SendToolForm>({
    resolver: zodResolver(SendToolFormSchema),
  });

  const handleSendTool = async (data: SendToolForm) => {
    try {
      const res = await sendTool(data);
      handleSendToolModal();
      toast.success("Tool Send Request Successful ");
    } catch (error) {
      toast.error("Sorry!! Tool Send Request Failed");
    }
  };

  return (
    <Modal setShowModal={handleSendToolModal}>
      <form onSubmit={handleSubmit(handleSendTool)} className={styles.Form}>
        <h2>Send Tool To Workplaces</h2>
        <div className={styles.Inputs}>
          <Input
            type="text"
            value={selectedTool?.name}
            {...register("workplace")}
          />
          {!!formState.errors.workplace && (
            <small>{formState.errors.workplace.message}</small>
          )}

          <Input
            type="number"
            placeholder="Enter Quantity"
            {...register("quantity")}
          />
          {!!formState.errors.quantity && (
            <small>{formState.errors.quantity?.message}</small>
          )}
        </div>

        <Button type="submit">Add</Button>
      </form>
    </Modal>
  );
};

export default ShowReqModal;
