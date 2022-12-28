import React from "react";
import { useState } from "react";
import Button from "../Button";
import {
  CenterContainer,
  HoverContainer,
  TooltipBox,
  TooltipContainer,
  TooltipTarget,
  TooltipWrapper,
} from "./Tooltip.style";

const ToolTip = ({ children, variant, content,  position, ...restProps }) => {

  const [isHovered, setIsHovered] = useState(false);
  const showTooltip = isHovered;

  return (
    <TooltipWrapper>
      <TooltipTarget
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >{children}</TooltipTarget>
      {
        showTooltip && (
          <CenterContainer position={position}>
            <TooltipBox position={position}>{content}</TooltipBox>
          </CenterContainer>
        )
      }
    </TooltipWrapper>
  );
};

export default ToolTip;
