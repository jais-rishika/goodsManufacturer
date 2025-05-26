import styles from "./Modal.module.scss";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../../../components/Modal/Modal.tsx";
import { type ModalProps } from "./Modal.types.ts";
import { toast } from "react-toastify";
import { useContext, useRef } from "react";
import { ToolsContext } from "../Tools.state.tsx";
import { ToolsSchema, type ToolForm } from "../Tools.types.ts";
import { addTools, uploadToolImage } from "../../../../services/tools.service.ts";

const AddModal = ({}: ModalProps) => {
  //useContext
  const { handleAddModal, getData } = useContext(ToolsContext)!;

  //useForm
  const { register, handleSubmit, formState, watch } = useForm<ToolForm>({
    resolver: zodResolver(ToolsSchema),
  });

  const photoRef=useRef<HTMLInputElement>(null);
  //formSubmit
  const handleAddTool = async (data: ToolForm) => {
    console.log(data);
    
    try {
      const res = await addTools(data);
      if(res.status==="201"){
        const file= photoRef.current?.files?.[0]!;
        console.log(file);
        const imgRes=await uploadToolImage(res.id,file)
      }
      handleAddModal();
      getData();
      toast.success("Tool Added ");
    } catch (error) {
      toast.error("Sorry!! Tool Could not be Added");
    }
  };

  return (
    <Modal setShowModal={handleAddModal}>
      <form onSubmit={handleSubmit(handleAddTool)} className={styles.Form}>
        <h2>Add Tool</h2>

        <div>
          <Input placeholder="Enter Tool Name" {...register("name")} />
          {!!formState.errors.name && (
            <small>{formState.errors.name.message}</small>
          )}
        </div>
        
        <div className={styles.Perishable}>
          <label>Is Perishable: </label>
          <Input type="checkbox" {...register("isPerishable")} />
          {!!formState.errors.isPerishable && (
            <small>{formState.errors.isPerishable.message}</small>
          )}
        </div>

        <div>
          <Input
            type={"number"}
            placeholder="Enter Price"
            {...register("price", {valueAsNumber : true}) }
          />
          {!!formState.errors.price && (
            <small>{formState.errors.price.message}</small>
          )}
        </div>

        {watch("isPerishable") && <div>
          <Input
            type="number"
            placeholder="Enter Fine Amount"
            {...register("fineAmount", {valueAsNumber : true}) }
          />
          {!!formState.errors.fineAmount && (
            <small>{formState.errors.fineAmount.message}</small>
          )}
        </div>}

        <div>
          <select {...register("category")} className={styles.Select}>
            <option>Select Category</option>
            <option value="NORMAL">NORMAL</option>
            <option value="SPECIAL">SPECIAL</option>
          </select>
          {!!formState.errors.category && (
            <small>{formState.errors.category.message}</small>
          )}
        </div>


        {watch("isPerishable") && <div>
          <Input
            type="number"
            placeholder="Enter Return Period"
            {...register("returnPeriod")}
          />
          {!!formState.errors.returnPeriod && (
            <small>{formState.errors.returnPeriod.message}</small>
          )}
        </div>}

        <div>
          <Input
            type="file"
            placeholder="Choose Tool Image"
            ref={photoRef}
          />
        </div>

        <Button type="submit">Add</Button>
      </form>
    </Modal>
  );
};

export default AddModal;
