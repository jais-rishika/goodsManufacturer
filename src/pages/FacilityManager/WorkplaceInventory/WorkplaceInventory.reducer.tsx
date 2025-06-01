import type { WorkplaceInventoryAction, WorkplaceInventoryState } from "./WorkplaceInventory.types";

export const workplaceInventoryInitialState: WorkplaceInventoryState = {
  isLoading: false,
  error: "",

  ToolInventoryData: [],
  selectedTool: null,

  selectedFilters: [],
  searchValue: "",
  count: 0,
  urlFilter: "page=0&size=5",
};

export const WorkplaceInventoryReducer = (
  prevState: WorkplaceInventoryState,
  action: WorkplaceInventoryAction
): WorkplaceInventoryState => {
  switch (action.type) {
    case "UPDATE_TOOLS":
      return { ...prevState, ToolInventoryData: action.data };
    case "SELECT_TOOL":
      return { ...prevState, selectedTool: action.data };

    case "SET_COUNT":
      return { ...prevState, count: action.count };
    case "SET_FILTERS":
      return { ...prevState, selectedFilters: action.data };
    case "SET_SEARCH":
      return { ...prevState, searchValue: action.data };
    case "SET_URL_FILTER":
      return { ...prevState, urlFilter: action.data };

    default:
      return prevState;
  }
};
