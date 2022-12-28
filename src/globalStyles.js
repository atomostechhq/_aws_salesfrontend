import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap");

    * {
        margin: 0;
        padding: 0;
        font-family: "Lato", sans-serif;
        box-sizing: border-box;
    }
    :root {
        --alertError: #da1e28;
        --alertSuccess: #198038;
        --alertWarning: #f1c21b;
        --alertAlternative: #1765dc;
    }
`;

export default GlobalStyle;
