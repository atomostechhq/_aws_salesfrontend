import styled, { css } from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export const TablePaginationContainer = styled.div`
  margin: 0 1.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 0;
  border-top: 2px solid lightgray;
  margin: 1.5em 1.5em 0 1.5em;
  /* width: 100%; */
`;

export const SelectContainer = styled.select`
  border: none;
  background: transparent;
  outline: none;
`;

export const LeftArrowIconContainer = styled(AiOutlineLeft)`
  ${(props) => {
    if (props.active === "false") {
      return css`
        color: gray;
        cursor: not-allowed;
      `;
    }
  }}
`;
export const RightArrowIconContainer = styled(AiOutlineRight)`
  ${(props) => {
    if (props.active === "false") {
      return css`
        color: gray;
        cursor: not-allowed;
      `;
    }
  }}
`;

export const ItemsPerPageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const ItemsPerPageLeftContainer = styled.div`
  border-right: 1px solid lightgray;
  padding: 0.2em 1em;
  display: flex;
  align-items: center;
  gap: 10px;
  small {
    color: #666666;
    letter-spacing: 0.5px;
  }
  select {
    padding: 4px;
    outline: none;
    border: 1px solid black;
  }
`;

export const ItemsPerPageRightContainer = styled.div`
  small {
    color: #666666;
    letter-spacing: 0.5px;
  }
`;

export const PageVariableContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  small {
    color: #666666;
    letter-spacing: 0.5px;
  }
`;
