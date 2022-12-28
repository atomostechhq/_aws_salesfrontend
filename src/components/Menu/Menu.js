import { useState } from "react";
import { MenuMain, MenuTitle, MenuChild, MenuTitleItems } from "./Menu.styled";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Menu = ({ children, title, to }) => {
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const showSubMenu = isHovered;

  // console.log(children.length)
  return (
    // <Router>
      <NavLink to={to}>
        <MenuMain
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <MenuTitle onClick={() => setShow(!show)}>
            <MenuTitleItems>
              {title}
              {children?.length > 0 ? (
                showSubMenu ? (
                  <MdOutlineKeyboardArrowDown />
                ) : (
                  <MdOutlineKeyboardArrowRight />
                )
              ) : (
                ""
              )}
              {showSubMenu && <MenuChild>{children}</MenuChild>}
            </MenuTitleItems>
          </MenuTitle>
        </MenuMain>
      </NavLink>
    // </Router>
  );
};

export default Menu;
