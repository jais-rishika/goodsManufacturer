import { z } from "zod"
import { file } from "zod/v4"
import { required } from "zod/v4-mini"

export interface ToolsProps { }

export interface ToolsShowDetail {
    // photo: string
    name: string,
    price: number,
    fineAmount: number,
    category: "NORMAL" | "SPECIAL",
    isPerishable: string,
    returnPeriod: number
}

export interface ToolsDetail extends ToolsShowDetail {
    id: string
}

export const ToolsSchema = z.object({
    name: z.string().min(3, { message: "name can't be less than 3" }),
    price: z.number().min(1, { message: "Price Cant be less than 1" }),
    fineAmount: z.number().min(0, { message: "Fine Amout Cant be less than 1" }).optional(),
    category: z.enum(["NORMAL", "SPECIAL"],{message: "Choose One Category"}),
    isPerishable: z.boolean(),
    returnPeriod: z.number().min(1, { message: "Return Period can't be less than 1" }).optional(),

//     photo: z.instanceof(File).refine((file) => [
//         "image/png",
//         "image/jpeg",
//         "image/jpg",
//     ].includes(file.type),{message: "INVALID FILE type"})
// }).refine((data)=>{
//     if(data.isPerishable){
//         return (
//           typeof data.fineAmount === "number" &&
//           data.fineAmount >= 0 &&
//           typeof data.returnPeriod === "number" &&
//           data.returnPeriod >= 1
//         );
//     }
//     return true;
// },{
//     message: "Fine amount and return period are required for perishable tools"
// }
})

export type ToolForm = z.infer<typeof ToolsSchema>




export interface ToolsState {
    isLoading: boolean,
    error: string
    toolsData: ToolsDetail[]
    addModal: boolean,
    deleteModal: boolean,
    editModal: boolean,
    selectedTool: ToolsDetail | null
}

export interface ToolMethods {
    handleAddModal: () => void,
    handleDeleteModal: () => void,
    handleEditModal: () => void,
    getData: () => void,
    setSelected: (data: ToolsDetail) => void,
}

export type ToolAction = {
    type: "UPDATE TOOLS",
    data: ToolsDetail[]
} | {
    type: "DELETE_MODAL"
} | {
    type: "EDIT_MODAL"
} | {
    type: "ADD_MODAL"
} | {
    type: "SELECT_TOOL"
    data: ToolsDetail
} | {
    type: "ADD_TOOL"
    data: ToolsDetail
} | {
    type: "ADD_TOOL_SUCCESS"
    data: ToolsDetail
} | {
    type: "ADD_TOOL_FAILURE"
    data: ToolsDetail
}
