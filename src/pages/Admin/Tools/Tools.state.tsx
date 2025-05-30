import { createContext, useReducer, type ComponentType } from "react";
import type { ToolMethods, ToolsDetail, ToolsState } from "./Tools.types";
import { initialToolState, toolsReducer } from "./Tools.reducer";
import { getTools } from "../../../services/tools.service";

export const ToolsContext = createContext<(ToolsState & ToolMethods) | null>(
  null
);

export const withToolContext = <T extends {}>(Component: ComponentType<T>) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(toolsReducer, initialToolState);

    //handlers
    const handleAddModal = () => {
      dispatch({ type: "ADD_MODAL" });
    };

    const handleDeleteModal = () => {
      dispatch({ type: "DELETE_MODAL" });
    };

    const handleEditModal = () => {
      dispatch({ type: "EDIT_MODAL" });
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

      if(filter.includes("name")){
        newUrl.set("name", state.searchValue)
      }
      if (filter.includes("isPerishable")) {
        newUrl.set("isPerishable", `${filter.includes("isPerishable")}`);
      }

      let category = "";
      if (filter.includes("special")) {
        category += `&category=SPECIAL`;
      }
      if (filter.includes("normal")) {
        category += "&category=NORMAL";
      }

      newUrl.set("minPrice", `${state.minPrice}` || `${10}`);
      newUrl.set("maxPrice", `${state.maxPrice}` || `${10000}`);

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
      // const currentUrl = new URLSearchParams(state.urlFilter);
      // currentUrl.set("search", val);
      // handleFilterChange(state.selectedFilters, currentUrl.toString());
    };

    const updateMinPrice = (val: number) => {
      dispatch({ type: "SET_MINPRICE", data: val });
      // const currentUrl = new URLSearchParams(state.urlFilter);
      // currentUrl.set("search", `${val}`);
      // handleFilterChange(state.selectedFilters, currentUrl.toString());
    };
    const updateMaxPrice = (val: number) => {
      dispatch({ type: "SET_MAXPRICE", data: val });
      // const currentUrl = new URLSearchParams(state.urlFilter);
      // currentUrl.set("search", `${val}`);
      // handleFilterChange(state.selectedFilters, currentUrl.toString());
    };

    const updateUrl = (newUrl: string) => {
      dispatch({ type: "SET_URL_FILTER", data: newUrl });
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    const getData = async (url: string) => {
      try {
        const res = await getTools(url);
        dispatch({ type: "UPDATE TOOLS", data: res.content });
        setCount(res.page.totalElements);
      } catch (error) {}
    };

    const setSelected = (data: ToolsDetail) => {
      dispatch({ type: "SELECT_TOOL", data: data });
    };

    const handlers: ToolMethods = {
      handleAddModal,
      handleDeleteModal,
      handleEditModal,
      getData,
      setSelected,

      handleFilterChange,
      handleUrlChange,
      updateSearch,
      updateMinPrice,
      updateMaxPrice,
      setCount,
    };
    return (
      <ToolsContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </ToolsContext.Provider>
    );
  };
};
