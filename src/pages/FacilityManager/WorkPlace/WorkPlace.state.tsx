import { createContext, useReducer, type ComponentType } from "react";
import type { WorkPlaceData, WorkPlaceMethods, WorkPlaceState, WorkPlaceTableData } from "./WorkPlace.types";
import { workplaceInitialState, workplaceReducer } from "./WorkPlace.reducer";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import { fetchManagerWorkplaces, getWorkPlace } from "../../../services/workplace.service";
import { getAvailWorkSpaceManager } from "../../../services/workplaceManager.service";


export const WorkPlaceContext = createContext<
  (WorkPlaceState & WorkPlaceMethods) | null | any
>(null);

export const withWorkPlace = <T extends {}>(Component: ComponentType<T>) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(
      workplaceReducer,
      workplaceInitialState
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

    const handleSelect = (data: WorkPlaceData) => {
      dispatch({ type: "SELECT", selected: data });
    };

    const setAvailFields = async (val: string) => {
      const facilityManagers = await getAvailWorkSpaceManager(val);
      console.log(facilityManagers);

      dispatch({ type: "SET_AVAIL_FIELDS", data: facilityManagers.data });
    };

    const updateManager = async (val: string) => {
      dispatch({ type: "SET_MANAGER", data: val });
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

    const actionButtons = (data: WorkPlaceData) => {
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
        const workPlace = await getWorkPlace(url);
        setCount(workPlace.page.totalElements);

        const tableData: WorkPlaceTableData[] = workPlace.content.map(
          (data: WorkPlaceData) => {
            return {
              name: data.name,
              workplaceManagerName: data.workplaceManagerName,
              workplaceManagerEmail: data.workplaceManagerEmail,
              action: actionButtons(data),
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
      handleAddModal,
      handleEditModal,
      handleDeleteModal,
      handleSelect,
      getData,
      
      setAvailFields,
      updateManager,

      handleFilterChange,
      handleUrlChange,
      updateSearch,
      setCount
    };

    return (
      <WorkPlaceContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </WorkPlaceContext.Provider>
    );
  };
};
