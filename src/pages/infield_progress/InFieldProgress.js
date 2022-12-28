import React, { useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import Accordion from "../../components/Accordion/Accordion";
import Button from "../../components/Button";
import Header from "../../customComponents/header/Header";
import styles from "./InFieldProgress.module.css";
import { IoIosArrowDown } from "react-icons/io";
import FilterChip from "../../components/FilterChips/FilterChip";
import { AiFillInfoCircle } from "react-icons/ai";
import Modal from "../../components/Modal/Modal";
import { ModalContent } from "../../components/Modal/Modal.style";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";
import { Label } from "../../components/TextField/TextField.style";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import Chip from "../../components/Chips/Chip";
import { BiCaretDown } from "react-icons/bi";

const collapseData = [
  {
    countries: [
      {
        id: 111,
        level: "Gold",
        countryName: "japan",
        allocation: 328,
        avgCpi: 13,
        totalBudget: 900,
        allocationStatus: "Approved",
        tg: [
          {
            level: "Silver",
            targetGroupName: "tg1",
          },
          {
            level: "Silver",
            targetGroupName: "tg2",
          },
        ],
      },
      {
        id: 222,
        level: "Gold",
        countryName: "usa",
        tg: [
          {
            level: "Silver",
            targetGroupName: "tg3",
          },
          {
            level: "Silver",
            targetGroupName: "tg1",
          },
        ],
      },
      {
        id: 333,
        level: "Gold",
        countryName: "india",
      },
    ],
  },
];

const autocompleteData = [
  { label: "1", value: "one" },
  { label: "22", value: "two" },
  { label: "33", value: "three" },
  { label: "43", value: "four" },
  { label: "52", value: "five" },
  { label: "63", value: "six" },
];

const accData = [
  {
    id: 101,
    country: "India",
    surveyNo: "SN # 1000521",
    bidIr: "75%",
    bidLoi: "70%",
    bidCpi: "10%",
    finalCpi: "20%",
    filedIR: "76%",
    fieldLoi: "30%",
    completes: "100%",
    terminates: "40%",
    quotaful: "full",
    drops: "20%",

    surveyTable: [
      {
        supplierID: 10000,
        cpi: 100,
        attempts: 100,
        completes: 100,
        terminates: 100,
        quotaful: 20,
        status: 100,
      },
      {
        supplierID: 10000,
        cpi: 100,
        attempts: 100,
        completes: 100,
        terminates: 100,
        quotaful: 20,
        status: 100,
      },
      {
        supplierID: 10000,
        cpi: 100,
        attempts: 100,
        completes: 100,
        terminates: 100,
        quotaful: 20,
        status: 100,
      },
    ],
  },
  {
    id: 102,
    country: "India",
    surveyNo: "SN # 1000521",
    bidIr: "75%",
    bidLoi: "70%",
    bidCpi: "10%",
    finalCpi: "20%",
    filedIR: "76%",
    fieldLoi: "30%",
    completes: "100%",
    terminates: "40%",
    quotaful: "full",
    drops: "20%",

    surveyTable: [
      {
        supplierID: 10000,
        cpi: 100,
        attempts: 100,
        completes: 100,
        terminates: 100,
        quotaful: 20,
        status: 100,
      },
      {
        supplierID: 10000,
        cpi: 100,
        attempts: 100,
        completes: 100,
        terminates: 100,
        quotaful: 20,
        status: 100,
      },
      {
        supplierID: 10000,
        cpi: 100,
        attempts: 100,
        completes: 100,
        terminates: 100,
        quotaful: 20,
        status: 100,
      },
    ],
  },
];

const targetAudienceData = [
  {
    targetAudience: "Target Audience 1",
    surveyNum: "SN # 1000521",
  },
  {
    targetAudience: "Target Audience 2",
    surveyNum: "SN # 1000521",
  },
  {
    targetAudience: "Target Audience 3",
    surveyNum: "SN # 1000521",
  },
  {
    targetAudience: "Target Audience 4",
    surveyNum: "SN # 1000521",
  },
  {
    targetAudience: "Target Audience 5",
    surveyNum: "SN # 1000521",
  },
];

// const accData = [
//   {
//     headerone: "headerone",
//     headertwo: "headertwo",
//     headerthree: "headerthree",
//     dataone: "dataone",

//     content: "content",
//   },
//   {
//     headertwo: "headertwo",
//     headerthree: "headerthree",
//     dataone: "dataone",

//     content:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt quis, exercitationem officiis magni sapiente dignissimos voluptate provident omnis ullam esse.",
//   },
//   {
//     headerone: "headerone",
//     headertwo: "headertwo",
//     headerthree: "headerthree",
//     dataone: "dataone",

//     content: "content",
//   },
//   {
//     headerone: "headerone",
//     headertwo: "headertwo",
//     headerthree: "headerthree",
//     dataone: "dataone",

//     content: "content",
//   },
// ];

const surveyTableDetails = [
  {
    detailHeader: "India",
    detailBody: "SN #10000521",
  },
];

const InFieldProgress = () => {
  const { id } = useParams();

  const [showTg, setShowTg] = useState(false);

  const showTgOnClick = () => {
    setShowTg((prev) => !prev);
    console.log(showTgOnClick);
  };

  const [open, setOpen] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
    console.log(openModal);
  };

  const [showTransferModal, setShowTransferModal] = useState(false);

  const openTransferModal = () => {
    setShowTransferModal((prev) => !prev);
    console.log(showTransferModal);
  };

  const handleCompleteChange = (e) => {
    console.log(e);
  };

  // const showTgOnClick = () => setShowTg(true);

  return (
    <>
      <Header />
      <div className={styles.infiled_progress_container}>
        <section className={styles.project_order_nav}>
          <nav>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.projOrderLink
              }
              to={`/sales-order/overview/${id}`}
            >
              Overview
            </NavLink>
            <NavLink
              to={`/sales-order/infield-progress/${id}`}
              className={({ isActive }) =>
                isActive ? styles.active : styles.projOrderLink
              }
            >
              In-Field Progress
            </NavLink>
          </nav>
        </section>
        <div className={styles.project_container}>
          <section className={styles.left_project_container}>
            <div>
              <h1>Project Name</h1>
              <span>Client Name</span>
            </div>
            <div>
              <button className={styles.edit}>Edit</button>
            </div>
            <div className={styles.projNum}>[PN #1000231]</div>
          </section>
          <section className={styles.right_project_container}>
            <select name="" id="">
              <option value="in-progress">In-Progress</option>
              <option value="won" onClick={openModal}>
                Won
              </option>
              <option value="lost">Lost</option>
              <option value="live">Live</option>
              <option value="closed">Closed</option>
              <option value="archived">Archived</option>
            </select>
            <Link to="/quotation">
              <Button variant="filled">View Quotation</Button>
            </Link>
          </section>
        </div>

        <div className={styles.in_filed_progress_container}>
          <h1 className={styles.infield_text}>
            In-Field Progress(Project Number - PN#1000231)
          </h1>
          <div className={styles.accordionBox}>
            <Accordion>
              {accData?.map((item, index) => (
                <>
                  <div className={styles.accordion_box}>
                    <Accordion.Item key={index}>
                      <Accordion.Header>
                        <Accordion.Title>
                          <div className={styles.flex}>
                            <section className={styles.country_survey}>
                              <p>{item?.country}</p>
                              <p className={styles.surveyNo}>
                                {item?.surveyNo}
                              </p>
                            </section>
                            <section>
                              <p>BID IR</p>
                              <span>{item?.bidIr}</span>
                            </section>
                            <section>
                              <p>BID LOI</p>
                              <span>{item?.bidLoi}</span>
                            </section>
                            <section>
                              <p>BID CPI</p>
                              <span>{item?.bidCpi}</span>
                            </section>
                            <section>
                              <p>Final CPI</p>
                              <span>{item?.finalCpi}</span>
                            </section>
                            <section>
                              <p>Field IR</p>
                              <span>{item?.filedIR}</span>
                            </section>
                            <section>
                              <p>Field LOI</p>
                              <span>{item?.fieldLoi}</span>
                            </section>
                            <section>
                              <p>Completes</p>
                              <span>{item?.completes}</span>
                            </section>
                            <section>
                              <p>Terminates</p>
                              <span>{item?.terminates}</span>
                            </section>
                            <section>
                              <p>Quotaful</p>
                              <span>{item?.quotaful}</span>
                            </section>
                            <section>
                              <p>Drops</p>
                              <span>{item?.drops}</span>
                            </section>
                          </div>
                          {/* <div className={styles.target_audience}>
                            {targetAudienceData.map((data) => (
                              <section>
                                <h3>{data.targetAudience}</h3>
                                <span>{data.surveyNum}</span>
                              </section>
                            ))}
                          </div> */}

                          {/* <div className={styles.survey_table_details}>
                        {surveyTableDetails.map((details) => (
                          <section>
                            <p>{details.detailHeader}</p>
                            <p>{details.detailBody}</p>
                          </section>
                        ))}
                      </div> */}

                          {/* <table>
                      <tr>
                        <th>{item.headerone}</th>
                        <th>{item.headertwo}</th>
                        <th>{item.headerthree}</th>
                      </tr>
                      <tr>
                        <td>{item.dataone}</td>
                        <td>{item.datatwo}</td>
                        <td>{item.datathree}</td>
                      </tr>
                    </table> */}
                        </Accordion.Title>
                        <Accordion.Icon>
                          <IoIosArrowDown />
                        </Accordion.Icon>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Accordion.Content>
                          {accData.map((data) => {
                            return (
                              <>
                                <div className={styles.accordionBody}>
                                  <div className={styles.flex}>
                                    <section
                                      className={styles.tg_country_survey}
                                    >
                                      <p className={styles.tg}>GenPop M 18+</p>
                                      <p
                                        className={styles.showTg}
                                        onClick={() => showTgOnClick()}
                                      >
                                        <FilterChip>
                                          <FilterChip.Text>
                                            TG 1
                                          </FilterChip.Text>
                                          <FilterChip.FilterIcon>
                                            <AiFillInfoCircle />
                                          </FilterChip.FilterIcon>
                                        </FilterChip>
                                        {showTg ? (
                                          <div className={styles.tgModal}>
                                            {/* <span
                                              onClick={() =>
                                                setShowTg((prev) => !prev)
                                              }
                                            >
                                              close
                                            </span> */}
                                            <span>Target Description</span>
                                            <p>
                                              Trader, Wealth Manager, Asset
                                              Manager/ Mutual fund Manager,
                                              Hedge fund manager or Investment
                                              Banker
                                            </p>
                                          </div>
                                        ) : null}
                                      </p>
                                      <p className={styles.surveyNo}>
                                        {item?.surveyNo}
                                      </p>
                                    </section>
                                    <section>
                                      <p>BID IR</p>
                                      <span>{item?.bidIr}</span>
                                    </section>
                                    <section>
                                      <p>BID LOI</p>
                                      <span>{item?.bidLoi}</span>
                                    </section>
                                    <section>
                                      <p>BID CPI</p>
                                      <span>{item?.bidCpi}</span>
                                    </section>
                                    <section>
                                      <p>Final CPI</p>
                                      <span>{item?.finalCpi}</span>
                                    </section>
                                    <section>
                                      <p>Field IR</p>
                                      <span>{item?.filedIR}</span>
                                    </section>
                                    <section>
                                      <p>Field LOI</p>
                                      <span>{item?.fieldLoi}</span>
                                    </section>
                                    <section>
                                      <p>Completes</p>
                                      <span>{item?.completes}</span>
                                    </section>
                                    <section>
                                      <p>Terminates</p>
                                      <span>{item?.terminates}</span>
                                    </section>
                                    <section>
                                      <p>Quotaful</p>
                                      <span>{item?.quotaful}</span>
                                    </section>
                                    <section>
                                      <p>Drops</p>
                                      <span>{item?.drops}</span>
                                    </section>
                                  </div>
                                  <table className={styles.supplier_table}>
                                    <thead>
                                      <tr>
                                        <th>Supplier ID</th>
                                        <th>CPI</th>
                                        <th>Attempts</th>
                                        <th>Completes</th>
                                        <th>Terminates</th>
                                        <th>Quotafull</th>
                                        <th>Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item?.surveyTable?.map((tableData) => (
                                        <tr>
                                          <td>{tableData.supplierID}</td>
                                          <td>{tableData.cpi}</td>
                                          <td>{tableData.attempts}</td>
                                          <td>{tableData.completes}</td>
                                          <td>{tableData.terminates}</td>
                                          <td>{tableData.quotaful}</td>
                                          <td>{tableData.status}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot></tfoot>
                                  </table>
                                </div>
                              </>
                            );
                          })}
                        </Accordion.Content>
                        <section className={styles.notes}>
                          <h2>Notes from PM</h2>
                          <p>
                            The following survey table is just for display and
                            does not reflect any actual amount
                          </p>
                        </section>
                      </Accordion.Body>
                    </Accordion.Item>
                  </div>
                </>
              ))}
            </Accordion>
          </div>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <ModalContent>
            <div className={styles.approve_supplier}>
              <h2>Approve Supplier</h2>
              <div className={styles.approve_supplier_container}>
                <div className={styles.approveSupplier_collapse_table}>
                  <table>
                    <thead>
                      <tr>
                        <th>Country {">"} Target audience</th>
                        <th>IR</th>
                        <th>Feasibility</th>
                        <th>Timeline</th>
                        <th>CPI</th>
                        <th>Total Budget</th>
                        <th>Actions</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {collapseData?.map((data) => {
                        let suppId = data?.id;
                        return (
                          <>
                            <tr>
                              <td
                                onClick={() => {
                                  if (!open.includes(suppId)) {
                                    setOpen((prevArr) => [...prevArr, suppId]);
                                  } else {
                                    setOpen((prevArr) => {
                                      return prevArr.filter(
                                        (id) => id !== suppId
                                      );
                                    });
                                  }
                                }}
                              >
                                <div className={styles.flex}>
                                  <span className={styles.icon}>
                                    <BiCaretDown />
                                  </span>
                                  <span>
                                    {" "}
                                    {data?.supplierName} (ID{data.supplierNum})
                                  </span>
                                </div>
                              </td>
                              <td>1455</td>
                              <td>20</td>
                              <td>900</td>
                              <td>200</td>
                              <td>$3000</td>
                              <td>
                                <span>
                                  {" "}
                                  <RiCheckboxCircleFill
                                    size={20}
                                    color="#198038"
                                  />
                                </span>
                                <span>
                                  {" "}
                                  <RiCloseCircleFill
                                    size={20}
                                    color="#DA1E28"
                                  />
                                </span>
                              </td>
                              <td>
                                <Chip variant="filled" color="success">
                                  Approved
                                </Chip>
                              </td>
                            </tr>

                            {open.includes(suppId) && (
                              <>
                                {data?.countries?.map((country) => {
                                  let countryId = country?.id;
                                  if (!open.includes(countryId)) {
                                    return (
                                      <tr>
                                        <td
                                          style={{ paddingLeft: "2em" }}
                                          onClick={() =>
                                            setOpen((prevArr) => [
                                              ...prevArr,
                                              countryId,
                                            ])
                                          }
                                        >
                                          <div className={styles.flex}>
                                            <span className={styles.icon}>
                                              <BiCaretDown />
                                            </span>
                                            <span>{country?.countryName}</span>
                                          </div>
                                        </td>
                                        <td>1455</td>
                                        <td>20</td>
                                        <td>900</td>
                                        <td>200</td>
                                        <td>$3000</td>

                                        <td>
                                          <span>
                                            {" "}
                                            <RiCheckboxCircleFill
                                              size={20}
                                              color="#198038"
                                            />
                                          </span>
                                          <span>
                                            {" "}
                                            <RiCloseCircleFill
                                              size={20}
                                              color="#DA1E28"
                                            />
                                          </span>
                                        </td>
                                        <td>
                                          <Chip
                                            variant="filled"
                                            color="success"
                                          >
                                            Approved
                                          </Chip>
                                        </td>
                                      </tr>
                                    );
                                  } else {
                                    return (
                                      <>
                                        <tr>
                                          <td
                                            style={{ paddingLeft: "2em" }}
                                            onClick={() =>
                                              setOpen((prevArr) => {
                                                return prevArr.filter(
                                                  (id) => id != countryId
                                                );
                                              })
                                            }
                                          >
                                            <div className={styles.flex}>
                                              <span className={styles.icon}>
                                                <BiCaretDown />
                                              </span>
                                              <span>
                                                {country?.countryName}
                                              </span>
                                            </div>
                                          </td>
                                          <td>1455</td>
                                          <td>20</td>
                                          <td>900</td>
                                          <td>200</td>
                                          <td>$3000</td>

                                          <td>
                                            <span>
                                              {" "}
                                              <RiCheckboxCircleFill
                                                size={20}
                                                color="#198038"
                                              />
                                            </span>
                                            <span>
                                              {" "}
                                              <RiCloseCircleFill
                                                size={20}
                                                color="#DA1E28"
                                              />
                                            </span>
                                          </td>
                                          <td>
                                            <Chip
                                              variant="filled"
                                              color="success"
                                            >
                                              Approved
                                            </Chip>
                                          </td>
                                        </tr>
                                        {country?.tg?.map((target) => {
                                          return (
                                            <tr>
                                              <td
                                                style={{ paddingLeft: "4em" }}
                                              >
                                                <ul>
                                                  <li>
                                                    {target?.targetGroupName}
                                                  </li>
                                                </ul>
                                              </td>
                                              <td>1455</td>
                                              <td>20</td>
                                              <td>900</td>
                                              <td>200</td>
                                              <td>
                                                <span>
                                                  {" "}
                                                  <RiCheckboxCircleFill
                                                    size={20}
                                                    color="#198038"
                                                  />
                                                </span>
                                                <span>
                                                  {" "}
                                                  <RiCloseCircleFill
                                                    size={20}
                                                    color="#DA1E28"
                                                  />
                                                </span>
                                              </td>
                                              <td>
                                                <Chip
                                                  variant="filled"
                                                  color="success"
                                                >
                                                  Approved
                                                </Chip>
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </>
                                    );
                                  }
                                })}
                              </>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <section className={styles.proceed}>
                <Button onClick={openTransferModal} variant="filled">
                  Proceed
                </Button>
              </section>
            </div>
          </ModalContent>
        </Modal>

        <Modal
          showModal={showTransferModal}
          setShowModal={setShowTransferModal}
        >
          <ModalContent>
            <div className={styles.approve_supplier}>
              <h2>Transfer to Blaze</h2>
              <div className={styles.approve_supplier_container}>
                <div className={styles.approveSupplier_collapse_table}>
                  <table>
                    <thead>
                      <tr>
                        <th>Country {">"} Target audience</th>
                        <th>IR</th>
                        <th>Feasibility</th>
                        <th>Timeline</th>
                        <th>CPI</th>
                        <th>Total Budget</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {collapseData?.map((data) => {
                        let suppId = data?.id;
                        return (
                          <>
                            <tr>
                              <td
                                onClick={() => {
                                  if (!open.includes(suppId)) {
                                    setOpen((prevArr) => [...prevArr, suppId]);
                                  } else {
                                    setOpen((prevArr) => {
                                      return prevArr.filter(
                                        (id) => id !== suppId
                                      );
                                    });
                                  }
                                }}
                              >
                                <div className={styles.flex}>
                                  <span className={styles.icon}>
                                    <BiCaretDown />
                                  </span>
                                  <span>
                                    {" "}
                                    {data?.supplierName} (ID{data.supplierNum})
                                  </span>
                                </div>
                              </td>
                              <td>1455</td>
                              <td>20</td>
                              <td>900</td>
                              <td>200</td>
                              <td>$3000</td>
                              <td>
                                <Chip variant="filled" color="success">
                                  Approved
                                </Chip>
                              </td>
                            </tr>

                            {open.includes(suppId) && (
                              <>
                                {data?.countries?.map((country) => {
                                  let countryId = country?.id;
                                  if (!open.includes(countryId)) {
                                    return (
                                      <tr>
                                        <td
                                          style={{ paddingLeft: "2em" }}
                                          onClick={() =>
                                            setOpen((prevArr) => [
                                              ...prevArr,
                                              countryId,
                                            ])
                                          }
                                        >
                                          <div className={styles.flex}>
                                            <span className={styles.icon}>
                                              <BiCaretDown />
                                            </span>
                                            <span>{country?.countryName}</span>
                                          </div>
                                        </td>
                                        <td>1455</td>
                                        <td>20</td>
                                        <td>900</td>
                                        <td>200</td>
                                        <td>$3000</td>

                                        <td>
                                          <Chip
                                            variant="filled"
                                            color="success"
                                          >
                                            Approved
                                          </Chip>
                                        </td>
                                      </tr>
                                    );
                                  } else {
                                    return (
                                      <>
                                        <tr>
                                          <td
                                            style={{ paddingLeft: "2em" }}
                                            onClick={() =>
                                              setOpen((prevArr) => {
                                                return prevArr.filter(
                                                  (id) => id != countryId
                                                );
                                              })
                                            }
                                          >
                                            <div className={styles.flex}>
                                              <span className={styles.icon}>
                                                <BiCaretDown />
                                              </span>
                                              <span>
                                                {country?.countryName}
                                              </span>
                                            </div>
                                          </td>
                                          <td>1455</td>
                                          <td>20</td>
                                          <td>900</td>
                                          <td>200</td>
                                          <td>$3000</td>

                                          <td>
                                            <span>
                                              {" "}
                                              <RiCheckboxCircleFill
                                                size={20}
                                                color="#198038"
                                              />
                                            </span>
                                            <span>
                                              {" "}
                                              <RiCloseCircleFill
                                                size={20}
                                                color="#DA1E28"
                                              />
                                            </span>
                                          </td>
                                          <td>
                                            <Chip
                                              variant="filled"
                                              color="success"
                                            >
                                              Approved
                                            </Chip>
                                          </td>
                                        </tr>
                                        {country?.tg?.map((target) => {
                                          return (
                                            <tr>
                                              <td
                                                style={{ paddingLeft: "4em" }}
                                              >
                                                <ul>
                                                  <li>
                                                    {target?.targetGroupName}
                                                  </li>
                                                </ul>
                                              </td>
                                              <td>1455</td>
                                              <td>20</td>
                                              <td>900</td>
                                              <td>200</td>
                                              <td>$3000</td>

                                              <td>
                                                <Chip
                                                  variant="filled"
                                                  color="success"
                                                >
                                                  Approved
                                                </Chip>
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </>
                                    );
                                  }
                                })}
                              </>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={styles.transferDetails}>
                <section>
                  <Label className={styles.formLabel}>Account Manager</Label>
                  <div className={styles.managerInput}>
                    <AutoComplete
                      options={autocompleteData}
                      style={{ width: "100%" }}
                      onChange={(e) => handleCompleteChange(e)}
                    />
                  </div>
                </section>
                <section>
                  <Label className={styles.formLabel}>Product Manager</Label>
                  <div className={styles.managerInput}>
                    <AutoComplete
                      options={autocompleteData}
                      style={{ width: "100%" }}
                      onChange={(e) => handleCompleteChange(e)}
                    />
                  </div>
                </section>
              </div>
              <section className={styles.proceed}>
                <Button
                  variant="outlined"
                  onClick={() => setShowTransferModal((prev) => !prev)}
                >
                  Back
                </Button>
                <Button onClick={openTransferModal} variant="filled">
                  Transfer
                </Button>
              </section>
            </div>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default InFieldProgress;
