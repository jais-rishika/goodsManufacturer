export interface WorkersProps { }
import type { ReactNode } from "react";

export interface WorkersProps { }

export interface WorkersTableData {
    name: string,
    email: string,
    workstationCode: string,
    workplaceName: string,
    RequestHistory: string
    action: () => ReactNode
}

export interface WorkersData extends WorkersTableData {
    id: string
}

export type WorkersAction = {
    type: 'ADD_MODAL'
    status: boolean
} | {
    type: 'EDIT_MODAL'
    status: boolean
} | {
    type: 'DELETE_MODAL'
    status: boolean
} | {
    type: 'REQ_HISTORY'
    status: boolean
} | {
    type: 'SELECT'
    selected: WorkersData
} | {
    type: "GET_DATA",
} | {
    type: "GET_DATA_FAILED"
    error: string
} | {
    type: "GET_DATA_SUCCESS"
    data: WorkersTableData[]
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

export interface WorkersState {
    isLoading: boolean,
    error: string,

    addModal: boolean,
    editModal: boolean,
    deleteModal: boolean,
    reqHistoryModal: boolean,

    selected: WorkersData | null,
    workersData: WorkersData[],
    workersTableData: WorkersTableData[],

    selectedFilters: string[],
    searchValue: string
    count: number,
    urlFilter: string,
}

export interface WorkersMethods {
    handleAddModal: () => void
    handleEditModal: () => void
    handleDeleteModal: () => void
    handleSelect: (data: WorkersData) => void
    setFilter: (filter: string[])=> void

    getData: (val: string) => void

    handleFilterChange: (url?: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    setCount: (count: number) => void
}