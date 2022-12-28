import styled from "styled-components";

export const FilterChipWrapper = styled.div`
  width: fit-content;
  background: #e0e0e0;
  border: 2px solid #333333;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 0.5em;
  /* padding: 4px 4px 4px 8px; */
  padding: 2px 8px;
`;

export const FilterLabel = styled.span`
  font-weight: 700;
  font-size: 12px;
  color: #333333;
`;

export const FilterIcon = styled.span`
  padding-top: 0.3em;
  cursor: pointer;
`;

export const FilterChipContainer = styled.div`
  border: 1px solid red;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 8px;
  background: #e0e0e0;
  border: 2px solid #333333;
  border-radius: 24px;
`;

export const Text = styled.span`
  color: #333;
  font-weight: 700;
  font-size: 14px;
`;
