import styles from "./Modal.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import Modal from "../../../../components/Modal/Modal.tsx";
import {
  type ModalProps,
  type WorkPlaceForm,
  WorkPlaceFormSchema,
} from "./Modal.types.ts";
import { toast } from "react-toastify";

import SearchableComponents from "../../../../components/SearchableComponents/SearchableComponents.tsx";
import { editWorkPlace } from "../../../../services/workplace.service.ts";
import { useContext } from "react";
import { WorkPlaceContext } from "../WorkPlace.state.tsx";

const EditModal = ({
  
}: ModalProps) => {
  //useContext
    const {availFields,setAvailFields,hideEditModal,getData,urlFilter,selectedManager,updateManager,selected}=useContext(WorkPlaceContext)!
    console.log(selected);
    
  const { register, handleSubmit, formState } 
  = useForm<WorkPlaceForm>({
    defaultValues: {
      name: selected?.name,
      workplaceManagerEmail: selected?.workplaceManagerEmail
    },
    resolver: zodResolver(WorkPlaceFormSchema),
  });

  const EditFacility = async (data: WorkPlaceForm) => {
    data["workplaceManagerEmail"] = selectedManager! ||  selected?.workplaceManagerEmail;
    try {
      await editWorkPlace(data, selected.id!);
      getData(urlFilter);
      toast.success("Facility Manager Edited ");
    } catch (error) {
      toast.error("Sorry!! Facility Manager Could not be Edited");
    } finally {
      hideEditModal();
    }
  };

  return (
    <Modal setShowModal={hideEditModal}>
      <form onSubmit={handleSubmit(EditFacility)} className={styles.Form}>
        <h2>Edit Facility Manager</h2>
        <Input placeholder="Enter Facility Name" {...register("name")} />
        {!!formState.errors.name && (
          <small>{formState.errors.name.message}</small>
        )}

        <SearchableComponents
          setFieldValue={updateManager}
          availFields={availFields!}
          setAvailFields={setAvailFields!}
          toSearch={"Email"}
          selectedField={selected?.workplaceManagerEmail}
        />
        {!!formState.errors.workplaceManagerEmail && (
          <small>{formState.errors.workplaceManagerEmail?.message}</small>
        )}
        <Button type="submit">Edit</Button>
      </form>
    </Modal>
  );
};

export default EditModal;
