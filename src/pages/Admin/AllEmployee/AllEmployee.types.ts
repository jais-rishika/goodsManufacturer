export interface AllEmployeeProps {} 

export interface AllEmployeeTableData {
    name: string,
    email: string,
    role: string,
    location: string
    // action: () => ReactNode
}

export interface AllEmployeeData extends AllEmployeeTableData {
    facilityName: string
    workplaceName: string
    workStationCode: string
    toolCribName: string
}

export type AllEmployeeAction = {
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
    selected: AllEmployeeData
} | {
    type: "GET_DATA",
} | {
    type: "GET_DATA_FAILED"
    error: string
} | {
    type: "GET_DATA_SUCCESS"
    data: AllEmployeeTableData[]

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

export interface AllEmployeeState {
    isLoading: boolean,
    error: string,
    // addModal: boolean,
    // editModal: boolean,
    // deleteModal: boolean,
    selected: AllEmployeeData | null,
    AllEmployeeTableData: AllEmployeeTableData[],

    selectedFilters: string[],
    searchValue: string
    count: number,
    urlFilter: string,
}

export interface AllEmployeeMethods {
    // handleAddModal: () => void
    // hideEditModal: () => void;
    // hideDeleteModal: ()=> void
    handleSelect: (data: AllEmployeeData) => void
    
    getData: (val: string) => void

    updateUrl: (url: string)=> void
    handleFilterChange: (val: string[]) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    setCount: (count: number) => void
}