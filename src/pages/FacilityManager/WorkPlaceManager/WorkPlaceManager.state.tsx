import { createContext, useReducer, type ComponentType } from "react";

import { FaEdit, FaTrash } from "react-icons/fa";
import type { WorkPlaceManagerData, WorkPlaceManagerMethods, WorkPlaceManagerState, WorkPlaceManagerTableData } from "./WorkPlaceManager.types";
import { workPlaceManagerInitialState, WorkPlaceManagerReducer } from "./WorkPlaceManager.reducer";
import Button from "../../../components/Button/Button";
import { getWorkPlaceManager } from "../../../services/workplaceManager.service";

//create Context
export const WorkPlaceManagerContext = createContext<
  (WorkPlaceManagerState & WorkPlaceManagerMethods) | null
>(null);

//HOC
export const withWorkPlaceManagerContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(
      WorkPlaceManagerReducer,
      workPlaceManagerInitialState
    );

    //handlers
    const handleAddModal = () => {
      dispatch({ type: "ADD_MODAL", status: !state.addModal });
    };

    const showEditModal = () => {      
      dispatch({ type: "EDIT_MODAL", status: true });
    };

    const showDeleteModal = () => {
      dispatch({ type: "DELETE_MODAL", status: true });
    };

    const hideEditModal = () => {      
      dispatch({ type: "EDIT_MODAL", status: false });
    };

    const hideDeleteModal = () => {
      dispatch({ type: "DELETE_MODAL", status: false });
    };

    const handleSelect = (data: WorkPlaceManagerData) => {
      dispatch({ type: "SELECT", selected: data });
    };

    //filter
    const handleFilterChange = (filter: string[]) => {
      dispatch({ type: "SET_FILTERS", data: filter });

      // //pagination
      // const currentUrl = new URLSearchParams(url);
      // const [size, page] = [currentUrl.get("size"), currentUrl.get("page")];
      // const newUrl = new URLSearchParams();
      // newUrl.set("page", `${page}`);
      // newUrl.set("size", `${size}`);
      // if (state.searchValue) newUrl.set("search", state.searchValue || "");
      // const fields = filter.reduce((a, b) => {
      //   return `${a}&fields=${b}`;
      // }, "");
      // const finalUrl=newUrl.toString() + fields;
    };

    const handleUrlChange = (size: number, page: number) => {
      const currentUrl = new URLSearchParams(state.urlFilter);
      currentUrl.set("size", `${size}`);
      currentUrl.set("page", `${page}`);
      updateUrl(currentUrl.toString());
    };

    const updateSearch = (val: string) => {
      dispatch({ type: "SET_SEARCH", data: val });
      // const currentUrl = new URLSearchParams(state.urlFilter);
      // currentUrl.set("search", val);
      // handleFilterChange(state.selectedFilters, currentUrl.toString());
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
      const finalUrl=newUrl.toString() + fields;
      dispatch({ type: "SET_URL_FILTER", data: finalUrl });
      getData(finalUrl)
    };

    const setCount = (count: number) => {
      dispatch({ type: "SET_COUNT", count: count });
    };

    const actionButtons = (data: WorkPlaceManagerData) => {
      return (
        <>
          <Button
            primary
            onClick={() => {
              handleSelect(data);
              showEditModal();
            }}
          >
            <FaEdit />
          </Button>

          <Button
            danger
            onClick={() => {
              handleSelect(data);
              showDeleteModal();
            }}
          >
            <FaTrash />
          </Button>
        </>
      );
    };

    const getData = async (url: string) => {
      try {
        dispatch({ type: "GET_DATA" });
        const workPlaceManagers = await getWorkPlaceManager(url);
        console.log(workPlaceManagers);
        
        const tableData: WorkPlaceManagerTableData[] =
          workPlaceManagers.content.map((data: WorkPlaceManagerData) => {
            return {
              name: data.name,
              email: data.email,
              createdAt: data.createdAt.substring(0, 10),
              workplaceName: data.workplaceName,
              action: actionButtons(data),
            };
          });
        dispatch({ type: "GET_DATA_SUCCESS", data: tableData });
      } catch (error) {
        dispatch({
          type: "GET_DATA_FAILED",
          error: "Could not Fetch the WorkPlace Managers",
        });
      }
    };

    const handlers = {
      handleAddModal,
      hideEditModal,
      hideDeleteModal,
      handleSelect,
      getData,

      updateUrl,
      handleFilterChange,
      handleUrlChange,
      updateSearch,
      setCount
    };

    return (
      <WorkPlaceManagerContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </WorkPlaceManagerContext.Provider>
    );
  };
};
