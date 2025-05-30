import { createContext, useReducer, type ComponentType } from "react";

import type {
  FacilityManagerState,
  FacilityManagerMethods,
  FacilityManagerTableData,
  FacilityManagerData,
} from "./FacilityManagerPage.types";

import {
  FacilityManagerReducer,
  facilityManagerInitialState,
} from "./FacilityManagerPage.reducer";
import { getFacilityManager } from "../../../../services/FacilityManager.service";
import Button from "../../../../components/Button/Button";
import { FaEdit, FaTrash } from "react-icons/fa";

//create Context
export const FacilityManagerContext = createContext<
  (FacilityManagerState & FacilityManagerMethods) | null
>(null);

//HOC
export const withFacilityManagerContext = <T extends {}>(
  Component: ComponentType<T>
) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(
      FacilityManagerReducer,
      facilityManagerInitialState
    );

    //handlers
    const handleAddModal = () => {
      dispatch({ type: "ADD_MODAL", status: !state.addModal });
    };

    const showEditModal = () => dispatch({ type: "EDIT_MODAL", status: true });
    const hideEditModal = () => dispatch({ type: "EDIT_MODAL", status: false });


    const showDeleteModal = () => dispatch({ type: "DELETE_MODAL", status: true });
    const hideDeleteModal = () => dispatch({ type: "DELETE_MODAL", status: false });

    const handleSelect = (data: FacilityManagerData) => {
      dispatch({ type: "SELECT", selected: data });
    };

    //filter handlers
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

    //actionButtonTemplate
    const actionButtons = (data: FacilityManagerData) => {
      return (
        <>
          <Button
            primary
            onClick={() => {
              handleSelect(data);
              showEditModal()
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
        const facilityManagers = await getFacilityManager(url);
        setCount(facilityManagers.page.totalElements)
        const tableData: FacilityManagerTableData[] =
          facilityManagers.content.map((data: FacilityManagerData) => {
            return {
              name: data.name,
              email: data.email,
              createdAt: data.createdAt.substring(0, 10),
              facilityName: data.facilityName,
              action: actionButtons(data),
            };
          });
        dispatch({ type: "GET_DATA_SUCCESS", data: tableData });
      } catch (error) {
        dispatch({
          type: "GET_DATA_FAILED",
          error: "Could not Fetch the Facility Managers",
        });
      }
    };

    const handlers = {
      handleAddModal,
      hideDeleteModal,
      hideEditModal,
      handleSelect,
      getData,

      handleFilterChange,
      handleUrlChange,
      updateSearch,
      setCount,
    };

    return (
      <FacilityManagerContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </FacilityManagerContext.Provider>
    );
  };
};
