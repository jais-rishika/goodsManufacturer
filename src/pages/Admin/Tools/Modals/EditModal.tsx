import styles from "./Modal.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button.tsx";
import Input from "../../../../components/Input/Input.tsx";
import Modal from "../../../../components/Modal/Modal.tsx";
import { ToolsSchema, type ModalProps, type ToolForm } from "./Modal.types.ts";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ToolsContext } from "../Tools.state.tsx";
import { editTools } from "../../../../services/inventory.service.ts";

const EditModal = ({}: ModalProps) => {
  //context
  const { handleEditModal, getData, selectedTool,urlFilter } = useContext(ToolsContext)!;

  //useForm
  const { register, handleSubmit, formState, watch } = useForm<ToolForm>({
    defaultValues: {
      name: `${selectedTool?.name}`,
      price: selectedTool!.price,
      fineAmount: selectedTool!.fineAmount,
      category: selectedTool!.category,
      isPerishable: !!selectedTool!.isPerishable,
      returnPeriod: !!selectedTool!.isPerishable?0:selectedTool!.returnPeriod,
      // toolImage: selectedTool!.toolImageUrl
    },
    resolver: zodResolver(ToolsSchema),
  });

  //formSubmit
  const editTool = async (data: ToolForm) => {
    const toolImage=data.toolImage as FileList;
    const image=toolImage.item(0) as File;
    const payload={
      name: data.name,
      price: data.price,
      category: data.category,
      fineAmount: data.fineAmount,
      isPerishable: data.isPerishable,
      returnPeriod: data.returnPeriod,
      toolImage: image,
    }
    console.log(payload);
    
    const formData =new FormData();
    for (let key in payload) {
      formData.append(key, payload[key as keyof typeof payload] as string);
    }
    
    try {
      await editTools(formData, selectedTool!.id);
      getData(urlFilter);
      toast.success("Tool  Edited ");
    } catch (error) {
      toast.error("Sorry!! Tool  Could not be Edited");
    } finally {
      handleEditModal();
    }
  };

  return (
    <Modal setShowModal={handleEditModal}>
      <form onSubmit={handleSubmit(editTool)} className={styles.Form}>
        <h2>Edit Tool</h2>

        <div>
          <label>Tool Name: </label>
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
          <label>Price: </label>
          <Input
            type="number"
            placeholder="Enter Price"
            {...register("price",{valueAsNumber: true})}
          />
          {!!formState.errors.price && (
            <small>{formState.errors.price.message}</small>
          )}
        </div>

        {!watch("isPerishable") && (
          <div>
            <label>Fine</label>
            <Input
              type="number"
              placeholder="Enter Fine Amount"
              {...register("fineAmount",{valueAsNumber: true})}
              defaultValue={0}
            />
            {!!formState.errors.fineAmount && (
              <small>{formState.errors.fineAmount.message}</small>
            )}
          </div>
        )}

        <div>
          <label>Category: </label>
          <select {...register("category")} className={styles.Select}>
            <option>Select Category</option>
            <option value="NORMAL">NORMAL</option>
            <option value="SPECIAL">SPECIAL</option>
          </select>
          {!!formState.errors.category && (
            <small>{formState.errors.category.message}</small>
          )}
        </div>

        {!watch("isPerishable") && (
          <div>
            <label>Return Period:</label>
            <Input
              type="number"
              placeholder="Enter Return Period"
              {...register("returnPeriod",{valueAsNumber: true})}
            />
            {!!formState.errors.returnPeriod && (
              <small>{formState.errors.returnPeriod.message}</small>
            )}
          </div>
        )}

        {/* <Input type="file" placeholder="Choose Tool Image" {...register("toolImage") }/> */}

        <Button type="submit">Edit</Button>
      </form>
    </Modal>
  );
};

export default EditModal;
