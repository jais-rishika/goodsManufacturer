import z from "zod";

export const FacilityFormSchema = z.object({
    name: z.string({ invalid_type_error: "Name must be String" }).min(2, { message: "name should contain atleast 2 chars" }),
    address: z.string({ invalid_type_error: "address must be String" }).min(5, { message: "address should contain atleast 2 chars" }),
    facilityManagerEmail: z.string().optional()
})

export type FacilityForm = z.infer<typeof FacilityFormSchema>

export interface ModalProps {
    // handleModal: () => void
    // updateData: () => void
    getAvailFacilityManagers?: ()=> void
    id?: string,
    name?: string,
    address?: string,
    availFields?: string[],
    setAvailFields?: (val: string)=> void
}
