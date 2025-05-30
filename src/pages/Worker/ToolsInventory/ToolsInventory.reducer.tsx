import type {
  ToolsInventoryAction,
  ToolsInventoryState,
} from "./ToolsInventory.types";

export const toolInventoryInitialState: ToolsInventoryState = {
  // isLoading: false,
  // error: "",
  reqToolModal: false,

  reqTableData: [],
  ToolInventoryData: [],
  selectedTool: null,

  selectedFilters: [],
  searchValue: "",
  minPrice: 10,
  maxPrice: 10000,
  count: 0,
  urlFilter: "page=0&size=5",
};

export const ToolInventoryReducer = (
  prevState: ToolsInventoryState,
  action: ToolsInventoryAction
): ToolsInventoryState => {
  switch (action.type) {
    case "REQ_TABLE_DATA":
      return {...prevState, reqTableData: action.data}
    case "UPDATE_TOOLS":
      return { ...prevState, ToolInventoryData: action.data };
    case "REQ_TOOL_MODAL":
      return { ...prevState, reqToolModal: !prevState.reqToolModal };
    case "SELECT_TOOL":
      return { ...prevState, selectedTool: action.data };

    case "SET_COUNT":
      return { ...prevState, count: action.count };
    case "SET_FILTERS":
      return { ...prevState, selectedFilters: action.data };
    case "SET_SEARCH":
      return { ...prevState, searchValue: action.data };
    case "SET_MINPRICE":
      return { ...prevState, minPrice: action.data };
    case "SET_MAXPRICE":
      return { ...prevState, maxPrice: action.data };
    case "SET_URL_FILTER":
      return { ...prevState, urlFilter: action.data };

    default:
      return prevState;
  }
};
