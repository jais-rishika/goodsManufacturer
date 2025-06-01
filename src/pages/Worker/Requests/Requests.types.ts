export interface RequestsProps { }

export interface RequestsTableData {
    requestDate: string,
    toolName: string,
    reqQuantity: number,
    returnDate: string,
    approvalStatus: "PENDING" | "APPROVED" | "REJECTED",
    returnStatus: "PENDING" | "RETURNED"

}

export interface RequestDetail extends RequestsTableData {
    toolId: string
    requestItemId: string,
    workerName: string,
    fine: number,
    isPerishable: string,
    toolCategory: "NORMAL" | "SPECIAL"
}

export interface RequestsState {
    ReqDetailModal: boolean,
    RequestsData: RequestDetail[]
    selectedRequest: RequestDetail | null

    selectedFilters: string[],
    searchValue: string,
    minDate: string,
    maxDate: string,
    count: number,
    urlFilter: string,
}

export interface RequestMethods {
    handleReqDetailModal: () => void,
    setSelected: (data: RequestDetail)=> void
    getData: (val: string) => void

    updateUrl: (url: string)=> void
    handleFilterChange: (val: string[], url: string) => void
    handleUrlChange: (size: number, page: number) => void
    updateSearch: (val: string) => void
    updateMinDate: (value: string) => void
    updateMaxDate: (value: string) => void
    setCount: (count: number) => void
}

export type RequestAction = {
    type: "UPDATE_REQUESTS",
    data: RequestDetail[]
} | {
    type: "SHOW_REQUEST_DETAILS"
} | {
    type: "SELECT_REQUEST"
    data: RequestDetail
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
} | {
    type: "SET_MINDATE",
    data: string
} | {
    type: "SET_MAXDATE",
    data: string
}
