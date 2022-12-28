import React, { useState } from "react";
import { Box, CheckBoxContainer, CheckLabel } from "./CheckBox.style";

const CheckBox = ({
  label: label,
  checked,
  disabled,
  onChange,
  ...restProps
}) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);
  return (
    <CheckBoxContainer>
      <CheckLabel onClick={() => setIsChecked((prev) => !prev)}>
        <Box
          {...restProps}
          disabled={disabled}
          checked={isChecked}
          bg={isChecked ? "#1765DC" : "#fff"}
          onClick={(e) => {
            onChange(!isChecked);
          }}
        ></Box>
        <span>{label}</span>
      </CheckLabel>
    </CheckBoxContainer>
  );
};

export default CheckBox;
