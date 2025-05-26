import { createContext, useReducer, type ComponentType } from "react";
import type { WorkPlaceData, WorkPlaceMethods, WorkPlaceState, WorkPlaceTableData } from "./WorkPlace.types";
import { workplaceInitialState, workplaceReducer } from "./WorkPlace.reducer";
import { getTools } from "../../../services/tools.service";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import { getAvailFacilityManagers } from "../../../services/Facility.service";


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
      const facilityManagers = await getAvailFacilityManagers(val);
      console.log(facilityManagers);

      dispatch({ type: "SET_AVAIL_FIELDS", data: facilityManagers.data });
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

    const getData = async () => {
      try {
        dispatch({ type: "GET_DATA" });
        const tools = await getTools();
        console.log(tools);

        const tableData: WorkPlaceTableData[] = tools.content.map(
          (data: WorkPlaceData) => {
            return {
              name: data.name,
              facilityManagerName: data.workPlaceManagerName,
              facilityManagerEmail: data.workPlaceManagerEmail,
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
    };

    return (
      <WorkPlaceContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </WorkPlaceContext.Provider>
    );
  };
};
