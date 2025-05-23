export interface FacilityManagerProps { }
import type { ReactNode } from "react";

export interface FacilityManagerProps { }

export interface FacilityManagerTableData {
    name: string,
    email: string,
    createdAt: string,
    facilityName: string
    action: () => ReactNode
}

export interface FacilityManagerData extends FacilityManagerTableData {
    id: string
}

export type FacilityManagerAction = {
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
    selected: FacilityManagerData
} | {
    type: "GET_DATA",
} | {
    type: "GET_DATA_FAILED"
    error: string
} | {
    type: "GET_DATA_SUCCESS"
    data: FacilityManagerTableData[]
}

export interface FacilityManagerState {
    isLoading: boolean,
    error: string,
    addModal: boolean,
    editModal: boolean,
    deleteModal: boolean,
    selected: FacilityManagerData | null,
    facilityManagerTableData: FacilityManagerTableData[]
}

export interface FacilityManagerMethods {
    handleAddModal: () => void
    handleEditModal: () => void
    handleDeleteModal: () => void
    handleSelect: (data: FacilityManagerData) => void
    getData: () => void
}