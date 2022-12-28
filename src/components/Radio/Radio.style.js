import styled, { css } from "styled-components";

export const RadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const RadioButton = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #1765dc;
  margin: 0.3rem;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0px 0px 5px #1765dc);
  }

  ${(props) => {
    if (props.disabled) {
      return css`
        border: 1px solid #e0e0e0;
      `;
    }
  }}

  &::after {
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 10px;
    width: 10px;
    background-color: ${({ bg }) => bg};
    border-radius: 50%;

    ${(props) => {
      if (props.disabled) {
        return css`
          background-color: transparent;
          cursor: not-allowed;
          filter: none;
        `;
      }
    }}
  }
`;
