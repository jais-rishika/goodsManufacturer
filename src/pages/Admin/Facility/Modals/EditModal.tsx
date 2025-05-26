import styles from "./Modal.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import Modal from "../../../../components/Modal/Modal.tsx";
import {
  FacilityFormSchema,
  type ModalProps,
  type FacilityForm,
} from "./Modal.types.ts";
import { toast } from "react-toastify";
import { editFacility } from "../../../../services/Facility.service.ts";
import { FacilityContext } from "../FacilityPage/FacilityPage.state.tsx";
import { useContext, useEffect } from "react";
import SearchableComponents from "../../../../components/SearchableComponents/SearchableComponents.tsx";

const EditModal = ({
}: ModalProps) => {
  //context
  const {handleEditModal,getData, selected, availFields, setAvailFields}=useContext(FacilityContext)!;
  
  //useForm
  const { register, handleSubmit, formState } = useForm<FacilityForm>({
    defaultValues: {
      name: `${selected!.name}` ,
      address: `${selected!.address}`,
    },
    resolver: zodResolver(FacilityFormSchema),
  });

  //formSubmit
  const EditFacility = async (data: FacilityForm) => {
    console.log("edit",data);
    
    try {
      const res = await editFacility({...data}, selected!.id);
      getData();
      toast.success("Facility  Edited ");
    } catch (error) {
      toast.error("Sorry!! Facility  Could not be Edited");
    } finally {
      handleEditModal();
    }
  };

  // useEffect
  useEffect(()=>{
    setAvailFields("")
  },[])
  return (
    <Modal setShowModal={handleEditModal}>

      <form onSubmit={handleSubmit(EditFacility)} className={styles.Form}>

        <h2>Edit Facility</h2>

        <Input placeholder="Enter Facility Name" {...register("name")} />
        {!!formState.errors.name && (
          <small>{formState.errors.name.message}</small>
        )}

        <Input
          placeholder="Enter Facility Location"
          {...register("address")}
        />
        {!!formState.errors.name && (
          <small>{formState.errors.address?.message}</small>
        )}

        <SearchableComponents availFields={availFields} setAvailFields={setAvailFields} toSearch={"Email"}/>
         {!!formState.errors.facilityManagerEmail && (
          <small>{formState.errors.facilityManagerEmail?.message}</small>
        )}

        <Button type="submit">Edit</Button>

      </form>
    </Modal>
  );
};

export default EditModal;
