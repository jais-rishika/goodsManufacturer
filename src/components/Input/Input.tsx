import styles from "./Input.module.scss";
import type { InputProps } from "./Input.types.ts";

const Input = (inputProps: InputProps) => {
  return <input {...inputProps} className={styles.Input} />;
};

export default Input;
