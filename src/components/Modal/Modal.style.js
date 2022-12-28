import styled, { keyframes } from "styled-components";
import { MdClose } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";

export const fadeInDown = keyframes`
  0% {
      opacity: 0;
      transform: translateY(-100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
  /* transition: 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; */
`;

export const ModalWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  padding: 0 32px 32px 32px;
  margin: 32px;
  /* animation: ${fadeInDown} cubic-bezier(0.15, 1.28, 0,1.32) 0.5s; */
  animation: ${fadeInDown} cubic-bezier(0.14, 1.27, 0.57,1.54) 0.5s;
  /* animation: ${fadeInDown} cubic-bezier(0.4, 0, 0.2, 1) 0.5s; */
`;

export const ModalContent = styled.div`
  padding-top: 24px;
`;

export const CloseModalContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  color: #1756dc;
  cursor: pointer;

  &:hover {
    background-color: #1756dc;
    color: white;
  } 
`;

export const CloseModalButton = styled(RiCloseLine)``;
