import styled, { css } from "styled-components";

export const ButtonWithIconWrapper = styled.button`
  outline: none;
  font-size: 16px;
  text-align: center;
  height: 40px;
  padding: 8px 16px 8px 8px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  ${(props) => {
    // filled
    if (props.variant === "filledIcon") {
      return css`
        background-color: #1765dc;
        color: #fff;
        border: none;
        box-shadow: 0px 4px 8px rgba(23, 101, 220, 0.25);
      `;
    }
        // outlined
        if (props.variant === "outlinedIcon") {
      return css`
        background-color: #fff;
        color: #1765dc;
        border: 2px solid #1765dc;
      `;
    }

    // alternate
    if (props.variant === "alternateIcon") {
      return css`
        background-color: #f4f4f4;
        border: 1px solid #989898;
        color: #1765dc;
      `;
    }
  }};
`;

export const BtnIcon = styled.span`
  
`;
