import React from "react";
import { LinkWrapper } from "./Link.style";

const Link = ({ children, color, border, to, ...restProps }) => {
  return (
    <LinkWrapper
      to={to}
      color={color}
      border={border}
      {...restProps}
    >
      {children}
    </LinkWrapper>
  );
};

export default Link;
