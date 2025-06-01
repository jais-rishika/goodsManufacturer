import z from "zod";

export const WorkStationFormSchema = z.object({
    name: z.string({ invalid_type_error: "Name must be String" }).min(2, { message: "name should contain atleast 2 chars" }).optional(),
    // address: z.string({ invalid_type_error: "address must be String" }).min(5, { message: "address should contain atleast 2 chars" }),
    workerEmail: z.string().optional()
})

export type WorkStationForm = z.infer<typeof WorkStationFormSchema>

export interface ModalProps {
    getAvailWorkStationManagers?: ()=> void
    id?: string,
    name?: string,
    address?: string,
    availFields?: string[],
    setAvailFields?: (val: string)=> void
}
