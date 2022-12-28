import styled, {keyframes} from "styled-components";

export const MenuCont = styled.div`
    position: relative;
    width: ${({width}) => `${width}`};
    box-shadow: 0 0 8px rgba(0,0,0,0.3);
    height: 100vh;
`

export const MenuContIcon = styled.div`
    position: relative;
    width: 60px;
    height: 30px;
    margin-left: 0.4rem;
    cursor: pointer;
`

export const HamburgerLine1 = styled.div`
    position: absolute;
    width: ${({width}) => `${width}`};
    height: 3px;
    background-color: #333333;
    border-radius: 5px;
    top: 10%;
    transition: all 0.3s;
`

export const HamburgerLine2 = styled.div`
    position: absolute;
    width: ${({width}) => `${width}`};
    height: 3px;
    background-color: #333333;
    border-radius: 5px;
    top: 30%;
    transition: all 0.3s;
`

export const HamburgerLine3 = styled.div`
    position: absolute;
    width: ${({width}) => `${width}`};
    height: 3px;
    background-color: #333333;
    border-radius: 5px;
    top: 50%;
    transition: all 0.3s;
`

export const MenuContChildren = styled.div`
    position: absolute;
    left: ${({left}) => `${left}px`};
    top: 50px;
    width: 100%;
    transition: all 0.5s;
`

export const MenuMain = styled.div`
    display: flex;
`

export const MenuTitle = styled.h1`
    background-color: #fff;
    font-weight: 400;
    font-size: 18px;
    cursor: pointer;
    margin: 0rem;
    padding: 0.8rem 0.6rem;
    width: 100%;
    position: relative;
`

export const MenuTitleItems = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const MenuChild = styled.div`
    position: absolute;
    left: 80%;
    margin-left: 2rem;
    animation: ${fadeIn} 0.3s linear;
    background-color: #F8F8F8;
    border-radius: 8px;
    width: 150px;
    top: 30%;
`

export const SubMenuTitle = styled.h1`
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
    margin: 0;
    position: relative;
    padding: 0.4rem 0.8rem;
`