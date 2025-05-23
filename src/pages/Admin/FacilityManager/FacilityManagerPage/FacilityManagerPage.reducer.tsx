import type {
  FacilityManagerAction,
  FacilityManagerState,
} from "./FacilityManagerPage.types";

export const facilityManagerInitialState: FacilityManagerState = {
  isLoading: false,
  error: '',
  addModal: false,
  editModal: false,
  deleteModal: false,
  selected: null,
  facilityManagerTableData: [],
};
export const FacilityManagerReducer = (
  prevState: FacilityManagerState,
  action: FacilityManagerAction
): FacilityManagerState => {

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
      return { ...prevState, isLoading: false, error: action.error};
    case "GET_DATA_SUCCESS":
      return { ...prevState, isLoading: false, facilityManagerTableData: action.data };
    case "SELECT":
      return {...prevState, selected: action.selected}
    default:
      return {...prevState}
  }
};
