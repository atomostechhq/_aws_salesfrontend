import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  DropdownContainer,
  DropdownHeader,
  DropdownHeaderContainer,
  DropdownList,
  DropdownListContainer,
  IconWrapper,
  ListItem,
} from "./Dropdown.style";
import { FiChevronDown } from "react-icons/fi";
import { MdKeyboardArrowUp } from "react-icons/md";

const Dropdown = ({
  options: options,
  dropdownText,
  label,
  defaultValue,
  onChange,
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(options);
  const toggling = () => setIsOpen(!isOpen);
  const [selectedOption, setSelectedOption] = useState();

  const onOptionClicked = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  useEffect(() => {
    if (typeof defaultValue === "function") setSelectedOption(defaultValue());
    // setValue(defaultValue);
  }, [defaultValue]);

  return (
    <DropdownContainer {...restProps} ref={ref}>
      <DropdownHeaderContainer onClick={toggling}>
        <DropdownHeader>{selectedOption || dropdownText}</DropdownHeader>
        <IconWrapper>
          {isOpen ? <MdKeyboardArrowUp /> : <FiChevronDown />}
        </IconWrapper>
      </DropdownHeaderContainer>
      {isOpen && (
        <DropdownListContainer>
          <DropdownList>
            {options.map((option) => (
              <ListItem
                value={
                  options?.filter(
                    (option) => option?.value === selectedOption
                  )[0]?.label
                }
                onClick={() => {
                  onChange(option);
                  onOptionClicked(option?.label);
                }}
              >
                {option.label}
              </ListItem>
            ))}
          </DropdownList>

          {/* {options.map((option) => (
              <ListItem onClick={onOptionClicked(option)}>{option}</ListItem>
            ))} */}
        </DropdownListContainer>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
