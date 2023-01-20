import React from "react";
import {
  ErrorMessage,
  Input,
  Label,
  Parent,
  PlaceHolder,
} from "./TextField.style";

const TextField = ({ type, placeholder, disabled, value, ...restProps }) => {
  return (
    <Parent>
      <Label>
        <Input
          value={value}
          disabled={disabled}
          {...restProps}
          type={type}
        ></Input>
        {/* <PlaceHolder>{placeholder}</PlaceHolder> */}
        {/* <ErrorMessage>error message</ErrorMessage> */}
      </Label>
    </Parent>
  );
};

export default TextField;
