import z from "zod";

export const FacilityManagerFormSchema = z.object({
    name: z.string({ invalid_type_error: "Email must be String" }).min(2, { message: "name should contain atleast 2 chars" }),
    email: z.string({ invalid_type_error: "location must be String" }).min(5, { message: "email should contain atleast 2 chars" }).email("INVALID_EMAIL")
})

export type FacilityManagerForm = z.infer<typeof FacilityManagerFormSchema>

export interface ModalProps {}
