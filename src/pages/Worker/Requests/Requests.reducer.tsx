import type { RequestAction, RequestsState } from "./Requests.types";

export const formatDate = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0"); // month is 0-based
  const dd = String(d.getDate()).padStart(2, "0"); // day of month
  return `${yyyy}-${mm}-${dd}`;
};

export const initialRequestState: RequestsState = {
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
    case "SHOW_REQUEST_DETAILS":
      return { ...prevState, ReqDetailModal: !prevState.ReqDetailModal };
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
