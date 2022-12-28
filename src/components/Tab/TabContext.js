import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import {
  TabContainer,
  TabListContainer,
  TabPanelContainer,
  TabContextContainer,
} from "./TabContext.style.js";

const TabsContainerContext = createContext();

const TabContext = ({ value, position, children, onChange }) => {
  const data = { position, selectedTabValue: value, handleTabChange: onChange };
  return (
    <TabsContainerContext.Provider value={data}>
      <TabContextContainer position={position}>{children}</TabContextContainer>
    </TabsContainerContext.Provider>
  );
};

export const TabList = ({ children }) => {
  const { position } = useContext(TabsContainerContext);
  return <TabListContainer position={position}>{children}</TabListContainer>;
};

export const Tab = ({ value, children }) => {
  const { selectedTabValue, handleTabChange, position } =
    useContext(TabsContainerContext);
  return (
    <TabContainer
      selectedTabValue={selectedTabValue}
      position={position}
      value={value}
      onClick={(e) => handleTabChange(value)}
    >
      {children}
    </TabContainer>
  );
};

export const TabPanel = ({ value, children }) => {
  const { selectedTabValue } = useContext(TabsContainerContext);
  return (
    <TabPanelContainer selectedTabValue={selectedTabValue} value={value}>
      {children}
    </TabPanelContainer>
  );
};

export default TabContext;
