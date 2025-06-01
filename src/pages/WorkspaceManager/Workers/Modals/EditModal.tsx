import styles from "./Modal.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import Modal from "../../../../components/Modal/Modal.tsx";
import {
  WorkersFormSchema,
  type ModalProps,
  type WorkersForm,
} from "./Modal.types.ts";
import { toast } from "react-toastify";
import { useContext } from "react";
import { WorkersContext } from "../Workers.state.tsx";
import { editWorkers } from "../../../../services/worker.service.ts";

const EditModal = ({}: ModalProps) => {
  const { hideEditModal, getData, selected, urlFilter } = useContext(
    WorkersContext
  )!;

  const { register, handleSubmit, formState } = useForm<WorkersForm>({
    defaultValues: {
      name: `${selected!.name}`,
      email: `${selected!.email}`,
    },
    resolver: zodResolver(WorkersFormSchema),
  });

  const EditWorker = async (data: WorkersForm) => {
    try {
      const res = await editWorkers(data, selected!.id);
      getData(urlFilter);
      toast.success("Worker Edited ");
    } catch (error) {
      toast.error("Sorry!! Worker Could not be Edited");
    } finally {
      hideEditModal();
    }
  };

  return (
    <Modal setShowModal={hideEditModal}>
      <form onSubmit={handleSubmit(EditWorker)} className={styles.Form}>
        <h2>Edit Wormker</h2>

        <div>
          <label>Worker Name</label>
          <Input placeholder="Enter Worker Name" {...register("name")} />
          {!!formState.errors.name && (
            <small>{formState.errors.name.message}</small>
          )}
        </div>

        <div>
          <label>Worker Email</label>
          <Input placeholder="Enter Worker Email" {...register("email")} />
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
