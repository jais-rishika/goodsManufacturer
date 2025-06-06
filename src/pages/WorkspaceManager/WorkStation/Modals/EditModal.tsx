import styles from "./Modal.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import Modal from "../../../../components/Modal/Modal.tsx";
import {
  WorkStationFormSchema,
  type ModalProps,
  type WorkStationForm,
} from "./Modal.types.ts";
import { toast } from "react-toastify";
import { WorkStationContext } from "../WorkStation.state.tsx";
import { useContext, useEffect } from "react";
import SearchableComponents from "../../../../components/SearchableComponents/SearchableComponents.tsx";
import { editWorkStation } from "../../../../services/workstation.service.ts";

const EditModal = ({}: ModalProps) => {
  //context
  const {
    hideEditModal,
    getData,
    selected,
    availFields,
    setAvailFields,
    urlFilter,
    selectedManager,
    updateManager,
  } = useContext(WorkStationContext)!;
  console.log(selected);

  //useForm
  const { register, handleSubmit, formState } = useForm<WorkStationForm>({
    defaultValues: {
      name: `${selected!.name}`,
      workerEmail: `${selected!.workerEmail}`,
    },
    resolver: zodResolver(WorkStationFormSchema),
  });

  //formSubmit
  const EditWorkStation = async (data: WorkStationForm) => {
    data["workerEmail"] = selectedManager! || selected!.workerEmail;

    try {
      const res = await editWorkStation(data, selected!.id);
      getData(urlFilter);
      toast.success("WorkStation  Edited ");
    } catch (error) {
      toast.error("Sorry!! WorkStation  Could not be Edited");
    } finally {
      hideEditModal();
    }
  };

  // useEffect
  useEffect(() => {
    setAvailFields("");
    updateManager(selected!.workerEmail);
  }, []);
  return (
    <Modal setShowModal={hideEditModal}>
      <form onSubmit={handleSubmit(EditWorkStation)} className={styles.Form}>
        <h2>Edit WorkStation</h2>

        <Input placeholder="Enter WorkStation Name" {...register("name")} />
        {!!formState.errors.name && (
          <small>{formState.errors.name.message}</small>
        )}

        <SearchableComponents
          setFieldValue={updateManager}
          availFields={availFields}
          setAvailFields={setAvailFields}
          toSearch={"Email"}
          selectedField={selected!.workerEmail}
        />
        {!!formState.errors.workerEmail && (
          <small>{formState.errors.workerEmail?.message}</small>
        )}

        <Button type="submit">Edit</Button>
      </form>
    </Modal>
  );
};

export default EditModal;
