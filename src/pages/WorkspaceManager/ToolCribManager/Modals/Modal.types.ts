import z from "zod";

export const ToolCribManagerFormSchema = z.object({
    name: z.string({ invalid_type_error: "Email must be String" }).min(2, { message: "name should contain atleast 2 chars" }),
    email: z.string({ invalid_type_error: "location must be String" }).min(5, { message: "email should contain atleast 2 chars" }).email("INVALID_EMAIL")
})

export type ToolCribManagerForm = z.infer<typeof ToolCribManagerFormSchema>

export interface ModalProps {}
