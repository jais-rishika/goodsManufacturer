import styles from "./Button.module.scss" 
import type { ButtonProps } from "./Button.types.ts" 
 
const Button = ({className,primary,secondary,danger,...buttonProps}: ButtonProps) => { 
    const buttonStyle=primary?styles.PrimaryBtn:secondary?styles.SecondaryBtn:danger?styles.DangerBtn:styles.DefaultBtn;

    return <button {...buttonProps} className={`${buttonStyle} ${className}`}></button>; 
}; 
 
export default Button 
