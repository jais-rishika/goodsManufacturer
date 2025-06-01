import z from "zod";

export const SendToolFormSchema = z.object({
    workplace: z.string({ invalid_type_error: "Email must be String" }).min(2, { message: "name should contain atleast 2 chars" }).optional(),
    toolName: z.string({ invalid_type_error: "Email must be String" }).min(2, { message: "name should contain atleast 2 chars" }),
    quantity: z.number().min(1,{message: "Quantity can't be less than 1"})
})

export type SendToolForm = z.infer<typeof SendToolFormSchema>

export interface SendToolPayload{
    workplaceId: string,
    toolId: string,
    quantity: number
}

export interface ModalProps {}
