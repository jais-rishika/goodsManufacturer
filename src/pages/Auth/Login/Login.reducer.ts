import type { LoginState, LoginAction } from "./Login.types"

export const initialLoginState: LoginState={
    isLoading: false,
    error: ''
}
export const LoginReducer=(loginState: LoginState,action: LoginAction)=>{
    switch(action.type){
        case "ON_LOGIN":
            return {...loginState,isLoading: true, error:''}
        case "LOGIN_SUCCESSFUL":
            return {...loginState,isLoading: false, error:''}
        case "LOGIN_FAILED":
            return {...loginState,isLoading: false, error: action.error}
    }
}