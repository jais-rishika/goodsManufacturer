import Button from "../../../components/Button/Button.tsx";
import Input from "../../../components/Input/Input.tsx";
import styles from "./Login.module.scss";
import { LoginSchema, type LoginForm, type LoginProps } from "./Login.types.ts";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useContext, useEffect } from "react";
import { LoginContext, withLoginContext } from "./Login.state.tsx";


const Login = ({}: LoginProps) => {
  const { register, handleSubmit, formState } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const {checkLogin,handleLogin}=useContext(LoginContext)!;

  // const checkLogin = async () => {
  //   try {
  //     const res = await getRole();
  //     console.log(localStorage.getItem("token"),res.role);
      
  //     navigate(`/${res.role}`);
  //   } catch (error) {}
  // };

  // const handleLogin = async (data: LoginForm) => {
  //   try {
  //     dispatch({ type: "ON_LOGIN" });
  //     const res = await login(data);
  //     localStorage.setItem("token", res.jwtToken);
  //     dispatch({ type: "LOGIN_SUCCESSFUL" });

  //     toast.success("Login Successful");
  //     navigate(`/${res.role}`);
  //   } catch (error: any) {
  //     console.log(error);

  //     toast.error("Login Failed");
  //     dispatch({ type: "LOGIN_FAILED", error: error.message });
  //   }
  // };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className={styles.LoginPage}>
      <div className={styles.LoginLeftSide}></div>
      <div className={styles.LoginRightSide}>
        <form className={styles.LoginForm} onSubmit={handleSubmit(handleLogin)}>
          <h1>LOGIN</h1>
          <Input
            type="email"
            placeholder="Enter Email..."
            {...register("email")}
          />
          {formState.errors.email && (
            <small>{formState.errors.email.message}</small>
          )}
          <Input
            type="password"
            placeholder="Enter Password..."
            {...register("password")}
          />
          {formState.errors.password && (
            <small>{formState.errors.password.message}</small>
          )}
          <Button type="submit" primary>
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default withLoginContext(Login);
