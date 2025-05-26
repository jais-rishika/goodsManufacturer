export interface WorkPlaceManagerProps {} 
import type { ReactNode } from "react";

export interface WorkPlaceManagerProps { }

export interface WorkPlaceManagerTableData {
    name: string,
    email: string,
    createdAt: string,
    workPlaceName: string
    action: () => ReactNode
}

export interface WorkPlaceManagerData extends WorkPlaceManagerTableData {
    id: string
}

export type WorkPlaceManagerAction = {
    type: 'ADD_MODAL'
    status: boolean
} | {
    type: 'EDIT_MODAL'
    status: boolean
} | {
    type: 'DELETE_MODAL'
    status: boolean
} | {
    type: 'SELECT'
    selected: WorkPlaceManagerData
} | {
    type: "GET_DATA",
} | {
    type: "GET_DATA_FAILED"
    error: string
} | {
    type: "GET_DATA_SUCCESS"
    data: WorkPlaceManagerTableData[]
}

export interface WorkPlaceManagerState {
    isLoading: boolean,
    error: string,
    addModal: boolean,
    editModal: boolean,
    deleteModal: boolean,
    selected: WorkPlaceManagerData | null,
    workPlaceManagerTableData: WorkPlaceManagerTableData[]
}

export interface WorkPlaceManagerMethods {
    handleAddModal: () => void
    handleEditModal: () => void
    handleDeleteModal: () => void
    handleSelect: (data: WorkPlaceManagerData) => void
    getData: () => void
}