import type { WorkplaceAction, WorkPlaceState } from "./WorkPlace.types";

export const workplaceInitialState: WorkPlaceState = {
  isLoading: false,
  error: "",
  addModal: false,
  deleteModal: false,
  editModal: false,
  selected: null,

  workplaceTableData: [],
  availFields: [],
};

export const workplaceReducer = (
  prevState: WorkPlaceState,
  action: WorkplaceAction
): WorkPlaceState => {

  switch (action.type) {
    
    case "ADD_MODAL":
      return { ...prevState, addModal: action.status };
    case "EDIT_MODAL":
      return { ...prevState, editModal: action.status };
    case "DELETE_MODAL":
      return { ...prevState, deleteModal: action.status };

    case "GET_DATA":
      return { ...prevState, isLoading: true, error: "" };
    case "GET_DATA_FAILED":
      return { ...prevState, isLoading: false, error: action.error };
    case "GET_DATA_SUCCESS":
      return { ...prevState, isLoading: false, workplaceTableData: action.data };

    case "SELECT":
      return { ...prevState, selected: action.selected };
    case "SET_AVAIL_FIELDS":
      return { ...prevState, availFields: action.data };

    default:
      return { ...prevState };
  }
};
