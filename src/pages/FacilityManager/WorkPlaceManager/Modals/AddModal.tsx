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
import { toast } from "react-toastify";
import { useContext } from "react";
import { WorkPlaceManagerContext } from "../WorkPlaceManager.state.tsx";
import { addWorkPlaceManager } from "../../../../services/workplaceManager.service.ts";

const AddModal = ({}: ModalProps) => {

  const {handleAddModal,getData,urlFilter}= useContext(WorkPlaceManagerContext)!;

  const { register, handleSubmit, formState } = useForm<FacilityManagerForm>({
    resolver: zodResolver(FacilityManagerFormSchema),
  });

  const handleAddFacilityManager = async (data: FacilityManagerForm) => {
    try {
      const res = await addWorkPlaceManager(data);
      if(!(res.status>=200 && res.status<300)){throw Error("Fetch unsuccessfull")}
      handleAddModal();
      getData(urlFilter);
      toast.success("Facility Manager Added ")
    } catch (error) {
      toast.error("Sorry!! Facility Manager Could not be Added")
    }
  };

  return (
    <Modal setShowModal={handleAddModal}>
      <form
        onSubmit={handleSubmit(handleAddFacilityManager)}
        className={styles.Form}
      >
        <h2>Add WorkPlace Manager</h2>
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
