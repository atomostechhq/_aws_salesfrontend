import React from "react";
import {
  AvatarContainer,
  AvatarImgContainer,
  BadgeContainer,
  CircleContainer,
  CircleImgContainer,
} from "./Avatar.style";

const Avatar = ({
  type,
  body,
  children,
  variant,
  badge,
  size,
  src,
  ...restProps
}) => {
  // console.log(badge);
  return (
    <>
      {type === "text" ? (
        <AvatarContainer type="text" {...restProps}>
          {body}
          <CircleContainer size={size} variant={variant}>{children}</CircleContainer>
          {badge ? (
            <BadgeContainer variant={variant}>{badge}</BadgeContainer>
          ) : null}
        </AvatarContainer>
      ) : type === "img" ? (
        <AvatarImgContainer type="img">
          <CircleImgContainer size={size} variant={variant} src={src} />
          {badge ? (
            <BadgeContainer variant={variant}>{badge}</BadgeContainer>
          ) : null}
        </AvatarImgContainer>
      ) : (
        <AvatarContainer type="text" {...restProps}>
          {body}
          <CircleContainer size={size} variant={variant}>{children}</CircleContainer>
          {badge ? (
            <BadgeContainer variant={variant}>{badge}</BadgeContainer>
          ) : null}
        </AvatarContainer>
      )}
    </>
  );
};

export default Avatar;
