import { createContext, useReducer, type ComponentType } from "react";
import type {
  ReqTable,
  ToolInventoryDetail,
  ToolsInventoryMethods,
  ToolsInventoryState,
} from "./ToolsInventory.types";
import {
  toolInventoryInitialState,
  ToolInventoryReducer,
} from "./ToolsInventory.reducer";
import {
  getToolCribInventory,
  getToolCribManagerInventory,
} from "../../../services/inventory.service";

export const ToolInventoryContext = createContext<
  (ToolsInventoryState & ToolsInventoryMethods) | null
>(null);

export const withToolInventory = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(
      ToolInventoryReducer,
      toolInventoryInitialState
    );

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

    const updateMinPrice = (val: number) => {
      dispatch({ type: "SET_MINPRICE", data: val });
    };
    const updateMaxPrice = (val: number) => {
      dispatch({ type: "SET_MAXPRICE", data: val });
    };

    const updateUrl = (url: string) => {
      //pagination
      const currentUrl = new URLSearchParams(url);
      const [size, page] = [currentUrl.get("size"), currentUrl.get("page")];
      const newUrl = new URLSearchParams();
      newUrl.set("page", `${page}`);
      newUrl.set("size", `${size}`);
      newUrl.set("name", state.searchValue);

      let isPerishable='';
      if (state.selectedFilters.includes("isPerishable")) {
        isPerishable+= `&isPerishable=true`
      }
      if (state.selectedFilters.includes("notPerishable")) {
        isPerishable+= `&isPerishable=false`
      }

      let category = "";
      if (state.selectedFilters.includes("special")) {
        category += `&category=SPECIAL`;
      }
      if (state.selectedFilters.includes("normal")) {
        category += "&category=NORMAL";
      }

      newUrl.set("minPrice", `${state.minPrice}` || `${0}`);
      newUrl.set("maxPrice", `${state.maxPrice}` || `${10000000}`);

      const finalUrl=newUrl.toString()+category+isPerishable
      dispatch({ type: "SET_URL_FILTER", data: finalUrl });
      getData(finalUrl)
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    const getData = async (url: string) => {
      try {
        const res = await getToolCribInventory(url);

        dispatch({ type: "UPDATE_TOOLS", data: res.content });
        setCount(res.page.totalElements)
        setCount(res.page.totalElements);

      } catch (error) {}
    };

    const setSelected = (data: ToolInventoryDetail) => {
      dispatch({ type: "SELECT_TOOL", data: data });
    };

    const handlers = {
      getData,
      setSelected,
      
      updateUrl,
      handleFilterChange,
      handleUrlChange,
      updateSearch,
      updateMinPrice,
      updateMaxPrice,
      setCount,
    };
    return (
      <ToolInventoryContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </ToolInventoryContext.Provider>
    );
  };
};
