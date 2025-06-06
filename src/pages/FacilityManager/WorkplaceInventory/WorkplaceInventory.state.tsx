import { createContext, useReducer, type ComponentType } from "react";
import {
  workplaceInventoryInitialState,
  WorkplaceInventoryReducer,
} from "./WorkplaceInventory.reducer";
import {
  getWorkplaceInventory,
} from "../../../services/inventory.service";
import type { WorkplaceInventoryDetail, WorkplaceInventoryMethods, WorkplaceInventoryState } from "./WorkplaceInventory.types";
import { useParams } from "react-router";

export const WorkplaceInventoryContext = createContext<
  (WorkplaceInventoryState & WorkplaceInventoryMethods) | null
>(null);

export const withWorkplaceInventory = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const params=useParams()
    const [state, dispatch] = useReducer(
      WorkplaceInventoryReducer,
      workplaceInventoryInitialState
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

    const updateUrl = (url: string) => {
      //pagination
      const currentUrl = new URLSearchParams(url);
      const [size, page] = [currentUrl.get("size"), currentUrl.get("page")];
      const newUrl = new URLSearchParams();
      newUrl.set("page", `${page}`);
      newUrl.set("size", `${size}`);
      newUrl.set("filterLowStock", state.selectedFilters[0]?"true":"false");

      const finalUrl=newUrl.toString()
      dispatch({ type: "SET_URL_FILTER", data: finalUrl });
      getData(finalUrl)
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    const getData = async (url: string) => {
      try {
        console.log(params.id);
        
        const res = await getWorkplaceInventory(url,params.id!);

        dispatch({ type: "UPDATE_TOOLS", data: res.content });
        setCount(res.page.totalElements)
        setCount(res.page.totalElements);

      } catch (error) {}
    };

    const setSelected = (data: WorkplaceInventoryDetail) => {
      dispatch({ type: "SELECT_TOOL", data: data });
    };

    const handlers = {
      getData,
      setSelected,
      
      updateUrl,
      handleFilterChange,
      handleUrlChange,
      updateSearch,
      setCount,
    };
    return (
      <WorkplaceInventoryContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </WorkplaceInventoryContext.Provider>
    );
  };
};
