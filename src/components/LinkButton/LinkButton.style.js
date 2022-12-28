import styled from "styled-components";

export const LinkButtonWrapper = styled.a`
  background: #1765dc;
  box-shadow: 0px 4px 8px rgba(23, 101, 220, 0.25);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  text-align: center;
  padding: 8px;
  color: white;
  cursor: pointer;
  display: inline-block;

  &:hover {
    background: linear-gradient(135deg, #1765dc 0%, #5196ff 100%);
    box-shadow: 0px 4px 8px rgba(23, 101, 220, 0.25);
  }
`;
