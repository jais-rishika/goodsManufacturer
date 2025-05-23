import type { PropsWithChildren, ReactNode } from "react";

export interface CardProps extends PropsWithChildren{
    id: string;
    src: string;
    name: string;
    point: number;

    price?: number | null;
    qty? : number
    actions?: ReactNode;

    children?: ReactNode;
}