import React from "react";
import {
  AccordionContainer,
  AccordionContent,
  AccordionItem,
  AccordionTitle,
  AccordionTitleContainer,
  AccordionWrapper,
  Body,
  Content,
  Header,
  Icon,
  Item,
  Title,
} from "./Accordion.style";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState, useContext, createContext } from "react";
import {IoIosArrowDown} from "react-icons/io"

const data = [
  {
    title: "Item 1",
    content:
      "An accordion is a lightweight container that may either be used standalone, or be connected to a larger surface, such as a card.",
  },
  {
    title: "Item 2",
    content:
      "An accordion is a lightweight container that may either be used standalone, or be connected to a larger surface, such as a card.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    title: "Item 3",
    content:
      "An accordion is a lightweight container that may either be used standalone, or be connected to a larger surface, such as a card.Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros, vitae egestas augue. Duis vel est augue.",
  },
];

const ToggleContext = createContext();

export default function Accordion({ children, ...restProps }) {
  const [activeIndex, setActiveIndex] = useState(0);

  console.log(children);
  //   const [selected, setSelected] = useState(null);

  //   const toggle = (i) => {
  //     if (selected === i) {
  //       return setSelected(null);
  //     }

  //     setSelected(i);
  //   };

  return (
    // <AccordionWrapper>
    //   <AccordionContainer>
    //     {data.map((item, i) => {
    //         console.log(i, item)
    //       return (
    //         <AccordionItem>
    //           <AccordionTitleContainer onClick={() => toggle(i)}>
    //             <AccordionTitle>{item.title}</AccordionTitle>
    //             {/* <Icon><RiArrowDownSLine/></Icon> */}
    //             {/* <Icon>{setSelected === i ? "-" : "+"}</Icon> */}
    //             <span>{setSelected === i ? "-" : "+"}</span>
    //           </AccordionTitleContainer>
    //           <AccordionContent>{item.content}</AccordionContent>
    //         </AccordionItem>
    //       );
    //     })}
    //   </AccordionContainer>
    // </AccordionWrapper>

    <>
      {children.map((child, index) => (
        <ToggleContext.Provider
          key={index}
          value={{ index, activeIndex, setActiveIndex }}
        >
          <AccordionContainer {...restProps}>{child}</AccordionContainer>
        </ToggleContext.Provider>
      ))}
    </>
  );
}

Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const {activeIndex, setActiveIndex, index} = useContext(ToggleContext);
  return <Item activeIndex={activeIndex} setActiveIndex={setActiveIndex} index={index}   {...restProps}>{children}</Item>;
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  const { activeIndex, setActiveIndex, index } = useContext(ToggleContext);

  return (
    <Header onClick={() => setActiveIndex(index)} {...restProps}>
      {children}
    </Header>
  );
};

Accordion.Icon = function AccordionIcon ({children, ...restProps}) {
  return <Icon {...restProps}>{children}</Icon>
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const {index, activeIndex} = useContext(ToggleContext)

  let isActive = index === activeIndex

  return isActive ? <Body {...restProps}>{children}</Body> : null;
};

Accordion.Content = function AccordionContent({ children, ...restProps }) {
  return <Content {...restProps}>{children}</Content>;
};
