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
            e.target.value = !isChecked;
            e.target.name = restProps?.name;
            onChange(e);
          }}
        ></Box>
        <span
          onClick={(e) => {
            e.target.value = !isChecked;
            onChange(e);
          }}
        >
          {label}
        </span>
      </CheckLabel>
    </CheckBoxContainer>
  );
};

export default CheckBox;
