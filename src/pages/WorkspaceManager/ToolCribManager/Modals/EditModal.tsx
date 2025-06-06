import styles from "./Modal.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import Modal from "../../../../components/Modal/Modal.tsx";
import {
  ToolCribManagerFormSchema,
  type ModalProps,
  type ToolCribManagerForm,
} from "./Modal.types.ts";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ToolCribManagerContext } from "../ToolCribManager.state.tsx";
import { editToolCribManagers } from "../../../../services/toolCribManager.service.ts";

const EditModal = ({}: ModalProps) => {
  const { hideEditModal, getData, selected, urlFilter } = useContext(
    ToolCribManagerContext
  )!;

  const { register, handleSubmit, formState } = useForm<ToolCribManagerForm>({
    defaultValues: {
      name: `${selected!.name}`,
      email: `${selected!.email}`,
    },
    resolver: zodResolver(ToolCribManagerFormSchema),
  });

  const EditFacility = async (data: ToolCribManagerForm) => {
    try {
      const res = await editToolCribManagers(data, selected!.id);
      if(!(res.status>=200 && res.status<300)){throw Error("EDIT unsuccessfull")}
      getData(urlFilter);
      toast.success("Tool Crib Manager Edited ");
    } catch (error) {
      toast.error("Sorry!! Tool Crib Manager Could not be Edited");
    } finally {
      hideEditModal();
    }
  };

  return (
    <Modal setShowModal={hideEditModal}>
      <form onSubmit={handleSubmit(EditFacility)} className={styles.Form}>
        <h2>Edit Tool Crib Manager</h2>

        <div>
          <label>Tool Crib Manager Name</label>
          <Input placeholder="Enter Tool Crib Manager Name" {...register("name")} />
          {!!formState.errors.name && (
            <small>{formState.errors.name.message}</small>
          )}
        </div>

        <div>
          <label>Tool Crib Manager Email</label>
          <Input placeholder="Enter Tool Crib Manager Email" {...register("email")} />
          {!!formState.errors.email && (
            <small>{formState.errors.email?.message}</small>
          )}
        </div>

        <Button type="submit">Edit</Button>
      </form>
    </Modal>
  );
};

export default EditModal;
