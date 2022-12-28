import React from "react";
import {
  TableActionPopUpContainer,
  TableBodyContainer,
  TableCellDataContainer,
  TableCellHeadContainer,
  TableContainer,
  TableHeadContainer,
  TableRowContainer,
  TableWithPaginationContainer,
} from "./Table.style.js";
import TablePagination from "./TablePagination";

const Table = ({ children }) => {
  return <TableContainer>{children}</TableContainer>;
};
export const TableWithPagination = ({ children }) => {
  return (
    <TableWithPaginationContainer>{children}</TableWithPaginationContainer>
  );
};

export const TableHead = ({ children }) => {
  return <TableHeadContainer>{children}</TableHeadContainer>;
};

export const TableBody = ({ children }) => {
  return <TableBodyContainer>{children}</TableBodyContainer>;
};

export const TableRow = ({ children }) => {
  return <TableRowContainer>{children}</TableRowContainer>;
};

export const Th = ({ children }) => {
  return <TableCellHeadContainer>{children}</TableCellHeadContainer>;
};

export const Td = ({ children }) => {
  return <TableCellDataContainer>{children}</TableCellDataContainer>;
};

export const TableActionPopUp = ({ selectedRows, children }) => {
  return (
    <>
      {selectedRows.length ? (
        <TableActionPopUpContainer>
          {selectedRows.length} Item selected
          {children}
        </TableActionPopUpContainer>
      ) : null}
    </>
  );
};

export default Table;
