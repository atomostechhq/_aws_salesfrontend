import styled, { css, keyframes } from "styled-components";

export const fadeInDown = keyframes`
  0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
`;
export const TableWithPaginationContainer = styled.div`
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12.5px);
  border-radius: 8px 8px 0px 0px;
  width: 100%;
  /* / animation: ${fadeInDown} cubic-bezier(0.075, 0.82, 0.165, 1) 1s; / */
`;

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-collapse: separate;
  border-spacing: 0;
`;

export const TableHeadContainer = styled.thead`
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 8px 8px 0px 0px;
  height: 60px;

  margin-bottom: 20px;
  line-height: 1.5em;
`;
export const TableRowContainer = styled.tr`
  &:hover {
    background-color: rgb(241, 243, 245);
    transition: all 0.3s ease;
  }

  .td {
    border-radius: 1em 0 0 1em;
    background-color: red;
  }

  ${(props) => {
    if (props.rowActive) {
      return css`
        background-color: rgb(206, 228, 254);
        transition: all 0.3s ease;
        &:hover {
          background-color: rgb(206, 228, 254);
        }
      `;
    }
  }}
`;

export const TableBodyContainer = styled.tbody`
  width: 100%;

  &:before {
    content: "@";
    display: block;
    line-height: 15px;
    text-indent: -99999px;
  }
`;

export const TableCellHeadContainer = styled.th`
  background-color: rgb(241, 243, 245);
  font-weight: 500;
  text-align: start;
  padding: 0em 0.5em;
  color: #333333;
  &:first-child {
    padding-left: 1.5em;
  }
  &:last-child {
    padding-right: 1.5em;
  }
`;

export const TableCellDataContainer = styled.td`
  /* height: 50px; */
  padding: 0em 0.5em;
  text-align: start;
  &:first-child {
    padding-left: 1.5em;
  }
  &:last-child {
    padding-right: 1.5em;
  }
`;

export const fadeInUp = keyframes`
  0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
`;

export const TableActionPopUpContainer = styled.div`
  background: #1765dc;
  border-radius: 8px 8px 0 0;
  padding: 1em 1.5em;
  background: #1765dc;
  box-shadow: 0px 4px 16px #1765dc;
  backdrop-filter: blur(12.5px);
  color: white;
  animation: ${fadeInUp} cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
`;
