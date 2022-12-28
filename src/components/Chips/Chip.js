import React from "react";
import { Chips } from "./Chip.style";

const Chip = ({ children, variant, color, ...restProps }) => {
  return (
    <>
      <Chips variant={variant} color={color}>
        {children}
      </Chips>
    </>
  );
};

Chip.propTypes = {
  variant: null,
  children: null,
  color: null,
};

export default Chip;
