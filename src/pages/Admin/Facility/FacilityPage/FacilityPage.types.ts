import type { ReactNode } from "react";

export interface FacilityProps { }

export interface FacilityTableData {
    name: string,
    address: string,
    facilityManagerEmail: string
    action: () => ReactNode
}
export interface FacilityData extends FacilityTableData {
    id: string
}

export type FacilityAction = {
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
    selected: FacilityData
} | {
    type: "GET_DATA",
} | {
    type: "GET_DATA_FAILED"
    error: string
} | {
    type: "GET_DATA_SUCCESS"
    data: FacilityTableData[]
} | {
    type: "GET_AVAILABLE_FACILITY_MANAGER"
    data: string[]
} |{
    type: "SET_AVAIL_FIELDS",
    data: string[]
}


export interface FacilityState {
    isLoading: boolean,
    error: string,
    addModal: boolean,
    editModal: boolean,
    deleteModal: boolean,
    selected: FacilityData | null,
    facilityTableData: FacilityTableData[],
    availFields: string[]
}

export interface FacilityMethods {
    handleAddModal: () => void
    handleEditModal: () => void
    handleDeleteModal: () => void
    handleSelect: (data: FacilityData) => void
    getData: () => void,
    // getAvailablelFacilityManagers: ()=> void
    setAvailFields: (val: string)=> void
}