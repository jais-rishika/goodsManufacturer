import type { ReactNode } from "react";
import styles from "./Table.module.scss";
import type { TableProps } from "./Table.types.ts";
import TableCell from "../TableCell/TableCell.tsx";

const Table = <T extends {}>({ columnData, tableData }: TableProps<T>) => {
  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          {columnData.map((row, idx) => {
            return <th key={idx}>{row.label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tableData && tableData.map((row, idx) => {
          return (
            <tr key={idx}>
              {columnData.map((col, idx) => {
                const value = row[col.id] as ReactNode;
                return <TableCell key={idx}>{value}</TableCell>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
