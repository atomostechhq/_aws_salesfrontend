import { SubMenuTitle, MenuChild, MenuMain } from "./Menu.styled";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const SubMenu = ({ children, title, to }) => {
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const showSubMenu = isHovered;

  return (
    <NavLink to={to}>
      <MenuMain
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SubMenuTitle>
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
        </SubMenuTitle>
      </MenuMain>
    </NavLink>
  );
};

export default SubMenu;
