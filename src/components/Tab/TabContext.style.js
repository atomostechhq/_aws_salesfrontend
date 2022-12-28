import styled, { css } from "styled-components";

export const TabContextContainer = styled.div`
  ${(props) => {
    if (props.position === "vertical") {
      return css`
        display: flex;
        gap: 20px;
      `;
    } else if (props.position === "horizontal") {
      return css`
        display: flex;
        flex-direction: column;
        gap: 20px;
      `;
    }
  }}
`;

export const TabListContainer = styled.div`
  ${(props) => {
    if (props.position === "vertical") {
      return css`
        display: grid;
        gap: 20px;
        border-right: 1px solid lightgray;
        /* padding: 20px; */
      `;
    } else if (props.position === "horizontal") {
      return css`
        display: flex;
        align-items: center;
        gap: 20px;
      `;
    }
  }};
`;

export const TabContainer = styled.div`
  text-transform: uppercase;
  cursor: pointer;
  color: #666666;
  letter-spacing: 1px;
  padding: 15px;
  ${(props) => {
    if (props.position === "vertical")
      return css`
        border-right: 3px solid white;
      `;
    else if (props.position === "horizontal")
      return css`
        border-bottom: 3px solid white;
      `;
  }}

  &:hover {
    /* color: #888888; */
    background-color: rgb(232, 240, 254);
  }
  ${(props) => {
    if (props.selectedTabValue === props.value) {
      if (props.position === "vertical") {
        return css`
          color: #1765dc;
          border-right: 3px solid #1765dc;
        `;
      } else
        return css`
          color: #1765dc;
          border-bottom: 3px solid #1765dc;
        `;
    }
  }};
`;

export const TabPanelContainer = styled.div`
  ${(props) => {
    if (props.selectedTabValue === props.value) {
      return css`
        display: block;
      `;
    } else {
      return css`
        display: none;
      `;
    }
  }}
`;
