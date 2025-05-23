import type { TableCellProps } from "./TableCell.types.ts";

const TableCell = ({children}: TableCellProps) => {
  return <td>{children}</td>;
};

export default TableCell;
