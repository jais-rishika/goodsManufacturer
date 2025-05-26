import type { ReactNode } from "react"

export interface WorkPlaceProps { }

export interface WorkPlaceTableData {
    name: string,
    workPlaceManagerName: string,
    workPlaceManagerEmail: string,
    action: () => ReactNode

}

export interface WorkPlaceData extends WorkPlaceTableData {
    id: string
}

export type WorkplaceAction = {
    type: "ADD_MODAL",
    status: boolean
} | {
    type: "EDIT_MODAL",
    status: boolean
} | {
    type: "DELETE_MODAL",
    status: boolean
} | {
    type: 'SELECT'
    selected: WorkPlaceData
} | {
    type: "GET_DATA",
} | {
    type: "GET_DATA_FAILED"
    error: string
} | {
    type: "GET_DATA_SUCCESS"
    data: WorkPlaceTableData[]
} | {
    type: "SET_AVAIL_FIELDS",
    data: string[]
}

export interface WorkPlaceState {
    isLoading: boolean,
    error: string,
    addModal: boolean,
    deleteModal: boolean,
    editModal: boolean,
    selected: WorkPlaceData | null,
    workplaceTableData: WorkPlaceTableData[],
    availFields: string[]
}

export interface WorkPlaceMethods {
    handleAddModal: () => void,
    handleEditModal: () => void,
    handleDeleteModal: () => void,
    handleSelect: (data: WorkPlaceData) => void
    getData: () => void,
    setAvailFields: (val: string) => void
}