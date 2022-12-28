import styled, { css } from "styled-components";

export const AvatarContainer = styled.span`
  position: relative;
  /* border: 1px solid red; */
  display: inline-block;
`;

export const CircleContainer = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 16px;

  ${(props) => {
    if (props.size === "sm") {
      return css`
        width: 24px;
        height: 24px;
        font-size: 10px;
      `;
    }
    if (props.size === "md") {
      return css`
        width: 35px;
        height: 35px;
        font-size: 14px;
      `;
    }
    if (props.size === "lg") {
      return css`
        width: 56px;
        height: 56px;
      `;
    }
  }}

  ${(props) => {
    // console.log(props);

    // success
    if (props.variant === "success") {
      return css`
        border: 3px solid #00a12d;
        color: #00a12d;
      `;
    }
    // error
    if (props.variant === "error") {
      return css`
        border: 3px solid #9a001c;
        color: #9a001c;
      `;
    }
    // primary
    if (props.variant === "primary") {
      return css`
        border: 3px solid #003f9e;
        color: #003f9e;
      `;
    }
    // warning
    if (props.variant === "warning") {
      return css`
        border: 3px solid #c09800;
        color: #c09800;
      `;
    }
  }}
`;

export const BadgeContainer = styled.span`
  /* width: 20px;
  height: 18px; */
  padding: 0.5em;
  position: absolute;
  top: 70%;
  left: 50%;
  border-radius: 8px;
  font-weight: 900;
  font-size: 8px;
  color: white;
  letter-spacing: 0.16px;

  ${(props) => {
    if (props.variant === "success") {
      return css`
        background-color: #00a12d;
      `;
    }
    if (props.variant === "error") {
      return css`
        background-color: #9a001c;
      `;
    }
    if (props.variant === "warning") {
      return css`
        background-color: #c09800;
      `;
    }
    if (props.variant === "primary") {
      return css`
        background-color: #003f9e;
      `;
    }
  }}
`;

export const AvatarImgContainer = styled.span`
  position: relative;
  /* display: inline-flex; */
  display: inline-block;
`;

export const CircleImgContainer = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;

  ${(props) => {
    if (props.size === "sm") {
      return css`
        width: 24px;
        height: 24px;
      `;
    }
    if (props.size === "md") {
      return css`
        width: 35px;
        height: 35px;
      `;
    }
    if (props.size === "lg") {
      return css`
        width: 56px;
        height: 56px;
      `;
    }
  }}

  ${(props) => {
    // console.log(props);
    // success
    if (props.variant === "success") {
      return css`
        border: 3px solid #00a12d;
        color: #00a12d;
      `;
    }
    // error
    if (props.variant === "error") {
      return css`
        border: 3px solid #9a001c;
        color: #9a001c;
      `;
    }
    // primary
    if (props.variant === "primary") {
      return css`
        border: 3px solid #003f9e;
        color: #003f9e;
      `;
    }
    // warning
    if (props.variant === "warning") {
      return css`
        border: 3px solid #c09800;
        color: #c09800;
      `;
    }
  }}
`;
