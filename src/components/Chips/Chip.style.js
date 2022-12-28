import styled, { css } from "styled-components";

export const Chips = styled.span`
  background-color: aliceblue;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  background-color: transparent;

  ${(props) => {
    // primary filled and outlined
    if (props.variant === "filled" && props.color === "primary") {
      return css`
        background-color: #1765dc;
        background: #edf5ff;
        border: 1px solid #1765dc;
        color: #1765dc;
        font-weight: 900;
      `;
    }
    if (props.variant === "outlined" && props.color === "primary") {
      return css`
        border: 1px solid #1765dc;
        color: #1765dc;
        font-weight: 600;
      `;
    }
    // success filled and outlined
    if (props.variant === "filled" && props.color === "success") {
      return css`
        background: #defbe6;
        border: 1px solid #198038;
        color: #198038;
        font-weight: 900;
      `;
    }
    if (props.variant === "outlined" && props.color === "success") {
      return css`
        border: 1px solid #198038;
        color: #198038;
        font-weight: 600;
      `;
    }
    // warning filled and outlined
    if (props.variant === "filled" && props.color === "warning") {
      return css`
        background: #fcf4d6;
        border: 1px solid #f1c21b;
        color: #f1c21b;
        font-weight: 900;
      `;
    }
    if (props.variant === "outlined" && props.color === "warning") {
      return css`
        border: 1px solid #f1c21b;
        color: #f1c21b;
        font-weight: 600;
      `;
    }
    // error filled and outlined
    if (props.variant === "filled" && props.color === "error") {
      return css`
        background: #FFF1F1;
        border: 1px solid #DA1E28;
        color: #DA1E28;
        font-weight: 900;
      `;
    }
    if (props.variant === "outlined" && props.color === "error") {
      return css`
        border: 1px solid #DA1E28;
        color: #DA1E28;
        font-weight: 600;
      `;
    }
  }}
`;
