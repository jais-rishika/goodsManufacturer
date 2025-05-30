import styles from "./Modal.module.scss";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../../../components/Modal/Modal.tsx";
import {
  type ModalProps,
  type WorkPlaceForm,
  WorkPlaceFormSchema,
} from "./Modal.types.ts";
import { toast } from "react-toastify";
import { WorkPlaceContext } from "../WorkPlace.state.tsx";
import { useContext, useEffect } from "react";
import SearchableComponents from "../../../../components/SearchableComponents/SearchableComponents.tsx";
import { addWorkPlace } from "../../../../services/workplace.service.ts";

const AddModal = ({}: ModalProps) => {
  const { register, handleSubmit, formState } = useForm<WorkPlaceForm>({
    resolver: zodResolver(WorkPlaceFormSchema),
  });

  const {
    availFields,
    setAvailFields,
    handleAddModal,
    getData,
    urlFilter,
    selectedManager,
    updateManager,
  } = useContext(WorkPlaceContext)!;

  //useEffect
    useEffect(() => {
      setAvailFields("");
    }, []);

  const handleAddWorkPlace = async (data: WorkPlaceForm) => {
    if(!selectedManager){
      alert("ADD WorkPlace Manager")
    }
    data["workplaceManagerEmail"]=selectedManager!;
    console.log(data);
    
    try {
      const res = await addWorkPlace(data);
      handleAddModal();
      getData(urlFilter);
      toast.success("Facility Manager Added ");
    } catch (error) {
      toast.error("Sorry!! Facility Manager Could not be Added");
    }
  };

  return (
    <Modal setShowModal={handleAddModal}>
      <form
        onSubmit={handleSubmit(handleAddWorkPlace)}
        className={styles.Form}
      >
        <h2>Add WorkPlace</h2>
        <Input type="text" placeholder="Enter name" {...register("name")} />
        {!!formState.errors.name && (
          <small>{formState.errors.name.message}</small>
        )}
        <SearchableComponents
          setFieldValue={updateManager}
          availFields={availFields!}
          setAvailFields={setAvailFields!}
          toSearch={"Email"}
        />
        {!!formState.errors.workplaceManagerEmail && (
          <small>{formState.errors.workplaceManagerEmail?.message}</small>
        )}
        <Button type="submit">Add</Button>
      </form>
    </Modal>
  );
};

export default AddModal;
