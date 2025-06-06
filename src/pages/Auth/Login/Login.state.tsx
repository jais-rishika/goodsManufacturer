import { createContext, useReducer, type ComponentType } from "react";
import type {
  LoginForm,
  LoginMethods,
  LoginState,
} from "./Login.types";
import { initialLoginState, LoginReducer } from "./Login.reducer";
import { getRole, login, roles } from "../../../services/auth.service";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const LoginContext = createContext<(LoginState & LoginMethods) | null>(
  null
);

export const withLoginContext = <T extends {}>(Component: ComponentType<T>) => {
  return (props: T) => {
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(LoginReducer, initialLoginState);

    const checkLogin = async () => {
      try {
        const res = await getRole();
        const role: keyof typeof roles = res.role;
        console.log(role,roles[role]);
        return navigate(`/${roles[role]}`);
      } catch (error) {}
    };

    const handleLogin = async (data: LoginForm) => {
      try {
        dispatch({ type: "ON_LOGIN" });
        const res = await login(data);
        localStorage.setItem("token", res.jwtToken);

        dispatch({ type: "LOGIN_SUCCESSFUL" });
        toast.success("Login Successful");
        const role: keyof typeof roles = res.role;
        navigate(`/${roles[role]}`);

      } catch (error: any) {
        dispatch({ type: "LOGIN_FAILED", error: error.message });
        toast.error("Login Failed");
      }
    };

    const handlers = {
      checkLogin,
      handleLogin,
    };
    return (
      <LoginContext.Provider value={{ ...state, ...handlers }}>
        <Component {...props} />
      </LoginContext.Provider>
    );
  };
};
