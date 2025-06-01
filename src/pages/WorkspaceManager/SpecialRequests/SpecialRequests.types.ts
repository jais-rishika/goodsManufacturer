export interface SpecialRequestsProps { }

export interface SpRequestsTableData {
    requestDate: string,
    workerName: string,
    toolName: string,
    reqQuantity: number,
    approvalStatus: "PENDING" | "APPROVED" | "REJECTED",
    returnStatus: "PENDING" | "RETURNED"
}

export interface RequestDetail extends SpRequestsTableData {
    toolId: string
    requestItemId: string,
}

export interface RequestsState {
    isLoading: boolean,
    error: string
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

    setSelected: (data: RequestDetail) => void,

    getData: (val: string) => void

    updateUrl: (url: string) => void
    handleFilterChange: (val: string[]) => void
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
    type: "GET_REQUESTS"
} | {
    type: "GET_REQUESTS_SUCCESS"
} | {
    type: "GET_REQUESTS_FAILURE"
    data: string
} |

{
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
