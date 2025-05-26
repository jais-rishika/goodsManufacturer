import styles from "./Modal.module.scss";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../../../components/Modal/Modal.tsx";
import {
  FacilityManagerFormSchema,
  type ModalProps,
  type FacilityManagerForm,
} from "./Modal.types.ts";
import { addFacilityManager } from "../../../../services/FacilityManager.service.ts";
import { toast } from "react-toastify";
import { WorkPlaceContext } from "../WorkPlace.state.tsx";
import { useContext } from "react";

const AddModal = ({ }: ModalProps) => {
  const { register, handleSubmit, formState } = useForm<FacilityManagerForm>({
    resolver: zodResolver(FacilityManagerFormSchema),
  });

  const {handleModal,updateData}=useContext(WorkPlaceContext)!;

  const handleAddFacilityManager = async (data: FacilityManagerForm) => {
    try {
      const res = await addFacilityManager(data);
      handleModal();
      updateData();
      toast.success("Facility Manager Added ")
    } catch (error) {
      toast.error("Sorry!! Facility Manager Could not be Added")
    }
  };

  return (
    <Modal setShowModal={handleModal}>
      <form
        onSubmit={handleSubmit(handleAddFacilityManager)}
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
