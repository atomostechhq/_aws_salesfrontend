import styled, { css, keyframes } from "styled-components";

export const fadeInDown = keyframes`
  0% {
      opacity: 0;
      transform: translateY(-100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
`;

export const fadeInBottomLeft = keyframes`
  0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
`;

export const fadeInBottomCenter = keyframes`
  0% {
      opacity: 0;
      transform: translateY(100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
`;

export const AlertContainer = styled.div`
  width: 350px;
  max-width: 100%;
  max-height: fit-content;
  /* max-width: fit-content; */
  padding: 16px 16px;
  border-radius: 8px;
  color: #000;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  color: #fff;
  position: relative;
  z-index: 50000;

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

  ${({ position }) => {
    switch (position) {
      case "topCenter":
        return css`
          position: absolute;
          top: 15%;
          left: 40%;
          animation: ${fadeInDown} 0.3s linear;

          /* transform: translate(-50%, -50%); */
        `;
      case "bottomLeft":
        return css`
          position: absolute;
          bottom: 5%;
          left: 5%;
          animation: ${fadeInBottomLeft} 0.3s linear;
          z-index: 100000;
        `;
      case "bottomCenter":
        return css`
          position: absolute;
          bottom: 5%;
          left: 40%;
          animation: ${fadeInBottomCenter} 0.3s linear;
        `;
      default:
        return css`
          position: absolute;
          bottom: 5%;
          left: 5%;
          animation: ${fadeInBottomLeft} 0.3s linear;
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

export const CloseButton = styled.span`
  justify-self: flex-end;
  align-self: flex-end;
  cursor: pointer;
`;
