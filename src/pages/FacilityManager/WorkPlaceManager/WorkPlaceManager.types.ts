export interface WorkPlaceManagerProps {} 
import type { ReactNode } from "react";

export interface WorkPlaceManagerProps { }

export interface WorkPlaceManagerTableData {
    name: string,
    email: string,
    createdAt: string,
    workplaceName: string
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

}| {
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

export interface WorkPlaceManagerState {
    isLoading: boolean,
    error: string,
    addModal: boolean,
    editModal: boolean,
    deleteModal: boolean,
    selected: WorkPlaceManagerData,
    workPlaceManagerTableData: WorkPlaceManagerTableData[],

    selectedFilters: string[],
    searchValue: string
    count: number,
    urlFilter: string,
}

export interface WorkPlaceManagerMethods {
    handleAddModal: () => void
    handleEditModal: () => void
    handleDeleteModal: () => void
    handleSelect: (data: WorkPlaceManagerData) => void
    
    getData: (val: string) => void

    handleFilterChange: (val: string[], url: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    setCount: (count: number) => void
}