import z from "zod";

export interface ModalProps {
    getAvailFacilityManagers?: () => void
    id?: string,
    name?: string,
    address?: string,
    availFields?: string[],
    setAvailFields?: (val: string) => void
}

export const ToolsSchema = z.object({
    name: z.string().min(3, { message: "name can't be less than 3" }),
    price: z.number().min(1, { message: "Price Cant be less than 1" }),
    fineAmount: z.number().min(0, { message: "Fine Amout Cant be less than 1" }).nullable(),
    category: z.enum(["NORMAL", "SPECIAL"], { message: "Choose One Category" }),
    isPerishable: z.boolean(),
    returnPeriod: z.number().min(0, { message: "Return Period can't be less than 1" }).optional(),

    toolImage: z.custom<FileList>().
    refine((files) => {
        if (!files || files.length === 0) return false;
    }, { message: "Please add Tool Image" }).
    refine((files) => {
        const fileExt = ["image/png", "image/jpeg", "image/jpg"];
        return fileExt.includes(files.item(0)?.type || "")
    }, { message: "Wrong File Type" })
    
},)

export type ToolForm = z.infer<typeof ToolsSchema>