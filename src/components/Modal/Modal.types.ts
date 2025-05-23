import type { PropsWithChildren } from "react";

export interface ModalProps extends PropsWithChildren {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
} 
