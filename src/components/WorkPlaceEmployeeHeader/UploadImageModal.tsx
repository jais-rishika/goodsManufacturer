import { useContext, useRef } from "react";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import { HeaderContext } from "./WorkPlaceEmployeeHeader.state";
import styles from "./WorkPlaceEmployeeHeader.module.scss"
import Button from "../Button/Button";
import { editworkerImage } from "../../services/auth.service";
import { toast } from "react-toastify";
const UploadImageModal = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { handleModal } = useContext(HeaderContext)!;

  const uploadImg=async ()=>{
    try {        
        if (imageRef.current?.files?.length===0) return alert("No image added");
        
        const imgList=imageRef.current!.files;
        const img=imgList!.item(0);
        const formData=new FormData();
        formData.append("file",img!)
        
        await editworkerImage(formData);
        toast.success("Profile Image Uploaded")
    } catch (error) {
        toast.error("Profile Image Upload Failed")
    }finally{
        handleModal()
    }
  }

  return (
    <div className={styles.Modal}>
      <Modal setShowModal={handleModal}>
        <h2>Upload Image</h2>
        <Input type="file" placeholder="upload Image" ref={imageRef} />
        <Button primary onClick={uploadImg}>UPLOAD</Button>
      </Modal>
    </div>
  );
};

export default UploadImageModal;
