import { createContext, useReducer, type ComponentType } from "react";
import type {
  ToolCribsData,
  ToolCribsMethods,
  ToolCribsState,
  ToolCribsTableData,
} from "./ToolCribs.types";
import { toolCribsInitialState, ToolCribsReducer } from "./ToolCribs.reducer";
import { getAllToolCribs } from "../../../services/inventory.service";
import { Link } from "react-router";

export const ToolCribsContext = createContext<
  (ToolCribsState & ToolCribsMethods) | null | any
>(null);

export const withToolCribs = <T extends {}>(Component: ComponentType<T>) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(
      ToolCribsReducer,
      toolCribsInitialState
    );

    //handlers
    const handleSelect = (data: ToolCribsData) => {
      dispatch({ type: "SELECT", selected: data });
    };

    const updateManager = async (val: string) => {
      dispatch({ type: "SET_MANAGER", data: val });
    };

    //filter
    const handleFilterChange = (filter: string[]) => {
      dispatch({ type: "SET_FILTERS", data: filter });
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

    const updateUrl = (url: string) => {
      //pagination
      const currentUrl = new URLSearchParams(url);
      const [size, page] = [currentUrl.get("size"), currentUrl.get("page")];

      const newUrl = new URLSearchParams();
      newUrl.set("page", `${page}`);
      newUrl.set("size", `${size}`);

      if (state.searchValue) newUrl.set("search", state.searchValue || "");
      const fields = state.selectedFilters.reduce((a, b) => {
        return `${a}&fields=${b}`;
      }, "");

      const finalUrl = newUrl.toString() + fields;
      dispatch({ type: "SET_URL_FILTER", data: finalUrl });
      getData(finalUrl);
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    const getData = async (url: string) => {
      try {
        dispatch({ type: "GET_DATA" });
        const ToolCribs = await getAllToolCribs(url);
        setCount(ToolCribs.page.totalElements);

        const tableData: ToolCribsTableData[] = ToolCribs.content.map(
          (data: ToolCribsData) => {
            return {
              ...data,
              ToolCribManager:
                data.managerEmails.join(" \n ") || "NOT ASSIGNED",
    path: "tool-cribs",
              action: <Link to={`/facilityManager/tool-cribs/${data.id}`}>See Tool Crib's Inventory</Link>,
            };
          }
        );

        dispatch({ type: "GET_DATA_SUCCESS", data: tableData });
      } catch (error) {
        dispatch({
          type: "GET_DATA_FAILED",
          error: "Could not Fetch the Facilities",
        });
      }
    };

    const handlers = {
      handleSelect,
      getData,

      updateManager,
      
      updateUrl,
      handleFilterChange,
      handleUrlChange,
      updateSearch,
      setCount,
    };

    return (
      <ToolCribsContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </ToolCribsContext.Provider>
    );
  };
};
