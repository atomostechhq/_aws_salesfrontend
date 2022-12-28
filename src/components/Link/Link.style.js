import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const LinkWrapper = styled(Link)`
  color: ${({ color }) => color};
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;

  &:hover {
    color: #1765dc;
  }

  ${(props) => {
    // default link
    if (props.border === "underline") {
      return css`
        border-bottom: 1px solid black;
      `;
    }
    // none
    if (props.border === "none") {
      return css`
        border-bottom: none;
      `;
    }
  }}
`;
