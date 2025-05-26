import { createContext, useReducer, type ComponentType } from "react";
import type {
  ToolAction,
  ToolMethods,
  ToolsDetail,
  ToolsState,
} from "./Tools.types";
import { initialToolState, toolsReducer } from "./Tools.reducer";
import { getTools } from "../../../services/tools.service";

export const ToolsContext = createContext<(ToolsState & ToolMethods) | null>(
  null
);

export const withToolContext = <T extends {}>(Component: ComponentType<T>) => {
  return (props: T) => {
    const [state, dispatch] = useReducer(toolsReducer, initialToolState);

    //handlers
    const handleAddModal = () => {
      dispatch({ type: "ADD_MODAL" });
    };

    const handleDeleteModal = () => {
      dispatch({ type: "DELETE_MODAL" });
    };

    const handleEditModal = () => {
      dispatch({ type: "EDIT_MODAL" });
    };

    const getData = async () => {
      try {
        const res = await getTools();
        dispatch({ type: "UPDATE TOOLS", data: res.data });
      } catch (error) {}
    };

    const setSelected = (data: ToolsDetail) => {
      dispatch({ type: "SELECT_TOOL", data: data });
    };

    const handlers: ToolMethods = {
      handleAddModal,
      handleDeleteModal,
      handleEditModal,
      getData,
      setSelected,
    };
    return (
      <ToolsContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </ToolsContext.Provider>
    );
  };
};
