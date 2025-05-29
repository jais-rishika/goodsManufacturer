import { createContext, useReducer, type ComponentType } from "react";
import type { RequestDetail, RequestMethods, RequestsState } from "./SpecialRequests.types";
import { initialRequestState, requestsReducer } from "./SpecialRequests.reducer";
import { getSpecialRequests } from "../../../services/Requests.service";

export const SpecialRequestsContext = createContext<(RequestsState & RequestMethods) | null>(
  null
);

export const withSpecialReqContext = <T extends {}>(Component: ComponentType<T>) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(requestsReducer, initialRequestState);

    //handlers
    const handleReqDetailModal = () => {
      dispatch({ type: "SHOW_REQUEST_DETAILS" });
    };

    //filter
    const handleFilterChange = (filter: string[], url: string) => {
      dispatch({ type: "SET_FILTERS", data: filter });

      //pagination
      const currentUrl = new URLSearchParams(url);
      const [size, page] = [currentUrl.get("size"), currentUrl.get("page")];
      const newUrl = new URLSearchParams();
      newUrl.set("page", `${page}`);
      newUrl.set("size", `${size}`);

    //   do this //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      let category;

      newUrl.set("minDate", `${state.minDate}` );
      newUrl.set("maxDate", `${state.maxDate}` );

      updateUrl(newUrl.toString() + category);
    };

    const handleUrlChange = (size: number, page: number) => {
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("size", `${size}`);
      currentUrl.set("page", `${page}`);
      handleFilterChange(state.selectedFilters, currentUrl.toString());
    };

    const updateSearch = (val: string) => {
      dispatch({ type: "SET_SEARCH", data: val });
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("search", val);
      handleFilterChange(state.selectedFilters, currentUrl.toString());
    };

    const updateMinDate = (val: Date) => {
      dispatch({ type: "SET_MINDATE", data: val });
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("search", `${val}`);
      handleFilterChange(state.selectedFilters, currentUrl.toString());
    };
    const updateMaxDate = (val: Date) => {
      dispatch({ type: "SET_MAXDATE", data: val });
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("search", `${val}`);
      handleFilterChange(state.selectedFilters, currentUrl.toString());
    };

    const updateUrl = (newUrl: string) => {
      dispatch({ type: "SET_URL_FILTER", data: newUrl });
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    const getData = async (url: string) => {
      try {
        const res = await getSpecialRequests(url);
        // dispatch({ type: "UPDATE_REQUESTS", data: res.content });
        // setCount(res.page.totalElements);
      } catch (error) {}
    };

    const setSelected = (data: RequestDetail) => {
      dispatch({ type: "SELECT_REQUEST", data: data });
    };

    const handlers: RequestMethods = {
      handleReqDetailModal,
      getData,
      setSelected,

      handleFilterChange,
      handleUrlChange,
      updateSearch,
      updateMinDate,
      updateMaxDate,
      setCount,
    };
    return (
      <SpecialRequestsContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </SpecialRequestsContext.Provider>
    );
  };
};
