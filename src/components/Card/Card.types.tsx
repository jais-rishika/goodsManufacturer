import type { PropsWithChildren } from "react";

export interface CardProps extends PropsWithChildren{
    id: string,
    photo: string
    handleDeleteModal: (id: string)=> void;
    handleEditModal: (id: string)=> void;
}