import styles from "./Modal.module.scss";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import {
  addFacility,
} from "../../../../services/Facility.service.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../../../components/Modal/Modal.tsx";
import {
  FacilityFormSchema,
  type FacilityForm,
  type ModalProps,
} from "./Modal.types.ts";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import SearchableComponents from "../../../../components/SearchableComponents/SearchableComponents.tsx";
import { FacilityContext } from "../FacilityPage/FacilityPage.state.tsx";

const AddModal = ({

}: ModalProps) => {
  //useContext
  const {availFields,setAvailFields,handleAddModal,getData,}=useContext(FacilityContext)!

  //useForm
  const { register, handleSubmit, formState } = useForm<FacilityForm>({
    resolver: zodResolver(FacilityFormSchema),
  });

  //formSubmit
  const handleAddFacility = async (data: FacilityForm) => {
    try {
      const res = await addFacility(data);
      handleAddModal();
      getData();
      toast.success("Facility Added ");
    } catch (error) {
      toast.error("Sorry!! Facility Could not be Added");
    }
  };

  //useEffect
  useEffect(() => {
    setAvailFields("");
  }, []);

  return (
    <Modal setShowModal={handleAddModal}>
      <form onSubmit={handleSubmit(handleAddFacility)} className={styles.Form}>

        <h2>Add Facility</h2>

        <Input placeholder="Enter Facility Name" {...register("name")} />
        {!!formState.errors.name && (
          <small>{formState.errors.name.message}</small>
        )}

        <Input placeholder="Enter Facility Location" {...register("address")} />
        {!!formState.errors.name && (
          <small>{formState.errors.address?.message}</small>
        )}

        <SearchableComponents availFields={availFields!} setAvailFields={setAvailFields!} toSearch={"Email"}/>
         {!!formState.errors.facilityManagerEmail && (
          <small>{formState.errors.facilityManagerEmail?.message}</small>
        )}

        <Button type="submit">Add</Button>
        
      </form>
    </Modal>
  );
};

export default AddModal;
