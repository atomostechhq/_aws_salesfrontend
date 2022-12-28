import PropTypes from "prop-types";
import { BtnIcon, ButtonWithIconWrapper } from "./ButtonWithIcon.style";

const ButtonWithIcon = ({ variant, children, btnIcon, ...restProps }) => {
  return (
    <ButtonWithIconWrapper variant={variant} {...restProps}>
      {/* <BtnIcon>{btnIcon}</BtnIcon> */}
      <BtnIcon className="btnIcon"> {btnIcon} </BtnIcon>
      {children}
    </ButtonWithIconWrapper>
  );
};

ButtonWithIcon.propTypes = {
  variant: null,
  children: null,
  btnIcon: null,
  onClick: PropTypes.func,
};

ButtonWithIcon.defaultProps = {
  variant: null,
  children: null,
  btnIcon: null,
};

export default ButtonWithIcon;
