import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 299px;
`;

export const SearchBox = styled.input`
  width: 299px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid transparent;
  outline: none;
  box-shadow: 0 0 8px #e0e0e0 inset;
  padding: 0 1rem;
  cursor: pointer;
  border: 1px solid #e0e0e0;

  &:hover {
    border: 1px solid #1765dc;
  }

  &:focus {
    border: 2px solid #1765dc;
  }

  /* &:focus, & + div{
        background-color: #000;
    } */
`;

export const SearchIcon = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 39px;
  height: 40px;
  border-radius: 8px;
  left: 87%;
  top: 0.1%;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
  padding-left: 0.2rem;
  background-color: #1765dc;
  border: none;
  cursor: pointer;
`;
