import type { ToolsState, ToolAction } from "./Tools.types"

export const initialToolState: ToolsState={
    isLoading: false,
    error: '',
    toolsData: [],
    addModal: false,
    deleteModal: false,
    editModal: false,
    selectedTool: null
}

export const toolsReducer=(prevState: ToolsState,action: ToolAction): ToolsState=>{
    switch(action.type){
        case "ADD_MODAL":
            return {...prevState, addModal: !prevState.addModal}
        case "DELETE_MODAL":
            return {...prevState, deleteModal: !prevState.deleteModal}
        case "EDIT_MODAL":
            return {...prevState, editModal: !prevState.editModal}
        case "SELECT_TOOL":
            return {...prevState, selectedTool: action.data}
        case "UPDATE TOOLS":
            return {...prevState, toolsData: action.data}
        default: 
            return prevState
    }
}