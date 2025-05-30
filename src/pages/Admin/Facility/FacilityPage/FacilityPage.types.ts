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
    type: "SET_AVAIL_FIELDS",
    data: string[]
} | {
    type: "SET_MANAGER",
    data: string
    
} | {
    type: "SET_FILTERS",
    data: string[]
} | {
    type: "SET_COUNT",
    count: number
} | {
    type: "SET_URL_FILTER",
    data: string
} | {
    type: "SET_SEARCH",
    data: string
}


export interface FacilityState {
    isLoading: boolean,
    error: string,

    addModal: boolean,
    editModal: boolean,
    deleteModal: boolean,

    selected: FacilityData | null,
    facilityTableData: FacilityTableData[],
    availFields: string[],
    selectedManager: string | null,

    selectedFilters: string[],
    searchValue: string
    count: number,
    urlFilter: string,
}

export interface FacilityMethods {
    handleAddModal: () => void
    handleEditModal: () => void
    handleDeleteModal: () => void
    handleSelect: (data: FacilityData) => void
    setAvailFields: (val: string) => void
    updateManager: (val: string) => void

    getData: (val: string) => void,

    handleFilterChange: (val: string[], url: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    setCount: (count: number) => void
}