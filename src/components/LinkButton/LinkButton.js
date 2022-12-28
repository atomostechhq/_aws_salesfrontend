import React from "react";
import PropTypes from "prop-types"
import { LinkButtonWrapper } from "./LinkButton.style";

const LinkButton = ({ children, download, ...restProps }) => {
  return (
    <LinkButtonWrapper {...restProps} download={download}>
      {children}
    </LinkButtonWrapper>
  );
};

LinkButton.propTypes = {
  children: null,
};

export default LinkButton;
