import React, { useEffect } from "react";
import {
  AlertContainer,
  CloseButton,
  IconTextWrapper,
  IconWrapper,
  TextWrapper,
} from "./Alert.style";
import PropTypes from "prop-types";
import { AlertVariant } from "./Alert.constant";
import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsExclamationCircleFill,
} from "react-icons/bs";
import { AiFillInfoCircle, AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

const Alert = ({
  variant,
  message,
  noBorder,
  position,
  alertOpen,
  setAlertOpen,
  hidesnackbar,
  ...restProps
}) => {
  useEffect(() => {
    setTimeout(() => {
      setAlertOpen(false);
    }, hidesnackbar);
  }, [hidesnackbar]);

  return (
    <>
      {alertOpen ? (
        <AlertContainer
          variant={variant}
          message={message}
          noBorder={noBorder}
          {...restProps}
          position={position}
        >
          <IconTextWrapper>
            <IconWrapper>
              {variant === AlertVariant.SUCCESS && <BsCheckCircleFill />}
              {variant === AlertVariant.WARNING && <BsExclamationCircleFill />}
              {variant === AlertVariant.ERROR && <AiFillCloseCircle />}
              {variant === AlertVariant.ALTERNATIVE && <AiFillInfoCircle />}
            </IconWrapper>
            <TextWrapper>
              <div className="message">{message}</div>
            </TextWrapper>
          </IconTextWrapper>
          <CloseButton onClick={() => setAlertOpen((prev) => !prev)}>
            <MdOutlineClose />
          </CloseButton>
        </AlertContainer>
      ) : null}
    </>
  );
};

Alert.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string,
  noBorder: PropTypes.bool,
};

export default Alert;
