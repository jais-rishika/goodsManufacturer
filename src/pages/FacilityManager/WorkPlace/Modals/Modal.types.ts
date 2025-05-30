import z from "zod";

export const WorkPlaceFormSchema = z.object({
    name: z.string({ invalid_type_error: "Email must be String" }).min(2, { message: "name should contain atleast 2 chars" }),
    // email: z.string({ invalid_type_error: "location must be String" }).min(5, { message: "email should contain atleast 2 chars" }).email("INVALID_EMAIL")
    workplaceManagerEmail: z.string().optional()
})

export type WorkPlaceForm = z.infer<typeof WorkPlaceFormSchema>

export interface ModalProps {}
