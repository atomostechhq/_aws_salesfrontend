import styled, { css } from "styled-components";

export const ButtonWrapper = styled.button`
  /* width: ${(props) => (props.customWidth ? props.customWidth : "81px")}; */
  height: ${(props) => (props.customHeight ? props.customHeight : "40px")};
  border: ${(props) => (props.customBorder ? props.customBorder : "none")};
  box-shadow: ${(props) =>
    props.customElevated ? props.customElevated : "none"};
  /* padding: ${(props) =>
    props.customPadding ? props.customPadding : "1em"}; */
  outline: none;
  font-size: 16px;
  text-align: center;
  /* display: inline-block; */
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;

  ${(props) => {
    // console.log(props);
    // filled disabled
    if (props.variant === "filled") {
      if (props.disabled) {
        return css`
          background-color: #e0e0e0;
          color: #fff;
        `;
      } else if (props.variant === "filled") {
        return css`
          background-color: #1765dc;
          color: white;
          box-shadow: 0px 4px 8px rgba(23, 101, 220, 0.25);
        `;
      }
    }

    if (props.variant === "outlined") {
      if (props.disabled) {
        return css`
          border: 2px solid #e0e0e0;
          background: #ffffff;
        `;
      } else if (props.variant === "outlined") {
        return css`
          color: #1765DC;
          border: 2px solid #1765DC;
          background-color: transparent;
        `;
      }
    }

    // alternate
    if (props.variant === "alternate") {
      return css`
        background-color: #f4f4f4;
        border: 1px solid #989898;
        color: #1765dc;
      `;
    }
  }}
`;

// export const BtnIcon = styled.span`
//   padding-right: 0.4em;
// `;
