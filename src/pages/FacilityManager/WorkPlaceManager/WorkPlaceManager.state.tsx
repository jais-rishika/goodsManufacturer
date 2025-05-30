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

    const handleEditModal = () => {      
      dispatch({ type: "EDIT_MODAL", status: !state.editModal });
    };

    const handleDeleteModal = () => {
      dispatch({ type: "DELETE_MODAL", status: !state.deleteModal });
    };

    const handleSelect = (data: WorkPlaceManagerData) => {
      dispatch({ type: "SELECT", selected: data });
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
      if (state.searchValue) newUrl.set("search", state.searchValue || "");
      const fields = filter.reduce((a, b) => {
        return `${a}&fields=${b}`;
      }, "");
      updateUrl(newUrl.toString() + fields);
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

    const updateUrl = (newUrl: string) => {
      dispatch({ type: "SET_URL_FILTER", data: newUrl });
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
              handleEditModal();
            }}
          >
            <FaEdit />
          </Button>

          <Button
            danger
            onClick={() => {
              handleSelect(data);
              handleDeleteModal();
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
      handleEditModal,
      handleDeleteModal,
      handleSelect,
      getData,

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
