import { forwardRef } from "react";
import styles from "./Input.module.scss";
import type { InputProps } from "./Input.types.ts";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref?) => {
    return (
      <input {...props} className={`${styles.Input} ${props.className}`} ref={ref}/>
    );
  }
);

export default Input;
