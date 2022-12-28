import styled, { css } from "styled-components";

export const Parent = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;

export const Label = styled.label`
  position: relative;
  font-size: 14px;
`;

export const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  height: 40px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #333;
  :focus-visible {
    border: none;
  }
  &:focus {
    border: none;
    outline: 1px solid #1765dc;
  }
  // &:valid + span,--> tell this later to show placeholder comes back
  &:focus + span,
  &.dirty + span {
    top: -22px;
    font-size: 12px;
    color: #1765dc;
    padding: 0.2em 0.4em;
    /* display: none;
    transition: display 0.3s ease; */
  }

  ${(props) => {
    if (props.disabled) {
      return css`
        background-color: #e0e0e0;
        border: 1px solid #e0e0e0;
        cursor: not-allowed;
      `;
    }
  }}
`;

export const PlaceHolder = styled.span`
  position: absolute;
  left: 5%;
  background-color: #fff;
  color: #666;

  top: 2%;
  font-size: 12px;
  color: #666;
  transition: top 0.2s ease-in, color 0.2s ease-in;
  /* transition: all 0.3s ease; */
`;

// export const ErrorMessage = styled.span`
//   width: 17rem;
//   display: flex;
//   align-items: center;
//   padding: 0 8px;
//   font-size: 12px;
//   color: red;
//   height: 24px;
// `;
