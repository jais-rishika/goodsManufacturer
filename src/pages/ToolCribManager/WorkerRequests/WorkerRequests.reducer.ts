import type { WorkerRequestsState, WorkersRequestAction } from "./WorkerRequests.types";

export const formatDate = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0"); // month is 0-based
  const dd = String(d.getDate()).padStart(2, "0"); // day of month
  return `${yyyy}-${mm}-${dd}`;
};

export const initialWorkersRequestState: WorkerRequestsState = {
  ReqDetailModal: false,
  WorkerRequestsData: [],
  selectedRequest: null,

  selectedFilters: [],
  searchValue: "",
  minDate: "2025-01-20",
  maxDate: `${formatDate(new Date())}`,
  count: 0,
  urlFilter: "page=0&size=5",
};

export const WorkersRequestReducer = (
  prevState: WorkerRequestsState,
  action: WorkersRequestAction
): WorkerRequestsState => {
  switch (action.type) {
    case "SHOW_REQUEST_DETAILS":
      return { ...prevState, ReqDetailModal: !prevState.ReqDetailModal };
    case "UPDATE_WORKERS_REQUESTS":
      return { ...prevState, WorkerRequestsData: action.data };
    case "SELECT_REQUEST":
      return { ...prevState, selectedRequest: action.data };

    case "SET_COUNT":
      return { ...prevState, count: action.count };
    case "SET_FILTERS":
      return { ...prevState, selectedFilters: action.data };
    case "SET_SEARCH":
      return { ...prevState, searchValue: action.data };
    case "SET_MINDATE":
      return { ...prevState, minDate: action.data };
    case "SET_MAXDATE":
      return { ...prevState, maxDate: action.data };
    case "SET_URL_FILTER":
      return { ...prevState, urlFilter: action.data };

    default:
      return prevState;
  }
};
