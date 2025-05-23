import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean,
    secondary?: boolean,
    danger?:boolean
} 
