import styled, { css } from "styled-components";

export const ToggleOuter = styled.div`
    position: relative;
    width: 40px;
    height: 24px;
    border-radius: 100px;
    background-color: ${({bg}) => bg};
    cursor: pointer;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.4);
    opacity: ${({opacity}) => opacity};
    pointer-events: ${({pointerEvents}) => pointerEvents};
`

export const ToggleButton = styled.div`
    position: absolute;
    top: 4px;
    left: ${({left}) => left};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.5s;
`