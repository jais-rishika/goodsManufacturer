import { z } from "zod"

export interface LoginProps {} 
export type LoginAction={
    type: "ON_LOGIN"
}|{
    type: "LOGIN_SUCCESSFUL"
}|{
    type: "LOGIN_FAILED"
    error: string
}

export interface LoginState{
    isLoading: boolean,
    error: string
}

export const LoginSchema= z.object({
    email: z.string({invalid_type_error: "Email must be String", message: "Invalid Email" }).min(5,{message: "Email should be atleast of length 5"}).email("Invalid Email"),
    password: z.string({invalid_type_error: "Password must be String" }).min(4,{message: "Password should be atleast of length 4"})
})

export type LoginForm= z.infer<typeof LoginSchema>;