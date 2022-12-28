import styled from "styled-components";

export const LinkCardWrapper = styled.a`
  border: 1px solid black;
  display: inline-block;
  width: 262px;
  height: 131px;
  padding: 1em;
  background: #ffffff;
  border: 1px solid #989898;
  border-radius: 8px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  border: 1px solid #989898;


  &:hover {
    border: none;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  }
`;

export const LinkCardContent = styled.div``;

export const CardTitle = styled.span`
  font-weight: 500;
  font-size: 20px;
`;

export const CardBody = styled.p`
  font-weight: 400;
  font-size: 16px;
  margin-top: 1em;
  color: #333333;
`;
