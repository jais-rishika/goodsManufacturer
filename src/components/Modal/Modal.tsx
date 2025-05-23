import { FaX } from "react-icons/fa6";
import Button from "../Button/Button.tsx";
import styles from "./Modal.module.scss" 
import type { ModalProps } from "./Modal.types.ts" 
 
const Modal = ({setShowModal,children}: ModalProps) => {
    const closeModal=()=>{
        setShowModal(false)
    } 
    return <div className={styles.ModalOverlay}>
        <div className={styles.Modal}>
            {children}
            <Button danger onClick={closeModal} className={styles.CloseBtn}><FaX/></Button>
        </div>
    </div>; 
}; 
 
export default Modal;
