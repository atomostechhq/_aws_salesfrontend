import styled, { css } from "styled-components";

export const CheckBoxContainer = styled.div``;

export const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

export const Box = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: ${({ bg }) => bg};
  border: 1px solid #1765dc;
  margin: 0.2rem;
  cursor: pointer;

  &:hover {
    /* box-shadow: 0 0 2px #1765dc; */
    filter: drop-shadow(0px 0px 5px #1765dc);
  }

  ${(props) => {
    if (props.disabled) {
      return css`
        background-color: #e0e0e0;
        border: 1px solid #e0e0e0;
        cursor: not-allowed;
        filter: none;

        &:hover {
          filter: none;
        }
      `;
    }
  }}
`;
