import React, { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import TextField from "../TextField/TextField";
import { Box } from "./AutoComplete.style";

const AutoComplete = ({
  options: options,
  label,
  onChange: handleOptionsChange,
  disabled,
  placeholder,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState(options);

  const optionsX = useMemo(() => {
    if (typeof options === "function") return options();
    else return options;
  }, [options]);

  // console.log(defaultValue);
  useEffect(() => {
    // console.log(defaultValue());
    if (typeof defaultValue === "function") setValue(defaultValue());
    // setValue(defaultValue);
  }, [defaultValue]);

  const autocompleteRef = useRef();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSuggestions = (suggestion) => {
    setValue(suggestion?.value);
    handleOptionsChange &&
      handleOptionsChange(suggestion?.value, suggestion?.label);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (typeof options === "function") setSuggestions(options());
    else setSuggestions(options);
  }, [options]);

  // console.log(suggestions);
  return (
    <Box ref={autocompleteRef}>
      <TextField
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        value={optionsX?.filter((option) => option?.value === value)[0]?.label}
        // onChange={(e)=>console.log(e)}
        onChange={(e) => {
          setValue(e.target.value);
          handleOptionsChange && handleOptionsChange(e.target.value);
          if (e.target.value) {
            setSuggestions((prev) => {
              return optionsX?.filter((option) =>
                option?.label?.toLowerCase().includes(e.target.value)
              );
            });
          } else {
            setSuggestions(optionsX);
          }
        }}
        onFocus={() => {
          setSuggestions((prev) => {
            return optionsX?.filter((option) => option?.value !== value);
          });
          setShowSuggestions(true);
        }}
      />
      {showSuggestions && (
        <ul>
          {suggestions?.length ? (
            suggestions.map((suggestion) => (
              <li
                onClick={() => handleSuggestions(suggestion)}
                key={suggestion.value}
              >
                {suggestion.label}
              </li>
            ))
          ) : (
            <p>fetching optionsX...</p>
          )}
        </ul>
      )}
    </Box>
  );
};

export default AutoComplete;
