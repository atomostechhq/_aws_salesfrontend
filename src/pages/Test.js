import React from "react";
import Button from "../components/Button";
import { MdAdd } from "react-icons/md";
import { ButtonWrapper } from "../components/Button.style";
import styled from "styled-components";
import Alert from "../components/Alert/Alert";
import ButtonWithIcon from "../components/ButtonWithIcon/ButtonWithIcon";
import { AiOutlineCheck, AiOutlineDownload } from "react-icons/ai";
import DisplayCard from "../components/DisplayCard/DisplayCard";
import Chip from "../components/Chips/Chip";
import LinkButton from "../components/LinkButton/LinkButton";
import Radio, { RadioButton } from "../components/Radio/Radio";
import CheckBox from "../components/CheckBox/CheckBox";
import LinkCard from "../components/LinkCard/LinkCard";
import Dropdown from "../components/Dropdown/Dropdown";
import Tooltip from "../components/Tooltip/ToolTip";
import { TooltipTarget } from "../components/Tooltip/Tooltip.style";
import ToolTip from "../components/Tooltip/ToolTip";
import Link from "../components/Link/Link";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import { ModalContent } from "../components/Modal/Modal.style";
import Toggle from "../components/Toggle/Toggle";
import Search from "../components/Search/Search";
import Avatar from "../components/Avatar/Avatar";
import TabContext, {
  Tab,
  TabList,
  TabPanel,
} from "../components/Tab/TabContext";
import Navlink from "../components/Navlink/Navlink";
import { NavLink } from "react-router-dom";
import Table, {
  TableActionPopUp,
  TableBody,
  TableHead,
  TableRow,
  TableWithPagination,
  Td,
  Th,
} from "../components/Table/Table";
import TablePagination from "../components/Table/TablePagination";
// import styles from "../../src/test.module.css";
import FileUpload from "../components/FileUpload/FileUpload";
import Accordion from "../components/Accordion/Accordion";
import FilterChip from "../components/FilterChips/FilterChip";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import TextField from "../components/TextField/TextField";

const data = [
  {
    id: 33333333,
    name: "India project",
    startDate: "June 05 2022",
    status: "approved",
    studyType: "adhoc",
    surveyType: "information tech",
    sampleRequired: 30,
  },
  {
    id: 334,
    name: "India project",
    startDate: "June 05 2022",
    status: "unseen",
    studyType: "adhoc",
    surveyType: "information tech",
    sampleRequired: 30,
  },
  {
    id: 335,
    name: "India project",
    startDate: "June 05 2022",
    status: "seen",
    studyType: "adhoc",
    surveyType: "information tech",
    sampleRequired: 30,
  },
  {
    id: 336,
    name: "India project",
    startDate: "June 05 2022",
    status: "seen",
    studyType: "adhoc",
    surveyType: "information tech",
    sampleRequired: 30,
  },
  {
    id: 337,
    name: "India project",
    startDate: "June 05 2022",
    status: "seen",
    studyType: "adhoc",
    surveyType: "information tech",
    sampleRequired: 30,
  },
  {
    id: 338,
    name: "India project",
    startDate: "June 05 2022",
    status: "seen",
    studyType: "adhoc",
    surveyType: "information tech",
    sampleRequired: 30,
  },
  {
    id: 339,
    name: "India project",
    startDate: "June 05 2022",
    status: "seen",
    studyType: "adhoc",
    surveyType: "information tech",
    sampleRequired: 30,
  },
  {
    id: 340,
    name: "India project",
    startDate: "June 05 2022",
    status: "seen",
    studyType: "adhoc",
    surveyType: "information tech",
    sampleRequired: 30,
  },
];

const statusColors = {
  unseen: "error",
  seen: "primary",
  approved: "success",
};

const Test = () => {
  const [tabActive, setTabActive] = useState(2);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };
  return (
    <>
      <div className="test">
        <h1>test</h1>
        <br />
        <Button className="sagar" onClick={(e) => {}} variant="filled">
          Filled
        </Button>
        <br />
        <br />
        <Button variant="filled">Show Snackbar</Button>
        <br />
        <br />
        <Button
          onClick={(e) => console.log("its working", e)}
          variant="outlined"
          customWidth="200px"
        >
          Outlined Button
        </Button>
        <br />
        <br />
        <Button
          onClick={(e) => console.log("its working", e)}
          variant="filled"
          disabled
        >
          Filled
        </Button>
        <br />
        <br />
        <Button
          onClick={(e) => console.log("its working", e)}
          variant="outlined"
          customWidth="200px"
          disabled
        >
          Outlined Button
        </Button>
        <br />
        <br />
        <Button variant="alternate">Alternate</Button>
        <br />
        <br />
        <div>
          <Alert variant="success" message="This is a success alert" />
          <br />
          <Alert
            variant="error"
            message="Global variables can be accessed/used through the entire document, while local variables can be used only inside the selector where it is declared."
          />
          <br />
          <Alert
            variant="warning"
            message="This is a warning alert — check it out!"
          />
          <br />
          <Alert
            variant="alternative"
            message="This is a alternate alert — check it out!"
          />
        </div>
        <br />
        <br />
        <div>
          <ButtonWithIcon variant="filledIcon">
            {<AiOutlineCheck />}Filled Icon Button
          </ButtonWithIcon>
          <br />
          <ButtonWithIcon variant="outlinedIcon">
            {<AiOutlineCheck />}Outlined Icon
          </ButtonWithIcon>
          <br />
          <ButtonWithIcon variant="alternateIcon">
            {<AiOutlineCheck />}Alternative Icon
          </ButtonWithIcon>
        </div>

        <br />
        <br />
        <div className="flex">
          <DisplayCard
            customWidth="300px"
            cardHeader="Card Header1"
            cardBody="Card Body"
          ></DisplayCard>
        </div>
        <br />
        <br />

        <Chip variant="filled" color="primary">
          Primary
        </Chip>

        <Chip variant="outlined" color="primary">
          POutlined
        </Chip>
        <Chip variant="filled" color="success">
          Success
        </Chip>
        <Chip variant="outlined" color="success">
          SOutlined
        </Chip>
        <Chip variant="filled" color="warning">
          Warning
        </Chip>
        <Chip variant="outlined" color="warning">
          WOutlined
        </Chip>
        <Chip variant="filled" color="error">
          Error
        </Chip>
        <Chip variant="outlined" color="error">
          EOutlined
        </Chip>
        <br />
        <br />
        <LinkButton href="https://scalablecss.com/styled-components-global-styles/">
          <AiOutlineDownload />
        </LinkButton>
        <br />
        <br />
        <Radio></Radio>
        <Radio disabled></Radio>
        <br />
        <CheckBox disabled></CheckBox>
        <CheckBox></CheckBox>

        <br />
        <br />
        <LinkCard
          href="https://scalablecss.com/styled-components-global-styles/"
          cardTitle="RFQs Support"
          cardBody="Issues/doubts regarding RFQs can be found here"
        />
        <br />
        <br />
        <Dropdown />
        <br />
        <br />
        <ToolTip content="tooltip message" position="right">
          <TooltipTarget>I am a target</TooltipTarget>
        </ToolTip>

        <div>
          <ToolTip content="I am a p tag within a tooltip">
            <p>I am a paragraph tag within a tooltip</p>
          </ToolTip>
        </div>
        <div>
          <Link
            color="black"
            border="underline"
            href="https://scalablecss.com/styled-components-global-styles/"
          >
            underlined link
          </Link>
          <br />
          <Link
            disabled
            onClick={() => console.log("link")}
            color="red"
            border="none"
            href="https://scalablecss.com/styled-components-global-styles/"
          >
            I am a link
          </Link>
        </div>
        {/* <button onClick={openModal}>Open Modal</button> */}
        <Button variant="filled" onClick={openModal}>
          Open Modal
        </Button>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <ModalContent>
            <p>Write your modal content here!</p>
            {/* <p>
            Include popular icons in your React projects easily with
            react-icons, which utilizes ES6 imports that allows you to include
            only the icons that your project is using.
          </p> */}
            <Button variant="outlined">Button</Button>
          </ModalContent>
        </Modal>
        <div className="toggle">
          <Toggle />
        </div>
        <div>
          <Search />
        </div>
        <div className="avatar">
          <Avatar
            // className={styles.avatartest}
            size="sm"
            type="text"
            variant="success"
            badge="wfh"
          >
            KS
          </Avatar>
          <Avatar size="md" type="text" variant="error" badge="wfh">
            KS
          </Avatar>
          <Avatar size="lg" type="text" variant="warning" badge="wfh">
            KS
          </Avatar>
          <Avatar type="text" variant="primary">
            KS
          </Avatar>
          <Avatar
            type="img"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            variant="success"
            badge="wfh"
            size="sm"
          />
          <Avatar
            type="img"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            variant="error"
            badge="wfh"
          />
          <Avatar
            type="img"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            variant="warning"
            badge="wfh"
          />
          <Avatar
            type="img"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            variant="primary"
            badge="wfh"
          />
        </div>

        {/* tabs */}
        <div>
          <TabContext
            onChange={(value) => setTabActive(value)}
            value={tabActive}
            position="horizontal"
          >
            <TabList>
              <Tab value={1}>Item One</Tab>

              <Tab value={2}>Item Two</Tab>
              <Tab value={3}>Item Three</Tab>
            </TabList>
            <TabPanel value={1}>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
                quis, exercitationem officiis magni sapiente dignissimos
                voluptate provident omnis ullam esse.
              </p>
              <input type="text" />
            </TabPanel>
            <TabPanel value={2}>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
                quis, exercitationem officiis magni sapiente dignissimos
                voluptate provident omnis ullam esse.
              </p>
              <input type="text" />
            </TabPanel>
            <TabPanel value={3}>
              <input type="text" />
            </TabPanel>
          </TabContext>
        </div>

        {/* navlinks */}
        <div>
          {/* <NavLink to="/" >testing </NavLink> */}
          <Navlink to="/">Test</Navlink>
          <Navlink to="/dashboard">Dashboard</Navlink>
          <Navlink to="/home">Home</Navlink>
        </div>
        {/* table */}
        <div className="tableTest">
          <TableActionPopUp selectedRows={selectedRows}>
            {/* <button onClick={(e) => console.log(e)}>Edit</button> */}
          </TableActionPopUp>
          <TableWithPagination>
            <Table>
              <TableHead>
                <TableRow>
                  <Th>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(data);
                        } else setSelectedRows([]);
                      }}
                    />
                  </Th>
                  <Th>ID</Th>
                  <Th>Project Name</Th>
                  <Th>Start date</Th>
                  <Th>Status</Th>
                  <Th>Study type</Th>
                  <Th>Survey type</Th>
                  <Th>Sample required</Th>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ?.slice(
                    pageNumber * rowsPerPage - rowsPerPage,
                    pageNumber * rowsPerPage
                  )
                  .map((d, i) => {
                    return (
                      <TableRow key={i}>
                        <Td>
                          <input
                            type="checkbox"
                            checked={
                              selectedRows.filter((r) => r.id === d.id)[0]
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedRows((prev) => [...prev, d]);
                              } else
                                setSelectedRows((prev) => {
                                  return prev.filter((pd) => {
                                    return pd.id !== d.id;
                                  });
                                });
                            }}
                          />
                        </Td>
                        <Link
                          href="https://mui.com/material-ui/react-accordion/"
                          color="black"
                          border="underline"
                        >
                          {" "}
                          <Td>{d.id}</Td>
                        </Link>
                        {/* <Link
                          color="black"
                          border="underline"
                          href="https://scalablecss.com/styled-components-global-styles/"
                        >
                          underlined link
                        </Link>
                        <br />
                        <Link
                          disabled
                          onClick={() => console.log("link")}
                          color="red"
                          border="none"
                          href="https://scalablecss.com/styled-components-global-styles/"
                        >
                          I am a link
                        </Link> */}

                        <Td>{d.name}</Td>
                        <Td>{d.startDate}</Td>
                        <Td>
                          {" "}
                          <Chip
                            variant="filled"
                            color={statusColors[d.status.toLowerCase()]}
                          >
                            {d.status}
                          </Chip>{" "}
                        </Td>
                        {/* <Td>{d.status}</Td> */}
                        <Td>{d.studyType}</Td>
                        <Td>{d.surveyType}</Td>
                        <Td>{d.sampleRequired}</Td>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalDataCnt={data.length}
            />
          </TableWithPagination>
        </div>

        {/* upload */}
        {/* <FileUpload>Upload</FileUpload> */}

        {/* accordion */}
        {/* <Accordion /> */}

        <div>
          {/* <FilterChip>
            <FilterChip.FilterLabel>something</FilterChip.FilterLabel>
          </FilterChip> */}
          <FilterChip>
            <FilterChip.Text>something</FilterChip.Text>
            <FilterChip.FilterIcon>
              <AiOutlineCloseCircle size={20} />
            </FilterChip.FilterIcon>
          </FilterChip>
          <br />
          {/* <FilterChip filterlabel="departments" /> */}
        </div>

        <TextField type="text" disabled />
      </div>
    </>
  );
};

export default Test;
