import type { ReactNode, TableHTMLAttributes } from "react";
export interface Column<T> {
    id: keyof T;
    label: string;
}
export interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
    columnData: Column<T>[],
    tableData: T[]
} 
