import styles from "./Modal.module.scss";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../../../components/Modal/Modal.tsx";
import {
  WorkersFormSchema,
  type ModalProps,
  type WorkersForm,
} from "./Modal.types.ts";
import { toast } from "react-toastify";
import { useContext } from "react";
import { WorkersContext } from "../Workers.state.tsx";
import { addWorkers } from "../../../../services/worker.service.ts";

const AddModal = ({}: ModalProps) => {
  const {handleAddModal, getData, urlFilter}= useContext(WorkersContext)!;

  const { register, handleSubmit, formState } = useForm<WorkersForm>({
    resolver: zodResolver(WorkersFormSchema),
  });

  const handleAddWorkers = async (data: WorkersForm) => {
    try {
      const res = await addWorkers(data);
      if(!(res.status>=200 && res.status<300)){throw Error("ADD unsuccessfull")}
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
        onSubmit={handleSubmit(handleAddWorkers)}
        className={styles.Form}
      >
        <h2>Add Worker</h2>
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
