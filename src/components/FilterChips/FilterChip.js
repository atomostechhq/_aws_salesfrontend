import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Icon, { FilterChipContainer, FilterIcon, Text } from "../FilterChips/FilterChip.style"

export default function FilterChip  ({ children, filterlabel, filtericon, ...restProps }){
  return (
    // <FilterChipWrapper {...restProps}>
    //   <FilterLabel>{filterlabel}</FilterLabel>
    //   <FilterIcon>
    //     {filtericon}
    //     <AiFillCloseCircle />
    //   </FilterIcon>
    // </FilterChipWrapper>
    <FilterChipContainer {...restProps}>{children}</FilterChipContainer>
  );
};


FilterChip.Text = function FilterChipText({children, ...restProps}) {
  return <Text {...restProps}>{children}</Text>
}

FilterChip.FilterIcon = function FilterChipFilterIcon({children, ...restProps}) {
  return <FilterIcon {...restProps}>{children}</FilterIcon>
}


// export default FilterChip;
