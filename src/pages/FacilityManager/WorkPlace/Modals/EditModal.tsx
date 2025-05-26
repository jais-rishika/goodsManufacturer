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

const EditModal = ({
  handleModal,
  updateData,
  name,
  email,
  id,
}: ModalProps) => {
  const { register, handleSubmit, formState } = useForm<FacilityManagerForm>({
    defaultValues: {
      name: `${name}`,
      email: `${email}`,
    },
    resolver: zodResolver(FacilityManagerFormSchema),
  });

  const EditFacility = async (data: FacilityManagerForm) => {
    try {
      const res = await editFacilityManager(data, id!);
      updateData();
      toast.success("Facility Manager Edited ");
    } catch (error) {
      toast.error("Sorry!! Facility Manager Could not be Edited");
    } finally {
      handleModal();
    }
  };

  return (
    <Modal setShowModal={handleModal}>
      <form onSubmit={handleSubmit(EditFacility)} className={styles.Form}>
        <h2>Edit Facility Manager</h2>
        <Input
          placeholder="Enter Facility Name"
          {...register("name")}
          defaultValue={name}
        />
        {!!formState.errors.name && (
          <small>{formState.errors.name.message}</small>
        )}
        <Input
          placeholder="Enter Facility Email"
          {...register("email")}
          defaultValue={email}
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
