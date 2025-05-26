import styles from "./Modal.module.scss"
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Modal from "../../../../components/Modal/Modal";
import { SendToolFormSchema, type SendToolForm } from "./Modal.types";
import {sendTool} from "../../../../services/tools.service"
import { ToolInventoryContext } from "../ToolsInventory.state";
import SearchableComponents from "../../../../components/SearchableComponents/SearchableComponents";

const SendToolsModal = () => {
  const { handleSendToolModal ,setAvailFields, availFields} = useContext(ToolInventoryContext)!;

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
      <form
        onSubmit={handleSubmit(handleSendTool)}
        className={styles.Form}
      >
        <h2>Send Tool To Workplaces</h2>
        <Input type="text" placeholder="Enter name" {...register("workplace")} />
        {!!formState.errors.workplace && (
          <small>{formState.errors.workplace.message}</small>
        )}

        <SearchableComponents availFields={availFields} setAvailFields={setAvailFields} toSearch={"WorkPlace"}/>

        <Input type="email" placeholder="Enter email" {...register("quantity")} />
        {!!formState.errors.quantity && (
          <small>{formState.errors.quantity?.message}</small>
        )}

        <Button type="submit">Add</Button>
      </form>
    </Modal>
  );
};

export default SendToolsModal;
