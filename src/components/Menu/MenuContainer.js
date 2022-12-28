import {
  HamburgerLine1,
  HamburgerLine2,
  HamburgerLine3,
  MenuCont,
  MenuContChildren,
  MenuContIcon,
} from "./Menu.styled";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const MenuContainer = ({ children }) => {
  const [left, setLeft] = useState(false);

  return (
    <MenuCont width={left ? "200px" : "0px"} padding={left ? "2rem" : "0"}>
      <MenuContIcon onClick={() => setLeft(!left)}>
        <HamburgerLine1 width={left ? "50px" : "20px"}></HamburgerLine1>
        <HamburgerLine2 width={left ? "40px" : "10px"}></HamburgerLine2>
        <HamburgerLine3 width={left ? "30px" : "20px"}></HamburgerLine3>
      </MenuContIcon>
      <MenuContChildren left={left ? 0 : -224}>{children}</MenuContChildren>
    </MenuCont>
  );
};

export default MenuContainer;
