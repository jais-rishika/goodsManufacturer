import { createContext, useReducer, type ComponentType } from "react";
import type {
  RequestDetail,
  RequestMethods,
  RequestsState,
} from "./Requests.types";
import { initialRequestState, requestsReducer } from "./Requests.reducer";
import { getRequests } from "../../../services/Requests.service";

export const RequestsContext = createContext<
  (RequestsState & RequestMethods) | null
>(null);

export const withReqContext = <T extends {}>(Component: ComponentType<T>) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(requestsReducer, initialRequestState);

    //handlers
    const handleReqDetailModal = () => {
      dispatch({ type: "SHOW_REQUEST_DETAILS" });
    };

    //filter
    const handleFilterChange = (filter: string[]) => {
      const isToolNamePresent= filter.includes("toolName");
      const reqStatus = filter.filter((val) => val != "toolName");
      if (reqStatus.length > 1) {
        reqStatus.splice(0, 1);
      }
      if(isToolNamePresent) reqStatus.push("toolName")
      dispatch({ type: "SET_FILTERS", data: reqStatus });
    };

    const handleUrlChange = (size: number, page: number) => {
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("size", `${size}`);
      currentUrl.set("page", `${page}`);
      updateUrl(currentUrl.toString());
    };

    const updateSearch = (val: string) => {
      dispatch({ type: "SET_SEARCH", data: val });
    };

    const updateMinDate = (val: string) => {
      dispatch({ type: "SET_MINDATE", data: val });
    };
    const updateMaxDate = (val: string) => {
      dispatch({ type: "SET_MAXDATE", data: val });
    };

    const updateUrl = (url: string) => {
      //pagination
      const currentUrl = new URLSearchParams(url);
      const [size, page] = [currentUrl.get("size"), currentUrl.get("page")];
      const newUrl = new URLSearchParams();
      newUrl.set("page", `${page}`);
      newUrl.set("size", `${size}`);

      if (state.selectedFilters.includes("toolName")) {
        newUrl.set("toolName", `${state.searchValue}`);
      }

      if (state.selectedFilters.includes("pending"))
        newUrl.set("approvalStatus", "PENDING");
      if (state.selectedFilters.includes("rejected"))
        newUrl.set("approvalStatus", "REJECTED");
      if (state.selectedFilters.includes("approved"))
        newUrl.set("approvalStatus", "APPROVED");

      // newUrl.set("startDateTime", new Date(state.minDate).toISOString());
      // newUrl.set("endDateTime", new Date(state.maxDate).toISOString());

      const finalUrl = newUrl.toString();
      dispatch({ type: "SET_URL_FILTER", data: finalUrl });
      getData(finalUrl);
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    const getData = async (url: string) => {
      try {
        const res = await getRequests(url);

        const data = res.content.map((row: RequestDetail) => {
          return {
            ...row,
            returnDate: row.returnDate.substring(0, 10),
            requestDate: row.requestDate.substring(0, 10),
          };
        });

        dispatch({ type: "UPDATE_REQUESTS", data: data });
        setCount(res.page.totalElements);
      } catch (error) {}
    };

    const setSelected = (data: RequestDetail) => {
      dispatch({ type: "SELECT_REQUEST", data: data });
    };

    const handlers: RequestMethods = {
      handleReqDetailModal,
      getData,
      setSelected,

      updateUrl,
      handleFilterChange,
      handleUrlChange,
      updateSearch,
      updateMinDate,
      updateMaxDate,
      setCount,
    };
    return (
      <RequestsContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </RequestsContext.Provider>
    );
  };
};
