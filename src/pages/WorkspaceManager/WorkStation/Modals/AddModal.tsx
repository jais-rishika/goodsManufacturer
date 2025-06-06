import styles from "./Modal.module.scss";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../../../components/Modal/Modal.tsx";
import {
  WorkStationFormSchema,
  type WorkStationForm,
  type ModalProps,
} from "./Modal.types.ts";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import SearchableComponents from "../../../../components/SearchableComponents/SearchableComponents.tsx";
import { WorkStationContext } from "../WorkStation.state.tsx";
import { addWorkStation } from "../../../../services/workstation.service.ts";

const AddModal = ({

}: ModalProps) => {
  //useContext
  const {availFields,setAvailFields,handleAddModal,getData,urlFilter,selectedManager,updateManager}=useContext(WorkStationContext)!

  //useForm
  const { handleSubmit, formState } = useForm<WorkStationForm>({
    resolver: zodResolver(WorkStationFormSchema),
  });

  //formSubmit
  const handleAddWorkStation = async (data: WorkStationForm) => {
    if(!selectedManager){
      alert("ADD WorkStation Manager")
    }
    console.log("hello");
    
    data["workerEmail"]=selectedManager!;
    try {
      const res = await addWorkStation(data);
      if(!(res.status>=200 && res.status<300)){throw Error("ADD unsuccessfull")}
      handleAddModal();
      getData(urlFilter);
      toast.success("WorkStation Added ");
    } catch (error) {
      toast.error("Sorry!! WorkStation Could not be Added");
    }
  };

  //useEffect
  useEffect(() => {
    setAvailFields("");
  }, []);

  return (
    <Modal setShowModal={handleAddModal}>
      <form onSubmit={handleSubmit(handleAddWorkStation)} className={styles.Form}>

        <h2>Add WorkPlace</h2>

        {/* <Input placeholder="Enter WorkStation Name" {...register("name")} />
        {!!formState.errors.name && (
          <small>{formState.errors.name.message}</small>
        )} */}

        <SearchableComponents setFieldValue={updateManager} availFields={availFields!} setAvailFields={setAvailFields!} toSearch={"Email"}/>
         {!!formState.errors.workerEmail && (
          <small>{formState.errors.workerEmail?.message}</small>
        )}

        <Button type="submit">Add</Button>
        
      </form>
    </Modal>
  );
};

export default AddModal;
