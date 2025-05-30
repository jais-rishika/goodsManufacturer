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
import { WorkPlaceManagerContext } from "../WorkPlaceManager.state.tsx";
import { useContext } from "react";
import { editWorkPlaceManager } from "../../../../services/workplaceManager.service.ts";

const EditModal = ({}: ModalProps) => {
  const { handleEditModal, getData,handleSelect, selected, urlFilter } = useContext(
    WorkPlaceManagerContext
  )!;

  const { register, handleSubmit, formState } = useForm<FacilityManagerForm>({
    defaultValues: {
      name: `${selected?.name}`,
      email: `${selected?.email}`,
    },
    resolver: zodResolver(FacilityManagerFormSchema),
  });

  const EditFacility = async (data: FacilityManagerForm) => {
    try {
      const res = await editWorkPlaceManager(data, selected?.id!);
      getData(urlFilter);
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
        <h2>Edit WorkPlace Manager</h2>
        <Input
          placeholder="Enter Facility Name"
          {...register("name")}
        />
        {!!formState.errors.name && (
          <small>{formState.errors.name.message}</small>
        )}
        <Input
          placeholder="Enter Facility Email"
          {...register("email")}
        />
        {!!formState.errors.email && (
          <small>{formState.errors.email?.message}</small>
        )}
        <Button type="submit">Edit</Button>
      </form>
    </Modal>
  );
};

export default EditModal;
