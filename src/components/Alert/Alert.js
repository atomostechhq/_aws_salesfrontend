import React from "react";
import {
  AlertContainer,
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

const Alert = ({ variant, message, noBorder, ...restProps }) => {
  return (
    <AlertContainer
      variant={variant}
      message={message}
      noBorder={noBorder}
      {...restProps}
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
    </AlertContainer>
  );
};

Alert.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string,
  noBorder: PropTypes.bool,
};

export default Alert;
