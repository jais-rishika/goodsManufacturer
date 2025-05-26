import { createContext, useReducer, type ComponentType } from "react";

import { FaEdit, FaTrash } from "react-icons/fa";
import type { WorkPlaceManagerData, WorkPlaceManagerMethods, WorkPlaceManagerState, WorkPlaceManagerTableData } from "./WorkPlaceManager.types";
import { workPlaceManagerInitialState, WorkPlaceManagerReducer } from "./WorkPlaceManager.reducer";
import Button from "../../../components/Button/Button";

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

    const getData = async () => {
      try {
        dispatch({ type: "GET_DATA" });
        const workPlaceManagers = await getWorkPlaceManager();
        
        const tableData: WorkPlaceManagerTableData[] =
          workPlaceManagers.content.map((data: WorkPlaceManagerData) => {
            return {
              name: data.name,
              email: data.email,
              createdAt: data.createdAt.substring(0, 10),
              WorkPlaceName: data.workPlaceName,
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
    };

    return (
      <WorkPlaceManagerContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </WorkPlaceManagerContext.Provider>
    );
  };
};
