import styles from "./Modal.module.scss";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../../../components/Modal/Modal.tsx";
import {
  ToolCribManagerFormSchema,
  type ModalProps,
  type ToolCribManagerForm,
} from "./Modal.types.ts";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ToolCribManagerContext } from "../ToolCribManager.state.tsx";
import { addToolCribManagers } from "../../../../services/toolCribManager.service.ts";

const AddModal = ({}: ModalProps) => {
  const {handleAddModal, getData, urlFilter}= useContext(ToolCribManagerContext)!;

  const { register, handleSubmit, formState } = useForm<ToolCribManagerForm>({
    resolver: zodResolver(ToolCribManagerFormSchema),
  });

  const handleAddToolCribManager = async (data: ToolCribManagerForm) => {
    try {
      const res = await addToolCribManagers(data);
      getData(urlFilter);
      toast.success("Facility Manager Added ")
    } catch (error) {
      toast.error("Sorry!! Facility Manager Could not be Added")
    }finally{
      handleAddModal();
    }
  };

  return (
    <Modal setShowModal={handleAddModal}>
      <form
        onSubmit={handleSubmit(handleAddToolCribManager)}
        className={styles.Form}
      >
        <h2>Add Facility Manager</h2>
        <Input type="text" placeholder="Enter name" {...register("name")} />
        {!!formState.errors.name && (
          <small>{formState.errors.name.message}</small>
        )}

        <Input type="email" placeholder="Enter email" {...register("email")} />
        {!!formState.errors.email && (
          <small>{formState.errors.email?.message}</small>
        )}
        
        <Button type="submit">Add</Button>
      </form>
    </Modal>
  );
};

export default AddModal;
