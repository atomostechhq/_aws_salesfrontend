import { useState } from "react";
import { RadioButton, RadioContainer } from "./Radio.style";

const Radio = ({disabled}) => {
  const [radioChecked, setRadioChecked] = useState();
  return (
    <RadioContainer>
      <RadioButton disabled={disabled}
        bg={radioChecked == 1 ? "#1765DC" : "#fff"}
        onClick={() => setRadioChecked(1)}
      >
      </RadioButton>
      {/* <RadioButton
        bg={radioChecked == 2 ? "#1765DC" : "#fff"}
        onClick={() => setRadioChecked(2)}
      ></RadioButton>
      <RadioButton
        bg={radioChecked == 3 ? "#1765DC" : "#fff"}
        onClick={() => setRadioChecked(3)}
      ></RadioButton>
      <RadioButton
        bg={radioChecked == 4 ? "#1765DC" : "#fff"}
        onClick={() => setRadioChecked(4)}
      ></RadioButton> */}
    </RadioContainer>
  );
};

export default Radio;
