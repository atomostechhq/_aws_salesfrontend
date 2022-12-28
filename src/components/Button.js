import React from "react";
import PropTypes, { bool } from "prop-types";
import { ButtonWrapper } from "./Button.style";

// const Button = ({ label, backgroundColor = "red", size = "lg", onClick, border }) => {
//   let scale = 1;
//   if (size === "sm") scale = 0.75;
//   if (size === "lg") scale = 1.5;

//   const style = {
//     backgroundColor,
//     padding: `${scale * 0.5}rem ${scale * 1}rem`,
//     border,
//   };

//   return (
//     <button style={style} onClick={onClick}>
//       {label}
//     </button>
//   );
// };

// const ButtonType = 'default' || 'primary';

// const Button = ({ButtonType, className }) => {
//   return (
//     <button type={ButtonType} className={styles}>gdhgasd</button>
//   )
// }

const Button = ({
  variant,
  children,
  disabled,
  // btnIcon,
  onClick,
  customWidth,
  customHeight,
  customBorder,
  customTextColor,
  customElevated,
  ...restProps
}) => {
  // console.log(disabled)
  return (
    <ButtonWrapper
      variant={variant}
      customHeight={customHeight}
      customWidth={customWidth}
      customBorder={customBorder}
      customElevated={customElevated}
      customTextColor={customTextColor}
      disabled={disabled}
      onClick={(e) => onClick(e)}
      {...restProps}
    >
      {/* <BtnIcon className="btnIcon"> {btnIcon} </BtnIcon> */}
      {children}
    </ButtonWrapper>
  );
};

Button.propTypes = {
  // label: PropTypes.string,
  // backgroundColor: PropTypes.string,
  // size: PropTypes.oneOf(["sm", "md", "lg"]),
  // border: PropTypes.string,
  // onClick: PropTypes.func,
  variant: null,
  children: null,
  btnIcon: null,
  customWidth: null,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: null,
  children: null,
  btnIcon: null,
};

export default Button;
