import React from "react";
import { useState } from "react";
import {
  TableBodyContainer,
  TableCellContainer,
  TableHeaderContainer,
  TableRowContainer,
  TableWrapper,
} from "./ExpandableTable.style";

// table
const ExpandableTable = ({ children }) => {
  const [open, setOpen] = useState(false);

  return <TableWrapper>{children}</TableWrapper>;
};

// thead
export const THeader = ({ children }) => {
  return <TableHeaderContainer>{children}</TableHeaderContainer>;
};

// tbody
export const TBody = ({ children }) => {
  return <TableBodyContainer>{children}</TableBodyContainer>;
};

// tr
export const TRow = ({ children }) => {
  return <TableRowContainer>{children}</TableRowContainer>;
};

// td
export const TCell = ({ children }) => {
  return <TableCellContainer>{children}</TableCellContainer>;
};

export default ExpandableTable;
