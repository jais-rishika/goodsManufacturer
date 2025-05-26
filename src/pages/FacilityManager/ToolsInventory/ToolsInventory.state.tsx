import { createContext, useReducer, type ComponentType } from "react";
import type {
  ToolsInventoryAction,
  ToolsInventoryState,
} from "./ToolsInventory.types";
import { toolInventoryInitialState, ToolInventoryReducer } from "./ToolsInventory.reducer";

export const ToolInventoryContext = createContext<
  (ToolsInventoryState & ToolsInventoryAction) | null
>(null);

export const withToolInventory=<T extends {}>(Component: ComponentType<T>)=>{
    (props: T)=>{
        const [state,dispatch]=useReducer(ToolInventoryReducer,toolInventoryInitialState)
        return <ToolInventoryContext.Provider value={{...state}}>
            <Component {...props}/>
        </ToolInventoryContext.Provider>
    }
}
