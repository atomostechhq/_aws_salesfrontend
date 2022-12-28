import React from "react";
import { CardBody, CardTitle, LinkCardContent, LinkCardWrapper } from "./LinkCard.style";

const LinkCard = ({ cardTitle, cardBody, href, ...restProps }) => {
  return (
    <LinkCardWrapper href={href} {...restProps}>
      <LinkCardContent>
        <CardTitle>{cardTitle}</CardTitle>
        <CardBody>{cardBody}</CardBody>
      </LinkCardContent>
    </LinkCardWrapper>
  );
};

export default LinkCard;
