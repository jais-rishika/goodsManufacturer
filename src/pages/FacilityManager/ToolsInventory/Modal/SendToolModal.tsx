import styles from "./Modal.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Modal from "../../../../components/Modal/Modal";
import { SendToolFormSchema, type SendToolForm, type SendToolPayload } from "./Modal.types";
import { sendTool } from "../../../../services/inventory.service";
import { ToolInventoryContext } from "../ToolsInventory.state";
import SearchableComponents from "../../../../components/SearchableComponents/SearchableComponents";
import { fetchManagerWorkplaces } from "../../../../services/workplace.service";
import type { WorkPlaceData } from "../../WorkPlace/WorkPlace.types";

const SendToolModal = () => {
  const {
    availFields,
    setAvailFields,
    selectedWorkplace,
    updateWorkplace,
    showSendToolModal,
    selectedTool,
    getData,
    urlFilter
  } = useContext(ToolInventoryContext)!;

  const { register, handleSubmit, formState } = useForm<SendToolForm>({
    resolver: zodResolver(SendToolFormSchema),
  });

  const handleSendTool = async (data: SendToolForm) => {
    if (!selectedWorkplace) {      
      return alert("ADD Workplace");
    }

    const res= await fetchManagerWorkplaces(`search=workplace-1&fields=name`);

    const workplace= res.content.find((val: WorkPlaceData)=> val.name===selectedWorkplace)
    
    const payload: SendToolPayload={"workplaceId": workplace.id, "toolId": selectedTool!.id, "quantity": data.quantity}
    
    try {
      const res = await sendTool(payload);
      getData(urlFilter);
      toast.success("Tool Send Success ");
    } catch (error) {
      toast.error("Sorry!! Tool Send Failed");
    }
    finally{
      showSendToolModal()
    }
  };

  useEffect(() => {
    setAvailFields("");
  }, []);
  return (
    <Modal setShowModal={showSendToolModal}>
      <form onSubmit={handleSubmit(handleSendTool)} className={styles.Form}>
        <h2>Send Tool To Workplaces</h2>
        <div className={styles.Inputs}>
          <div>
            <Input
              type="text"
              value={selectedTool?.name}
              {...register("toolName")}
            />
            {!!formState.errors.toolName && (
              <small>{formState.errors.toolName.message}</small>
            )}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Enter Quantity"
              {...register("quantity", { valueAsNumber: true })}
            />
            {!!formState.errors.quantity && (
              <small>{formState.errors.quantity?.message}</small>
            )}
          </div>
        </div>
        <SearchableComponents
          setFieldValue={updateWorkplace}
          availFields={availFields!}
          setAvailFields={setAvailFields!}
          toSearch={"workplace"}
        />
        {!!formState.errors.workplace && (
          <small>{formState.errors.workplace?.message}</small>
        )}
        <Button type="submit">SEND</Button>
      </form>
    </Modal>
  );
};

export default SendToolModal;
