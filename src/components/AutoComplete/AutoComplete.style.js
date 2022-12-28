import styled from "styled-components";

export const Box = styled.div`
  ul {
    margin-top: 3px;
    width: 23rem;
    background: #ffffff;
    /* border: 1px solid #333333; */
    border-radius: 4px;
    position: absolute;
    z-index: 1000;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

    li {
      list-style-type: none;
      padding: 10px;
      cursor: pointer;
      font-size: 12px;
    }

    li:hover {
      background-color: aliceblue;
    }

    p {
      padding: 15px 1em;
      cursor: pointer;
      font-size: 12px;
    }
  }
`;
