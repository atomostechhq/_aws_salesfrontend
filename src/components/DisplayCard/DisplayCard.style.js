import styled from "styled-components";

export const DisplayCardWrapper = styled.div`
  /* background-color: thistle; */
  /* padding: 16px 128px 16px 16px; */
  padding: 16px;
  /* width: 234px; */
  width: ${(props) => (props.customWidth ? props.customWidth : "234px")};
  height: 104px;
  background: linear-gradient(281.17deg, #ffffff 0%, #e2edfc 100%);
  border-radius: 24px;
  color: #1765dc;
`;

export const CardHeader = styled.h3`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 24px;
`;

export const CardBody = styled.h1`
  font-weight: 900;
  font-size: 24px;
`;
