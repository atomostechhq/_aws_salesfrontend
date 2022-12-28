import { Container, SearchBox, SearchIcon } from "./Search.style";
import { HiSearch } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { useSalesOrderContext } from "../../pages/sales_order/SalesOrderContext";

const Search = ({ onKeyUp, value, placeholder }) => {
  const [show, setShow] = useState(false);
  const [intitalValue, setIntialValue] = useState(value);

  return (
    <Container>
      <SearchBox
        type="text"
        placeholder={placeholder}
        onKeyUp={onKeyUp}
        value={intitalValue}
        onChange={(e) => setIntialValue(e.target.value)}
      ></SearchBox>
      <SearchIcon opacity={show} onClick={onKeyUp}>
        <HiSearch />
      </SearchIcon>
    </Container>
  );
};

export default Search;
