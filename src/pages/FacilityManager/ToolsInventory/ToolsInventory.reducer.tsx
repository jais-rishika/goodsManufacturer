import type { ToolsInventoryAction, ToolsInventoryState } from "./ToolsInventory.types";

export const toolInventoryInitialState: ToolsInventoryState = {
  isLoading: false,
  error: "",
  sendToolModal: false,

  ToolInventoryData: [],
};

export const ToolInventoryReducer = (prevState: ToolsInventoryState, action: ToolsInventoryAction): ToolsInventoryState => {
    // switch(action.type){
    //     return prevState
    // }
    return prevState;
};
