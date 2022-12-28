import React from "react";
import {
  Background,
  CloseModalButton,
  CloseModalContainer,
  ModalContent,
  ModalWrapper,
} from "./Modal.style";

const Modal = ({ showModal, setShowModal, children }) => {
  return (
    <>
      {showModal ? (
        <Background>
          <ModalWrapper>
            <ModalContent>{children}</ModalContent>
            <CloseModalContainer onClick={() => setShowModal((prev) => !prev)}>
              <CloseModalButton size={17} />
            </CloseModalContainer>
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default Modal;
