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
      getData(urlFilter);
      toast.success("Facility Manager Edited ");
    } catch (error) {
      toast.error("Sorry!! Facility Manager Could not be Edited");
    } finally {
      hideEditModal();
    }
  };

  return (
    <Modal setShowModal={hideEditModal}>
      <form onSubmit={handleSubmit(EditFacility)} className={styles.Form}>
        <h2>Edit Facility Manager</h2>

        <div>
          <label>Facility Name</label>
          <Input placeholder="Enter Facility Name" {...register("name")} />
          {!!formState.errors.name && (
            <small>{formState.errors.name.message}</small>
          )}
        </div>

        <div>
          <label>Facility Email</label>
          <Input placeholder="Enter Facility Email" {...register("email")} />
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
