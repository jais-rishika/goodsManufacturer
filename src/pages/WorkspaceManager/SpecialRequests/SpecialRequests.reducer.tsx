import type { RequestAction, RequestsState } from "./SpecialRequests.types";
export const formatDate = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0"); // month is 0-based
  const dd = String(d.getDate()).padStart(2, "0"); // day of month
  return `${yyyy}-${mm}-${dd}`;
};

export const initialRequestState: RequestsState = {
  isLoading: false,
  error: "",
  ReqDetailModal: false,
  RequestsData: [],
  selectedRequest: null,

  selectedFilters: [],
  searchValue: "",
  minDate: "2025-01-20",
  maxDate: `${formatDate(new Date())}`,
  count: 0,
  urlFilter: "page=0&size=5",
};

export const requestsReducer = (
  prevState: RequestsState,
  action: RequestAction
): RequestsState => {
  switch (action.type) {
    case "GET_REQUESTS": {
      return { ...prevState, isLoading: true, error: "" };
    }
    case "GET_REQUESTS_FAILURE": {
      return { ...prevState, isLoading: false, error: action.data };
    }
    case "GET_REQUESTS_SUCCESS": {
      return { ...prevState, isLoading: false, error: "" };
    }

    case "SHOW_REQUEST_DETAILS":
      return { ...prevState, ReqDetailModal: !prevState.ReqDetailModal };
    case "SELECT_REQUEST":
      return { ...prevState, selectedRequest: action.data };
    case "UPDATE_REQUESTS":
      return { ...prevState, RequestsData: action.data };

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
