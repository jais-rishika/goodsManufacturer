import type { HTMLAttributes, SetStateAction } from "react";

export interface ActionButtonsProps<T> extends HTMLAttributes<HTMLDivElement> {
    item: T;
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedItem: React.Dispatch<SetStateAction<T | null>>;
} 
