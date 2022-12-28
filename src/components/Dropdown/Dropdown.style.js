import styled, { keyframes } from "styled-components";

export const DropdownContainer = styled.div`
  width: ${(props) => (props.customWidth ? props.customWidth : "200px")};
  /* max-width: 200px;
  width: 100%; */
`;

export const DropdownHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4em 1em 0.4em 1em;
  font-weight: 500;
  font-size: 1.3rem;
  background: #ffffff;
  height: 40px;
  cursor: pointer;
  border: 2px solid #1765dc;
  color: #1765dc;
  font-weight: 600;
  font-size: 16px;
  transition: 0.3s ease;
  border-radius: 8px;
`;

export const DropdownHeader = styled.div``;

export const IconWrapper = styled.span`
  color: #1765dc;
  margin-top: 0.1em;
`;

export const DropdownListContainer = styled.div`
  margin-top: -0.3em;
  width: inherit;
  position: absolute;
  z-index: 1000;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const DropdownList = styled.ul`
  margin: 0;
  /* padding-left: 1em;
  padding-right: 0.5em; */
  background: #ffffff;
  box-sizing: border-box;
  font-weight: 500;
  border: 2px solid #1765dc;
  color: #666666;
  box-shadow: inset 0px 6px 8px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.3s linear;
  border-radius: 0px 0px 8px 8px;
  max-height: 300px;
  overflow-y: scroll;

  &:first-child {
    padding-top: 0.5em;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  cursor: pointer;
  padding: 0.5em 1em;
  border-radius: 0px 0px 8px 8px;

  &:hover {
    background: #ecf3ff;
  }
`;
