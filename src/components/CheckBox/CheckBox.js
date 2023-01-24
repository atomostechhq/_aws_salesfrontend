import React, { useMemo, useState } from "react";
import { Box, CheckBoxContainer, CheckLabel } from "./CheckBox.style";

const CheckBox = ({
  label: label,
  checked,
  disabled,
  onChange,
  ...restProps
}) => {
  // const defaultChecked = checked ? checked : false;
  // const [isChecked, setIsChecked] = useState(defaultChecked);
  let isChecked = useMemo(() => (checked ? true : false), [checked]);
  return (
    <CheckBoxContainer>
      <CheckLabel onClick={() => (isChecked = !isChecked)}>
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
