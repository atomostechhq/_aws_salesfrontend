import styled from "styled-components";
import { RiArrowDownSLine } from "react-icons/ri";

export const AccordionWrapper = styled.div``;

export const AccordionContainer = styled.div`
  /* width: 500px; */
  margin: 0 auto;
  /* cursor: pointer; */
  margin: 1em 0;
`;

export const Item = styled.div`
  padding: 1em;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 16px;
  width: 100%;
`;

export const Icon = styled.span``;

export const Body = styled.div`
  padding: 1em 0;
  border-top: 1px solid #ccc;
`;

export const Content = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;
