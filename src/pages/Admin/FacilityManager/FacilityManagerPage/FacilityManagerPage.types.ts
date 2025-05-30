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

export interface FacilityManagerState {
    isLoading: boolean,
    error: string,
    addModal: boolean,
    editModal: boolean,
    deleteModal: boolean,
    selected: FacilityManagerData | null,
    facilityManagerTableData: FacilityManagerTableData[],

    selectedFilters: string[],
    searchValue: string
    count: number,
    urlFilter: string,
}

export interface FacilityManagerMethods {
    handleAddModal: () => void
    hideEditModal: () => void;
    hideDeleteModal: ()=> void
    handleSelect: (data: FacilityManagerData) => void
    
    getData: (val: string) => void

    handleFilterChange: (val: string[], url: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    setCount: (count: number) => void
}