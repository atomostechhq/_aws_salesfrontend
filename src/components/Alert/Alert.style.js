import styled, { css } from "styled-components";

export const AlertContainer = styled.div`
  width: 300px;
  max-width: 100%;
  max-height: fit-content;
  /* max-width: fit-content; */
  padding: 16px 16px;
  border-radius: 8px;
  color: #000;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  /* box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25); */
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba
  (10, 37, 64, 0.35) 0px -2px 6px 0px inset; */
  /* box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px; */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  color: #fff;
  /* color: white; */

  ${(props) => {
    // success
    if (props.variant === "success") {
      return css`
        /* background-color: var(--alertSuccess); */
        background: #00a22d;
        box-shadow: 0px 4px 12px #00a12d;
      `;
    }
    // error
    if (props.variant === "error") {
      return css`
        /* border-left: 8px solid var(--alertError);
        border-left: 8px solid #da1e28; */
        background: #9a001c;
        box-shadow: 0px 4px 12px #9d0009;
      `;
    }
    // warning
    if (props.variant === "warning") {
      return css`
        background: #c09800;
        box-shadow: 0px 4px 12px #c09800;
      `;
    }
    if (props.variant === "alternative") {
      return css`
        background: #003f9e;
        box-shadow: 0px 4px 12px #1765dc;
      `;
    }
  }}
`;

export const IconTextWrapper = styled.div`
  display: flex;
`;

export const IconWrapper = styled.div`
  padding-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TextWrapper = styled.div`
  display: flex;
`;
