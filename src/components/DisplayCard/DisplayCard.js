import React from "react";
import { CardBody, CardHeader, DisplayCardWrapper } from "./DisplayCard.style";
import PropTypes, { string } from "prop-types";

const DisplayCard = ({ cardHeader, cardBody,customWidth, ...restProps  }) => {
  return (
    <DisplayCardWrapper customWidth={customWidth} {...restProps}>
      <CardHeader>{cardHeader}</CardHeader>
      <CardBody>{cardBody}</CardBody>
    </DisplayCardWrapper>
  );
};

DisplayCard.propTypes = {
  cardHeader: string,
  cardBody: string,
  customWidth: null
};

export default DisplayCard;
