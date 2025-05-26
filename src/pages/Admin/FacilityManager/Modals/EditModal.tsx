import styles from "./Modal.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import Modal from "../../../../components/Modal/Modal.tsx";
import {
  FacilityManagerFormSchema,
  type ModalProps,
  type FacilityManagerForm,
} from "./Modal.types.ts";
import { toast } from "react-toastify";
import { editFacilityManager } from "../../../../services/FacilityManager.service.ts";
import { useContext } from "react";
import { FacilityManagerContext } from "../FacilityManagerPage/FacilityManager.state.tsx";

const EditModal = ({}: ModalProps) => {
  const { handleEditModal, getData, selected } = useContext(
    FacilityManagerContext
  )!;

  const { register, handleSubmit, formState } = useForm<FacilityManagerForm>({
    defaultValues: {
      name: `${selected!.name}`,
      email: `${selected!.email}`,
    },
    resolver: zodResolver(FacilityManagerFormSchema),
  });

  const EditFacility = async (data: FacilityManagerForm) => {
    try {
      const res = await editFacilityManager(data, selected!.id);
      getData();
      toast.success("Facility Manager Edited ");
    } catch (error) {
      toast.error("Sorry!! Facility Manager Could not be Edited");
    } finally {
      handleEditModal();
    }
  };

  return (
    <Modal setShowModal={handleEditModal}>
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
