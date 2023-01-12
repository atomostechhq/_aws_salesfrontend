import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../customComponents/header/Header";
import styles from "./Overview.module.css";
import targetAudience from "../../assets/targetAudience.png";
import device from "../../assets/device.png";
import description from "../../assets/description.png";

import React, {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { BiCaretDown } from "react-icons/bi";

import Chip from "../../components/Chips/Chip";
import { AiFillInfoCircle } from "react-icons/ai";
import { BsDot, BsPlus } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import Modal from "../../components/Modal/Modal";
import { ModalContent } from "../../components/Modal/Modal.style";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { RiCloseCircleFill } from "react-icons/ri";
import { Label } from "../../components/TextField/TextField.style";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import axios from "axios";
import { BLAZE_BASE_URL, SALES_BASE_URL } from "../../config";
import { v4 as uuid } from "uuid";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useHelperDataContext } from "../../context/HelperDataContext";
import CheckBox from "../../components/CheckBox/CheckBox";
import { createPortal } from "react-dom";
import { BsDownload } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import Alert from "../../components/Alert/Alert";

const Overview = () => {
  let navigate = useNavigate();

  const { id } = useParams();
  const [open, setOpen] = useState([]);
  const { helperData } = useHelperDataContext();
  const [showModal, setShowModal] = useState({
    approveModal: false,
    transferModal: false,
  });
  const [orderDataForModal, setOrderForModal] = useState([]);
  const [salesData, setSalesData] = useState({});
  let devicesChecked = [];

  const [addBidPerson, setAddBidPerson] = useState(false);
  const [bidPersonModalInputData, setBidPersonModalInputData] = useState({});
  const [bidpersonCard, setBidpersonCard] = useState(false);
  const [array, setArray] = useState();
  const [editModal, setEditModal] = useState(false);

  const handleEditClick = () => {
    setEditModal((prev) => !prev);
  };

  const openAddBidPerson = () => {
    setAddBidPerson((prev) => !prev);
  };

  const [alertOpen, setAlertOpen] = useState(false);

  const handleAlertClick = () => {
    // setAlertOpen((prev) => !prev);
    setAlertOpen(true);
  };

  const [viewModal, setViewModal] = useState(false);

  const handleTransferToBlaze = async (orderData, originalSalesOrderData) => {
    let surveys = [];
    orderData?.forEach((country) => {
      if (country?.status === "approved" || country?.status === "partial")
        country?.tgs?.forEach((tg) => {
          let survey = {};
          if (tg?.status === "approved") {
            survey["surveyName"] = tg?.tgTargetAudience;
            survey["surveyStatus"] = "bidding";
            survey["internalStatus"] = "ongoing";
            survey["countryId"] = country?.countryId;
            survey["clientId"] = originalSalesOrderData?.clientId;
            survey["StudyType"] = originalSalesOrderData?.StudyType;
            survey["methodology"] =
              originalSalesOrderData?.Methodology?.methodology;
            survey["businessUnit"] = "mirats_otc";
            survey["industry"] = originalSalesOrderData?.Industry;
            survey["requiredCompletes"] = tg?.requiredSample;
            survey["clientCPI"] = tg?.cpi;
            survey["bidIR"] = tg?.ir;
            survey["bidLOI"] = tg?.loi;
            survey["expectedStartDate"] = originalSalesOrderData?.startDate;
            survey["expectedEndDate"] = originalSalesOrderData?.endDate;
            survey["piiCollection"] = false;
            survey["existingProjectChecked"] = false;
            survey["salesOrderId"] = originalSalesOrderData?.salesorder_id;
            survey["createdBy"] = 1;
            survey["speederLoi"] = parseInt(tg?.loi / 3);
            surveys.push(survey);
          }
        });
    });

    surveys?.forEach(async (survey) => {
      console.log(survey);
      axios
        .post(`${BLAZE_BASE_URL}/survey/create`, survey)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    setShowModal((prev) => !prev);

    console.log(surveys);
  };

  const getChipColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "partial":
        return "primary";
      default:
        return;
    }
  };

  const openViewModal = () => {
    setViewModal((prev) => !prev);
  };

  console.log(id);

  useEffect(() => {
    axios
      .get(`${SALES_BASE_URL}/sales/get-salesorders/${id}`)
      .then((res) => {
        setSalesData(res?.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(salesData);

  const handleModal = (modalName, value) => {
    setShowModal((prev) => {
      return { ...prev, [modalName]: value };
    });
  };

  const handleCountryActionChange = (i, action) => {
    let x = orderDataForModal;
    x[i] = { ...x[i], status: action };
    x[i].tgs = x[i].tgs?.map((tg) => ({ ...tg, status: action }));
    setOrderForModal([...x]);
  };

  const handleBidpersonchange = (e, name, value) => {
    setBidPersonModalInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const getData = (e) => {
    axios
      .get(`${SALES_BASE_URL}/sales/get-salesorders/${id}`)
      .then((res) => {
        setSalesData(res?.data);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${SALES_BASE_URL}/sales/update/salesorders/${id}`,
        bidPersonModalInputData
      )
      .then((res) => {
        getData();
      });

    setAddBidPerson(false);
    setBidpersonCard(true);

    setBidPersonModalInputData({
      BidPerson: salesData?.BidPerson,
      BidAmount: salesData?.BidAmount,
      BiddingDate: salesData?.BiddingDate,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // const url = new URLSearchParams(document.location.search);
  // const params1 = url.get("imgURl");
  // console.log(params1);
  const handleTgActionChange = (i, j, action) => {
    let x = orderDataForModal;
    let isAllTgsHaveSameStatus = true;
    x[i].tgs[j] = { ...x[i].tgs[j], status: action };
    for (const tg of x[i].tgs) {
      if (tg?.status !== action) {
        isAllTgsHaveSameStatus = false;
        break;
      }
    }
    isAllTgsHaveSameStatus ? (x[i].status = action) : (x[i].status = "partial");
    setOrderForModal([...x]);
  };

  let countrieskey = salesData?.countries
    ? Object.keys(salesData?.countries)[0]?.split("-")[1]
    : ["GRP-default"];

  console.log(orderDataForModal);
  console.log(bidPersonModalInputData);

  // console.log(
  //   salesData?.zipcode?.split("/")[salesData?.zipcode?.split("/")?.length - 1]
  // );

  useEffect(() => {
    const array = salesData?.zipcode?.replace(/[\[\]/["]+/g, "");
    setArray(array);
  }, [salesData?.zipcode]);

  return (
    <>
      <Header />

      <div className={styles.overview_container}>
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
              <h1>{salesData?.projectName}</h1>
              {helperData?.clients?.map((data) => {
                if (salesData?.clientId === data?.value) {
                  return <span>{data?.label}</span>;
                }
                return null;
              })}
            </div>
            <div>
              <button className={styles.edit} onClick={() => handleEditClick()}>
                Edit
              </button>
            </div>
            <div className={styles.projNum}>
              <p>[#{salesData?.salesorder_id}]</p>
            </div>
          </section>
          <section className={styles.right_project_container}>
            {salesData?.salesorder_id == id && salesData?.topUp ? (
              <div className={styles.topupOrder}>
                <AiFillInfoCircle color="#1765dc" />
                <Chip variant="filled" color="primary">
                  Top Up Order
                </Chip>
              </div>
            ) : null}
            <select
              onChange={(e) => {
                if (e.target.value === "won") {
                  handleModal("approveModal", true);
                  setOrderForModal(() => {
                    let data = [];
                    Object.keys(salesData?.countries)?.forEach((key, value) => {
                      // console.log(salesData?.countries?.UNGRP[key]);
                      data.push(...salesData?.countries[key]);
                    });

                    return data;
                  });
                }
              }}
              className={styles.statusBtn}
            >
              <option value="in-progress">In-Progress</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
              <option value="live">Live</option>
              <option value="closed">Closed</option>
              <option value="archived">Archived</option>
            </select>
            <Button variant="filled" onClick={handleAlertClick}>
              Show Alert Button
            </Button>

            <Alert
              alertOpen={alertOpen}
              setAlertOpen={setAlertOpen}
              variant="success"
              message="This is a success alert"
              position="bottomLeft"
            />
            <Link to={`/quotation/${id}`}>
              <Button variant="filled">View Quotation</Button>
            </Link>
          </section>
        </div>

        <Modal showModal={editModal} setShowModal={setEditModal}>
          <ModalContent>
            <div className={styles.editContainer}>
              <h2>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                perferendis sint ullam nostrum eum, vero pariatur at in
                blanditiis ex, adipisci nam veritatis soluta placeat saepe sit
                obcaecati perspiciatis dicta.
              </h2>
            </div>
          </ModalContent>
        </Modal>

        {/* survey details */}
        <div className={styles.survey_details_container}>
          <section className={styles.left_survey_details}>
            <div className={styles.details_body}>
              <span>Survey Type</span>

              <h2>{salesData?.Methodology?.methodology}</h2>
            </div>

            <div className={styles.details_body}>
              <span>Industry</span>

              <h2>{salesData?.Industry?.industry_name}</h2>
            </div>

            <div className={styles.details_body}>
              <span>Stage</span>

              <h2>{salesData?.status}</h2>
            </div>

            <div className={styles.details_body}>
              <span>Study Type</span>

              <h2>{salesData?.StudyType?.studyTypeName}</h2>
            </div>

            <div className={styles.details_body}>
              <span>Start Date</span>

              <h2>
                {new Date(salesData?.startDate)?.toLocaleDateString("en-CA")}
              </h2>
            </div>

            <div className={styles.details_body}>
              <span>Client Name</span>

              {helperData?.clients?.map((data) => {
                if (salesData?.clientId === data?.value) {
                  return <h2>{data?.label}</h2>;
                }
                return null;
              })}
            </div>

            <div className={styles.details_body}>
              <span>Currency Type</span>
              <div className={styles.cuurency_wrapper}>
                {salesData?.countries?.UNGRP?.filter((country, i) => {
                  return (
                    salesData?.countries?.UNGRP?.map(
                      (val) =>
                        val?.currency?.currencyName &&
                        val?.currency?.currencySymbol
                    ).indexOf(
                      country?.currency?.currencyName &&
                        country?.currency?.currencySymbol
                    ) == i
                  );
                })?.map((myData) => (
                  <>
                    <h2 className={styles.currency_container}>
                      {myData?.currency?.currencyName +
                        "(" +
                        myData?.currency?.currencySymbol +
                        ")"}
                    </h2>
                  </>
                ))}
                {salesData?.countries?.[`GRP-${countrieskey}`]
                  ?.filter((country, i) => {
                    return (
                      salesData?.countries?.[`GRP-${countrieskey}`]
                        ?.map(
                          (val) =>
                            val?.currency?.currencyName &&
                            val?.currency?.currencySymbol
                        )
                        .indexOf(
                          country?.currency?.currencyName &&
                            country?.currency?.currencySymbol
                        ) == i
                    );
                  })
                  ?.map((myData) => (
                    <>
                      <h2 className={styles.currency_container}>
                        {myData?.currency?.currencyName +
                          "(" +
                          myData?.currency?.currencySymbol +
                          ")"}
                      </h2>
                    </>
                  ))}
              </div>
            </div>
            {/* </div> */}

            <div className={styles.details_body}>
              <span>End Date</span>

              <h2>
                {new Date(salesData?.endDate)?.toLocaleDateString("en-ca")}
              </h2>
            </div>

            {salesData?.BiddingDate && (
              <div className={styles.details_body}>
                <span>Bidding Date</span>
                <h2>
                  {new Date(salesData?.BiddingDate)?.toLocaleDateString(
                    "en-ca"
                  )}
                </h2>
              </div>
            )}

            <div className={styles.details_body}>
              <span>Total Budget</span>

              <h2>${salesData?.totalBudgetSum}</h2>
            </div>
            {salesData?.BidAmount && (
              <div className={styles.details_body}>
                <span>Bid Amount</span>
                <h2>${salesData?.BidAmount}</h2>
              </div>
            )}
          </section>
          <section className={styles.right_survey_details}>
            <div className={styles.overview_codes}>
              <div className={styles.target_audience}>
                <section className={styles.img_text}>
                  <img src={targetAudience} alt="" />
                  <span>Overview</span>
                </section>
                <p>
                  <span>{salesData?.Overview}</span>
                </p>
              </div>
              <div className={styles.screener_files}>
                <span>Files</span>
                <div className={styles.uploadFile}>
                  {salesData?.zipcode || salesData?.screener ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <p className={styles.uploaded_file}>
                            {/* zipcode -{localStorage.getItem("zipcodefile")} */}
                            zipcode - {salesData?.zipcodeFile}
                          </p>

                          <Button
                            className={styles.view}
                            variant="outlined"
                            onClick={openViewModal}
                          >
                            View
                          </Button>
                        </div>
                        <div>
                          <p className={styles.uploaded_file}>
                            screener -{" "}
                            {
                              salesData?.screener?.split("/")[
                                salesData?.screener?.split("/")?.length - 1
                              ]
                            }
                          </p>

                          <Button
                            className={styles.view}
                            variant="outlined"
                            onClick={() =>
                              navigate(
                                `/sales-order/overview/${id}/screener/${
                                  salesData?.screener?.split("/")[
                                    salesData?.screener?.split("/")?.length - 1
                                  ]
                                }`
                              )
                            }
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>No Files uploaded!</div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.deviceCompatibility}>
              <section className={styles.img_text}>
                <img src={device} alt="" />
                <span>Device Compatibility</span>
              </section>
              {salesData?.SalesOrderDevices?.map((data) => {
                devicesChecked.push(data?.deviceId);
              })}
              <section className={styles.checkbox_wrapper}>
                <p className={styles.checkbox_container}>
                  <input type="checkbox" checked={devicesChecked.includes(2)} />
                  <label>Desktop/Laptop</label>
                </p>
                <p className={styles.checkbox_container}>
                  <input type="checkbox" checked={devicesChecked.includes(3)} />
                  <label>Tablet</label>
                </p>
                <p className={styles.checkbox_container}>
                  <input type="checkbox" checked={devicesChecked.includes(1)} />
                  <label>Smart Phone</label>
                </p>
                <p className={styles.checkbox_container}>
                  <input type="checkbox" checked={devicesChecked.includes(4)} />
                  <label>Smart Tv</label>
                </p>
                <p className={styles.checkbox_container}>
                  <input type="checkbox" disabled />
                  <label>Requires Webcam</label>
                </p>
              </section>
            </div>
          </section>
        </div>

        {/* imageupload view modal */}
        <Modal showModal={viewModal} setShowModal={setViewModal}>
          <ModalContent>
            <div className={styles.iframe_container}>
              <h2>Zipcodes</h2>

              <table className={styles.zipcodetable}>
                <tr>
                  <th className={styles.Theading}>Sr No.</th>
                  <th className={styles.Theading}>Zipcode</th>
                </tr>

                {array?.split(",")?.map((res, i) => {
                  return (
                    <tr>
                      <td className={styles.Tdata}>{i + 1}</td>
                      <td className={styles.Tdata}>{res}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </ModalContent>
        </Modal>

        {/* table */}
        <div className={styles.collapse_table}>
          <table>
            <thead>
              <tr>
                <th>Country {">"} Target audience</th>
                <th>IR</th>
                <th>Feasibility</th>
                <th>Timeline</th>
                <th>CPI</th>
                <th>Total Budget</th>
                <th>Allocation Status</th>
              </tr>
            </thead>
            <tbody>
              {Object?.keys(
                salesData?.countries ? salesData?.countries : {}
              )?.map((key) => {
                let countries = salesData?.countries[key];
                let countryGrpId = key;

                return (
                  <React.Fragment key={uuid()}>
                    <tr>
                      <td
                        onClick={() => {
                          if (!open.includes(countryGrpId)) {
                            setOpen((prevArr) => [...prevArr, countryGrpId]);
                          } else {
                            setOpen((prevArr) => {
                              return prevArr.filter(
                                (id) => id !== countryGrpId
                              );
                            });
                          }
                        }}
                      >
                        <div className={styles.flex}>
                          <span className={styles.icon}>
                            <BiCaretDown />
                          </span>
                          <span>{countryGrpId}</span>
                        </div>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <Chip variant="filled" color="warning">
                          Pending
                        </Chip>
                      </td>
                    </tr>
                    {open.includes(countryGrpId) &&
                      countries?.map((country) => {
                        return (
                          <React.Fragment key={uuid()}>
                            <tr>
                              <td
                                style={{ paddingLeft: "2em" }}
                                onClick={() => {
                                  if (open.includes(country?.countryId)) {
                                    setOpen((prev) =>
                                      prev?.filter(
                                        (x) => x !== country?.countryId
                                      )
                                    );
                                  } else {
                                    setOpen((prev) => [
                                      ...prev,
                                      country?.countryId,
                                    ]);
                                  }
                                }}
                              >
                                <div className={styles.flex}>
                                  <span className={styles.icon}>
                                    <BiCaretDown />
                                  </span>
                                  <span>{country?.countryName}</span>
                                </div>
                              </td>
                              <td>{country?.avgIr}</td>
                              <td>{country?.feasibilitySum}</td>
                              <td>{country?.maxTimelinePerTg}</td>
                              <td>{country?.avgCpi}</td>
                              <td>{country?.totalBudgetSum}</td>
                              <td>
                                <Chip variant="filled" color="warning">
                                  Pending
                                </Chip>
                              </td>
                            </tr>
                            {open.includes(country?.countryId) &&
                              country?.tgs?.map((tg) => {
                                return (
                                  <tr key={uuid()}>
                                    <td style={{ paddingLeft: "4em" }}>
                                      <ul>
                                        <li>
                                          {tg?.tgTargetAudience} (ID #{tg?.id})
                                        </li>
                                      </ul>
                                    </td>
                                    <td>{tg?.ir}</td>
                                    <td>{tg?.feasibility}</td>
                                    <td>{tg?.timeline}</td>
                                    <td>{tg?.cpi}</td>
                                    <td>{tg?.totalBudget}</td>
                                    <td>
                                      <Chip variant="filled" color="warning">
                                        Pending
                                      </Chip>
                                    </td>
                                  </tr>
                                );
                              })}
                          </React.Fragment>
                        );
                      })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* approve sales order countries model */}
        <Modal
          showModal={showModal?.approveModal}
          setShowModal={() => handleModal("approveModal", false)}
        >
          <ModalContent>
            <div className={styles.approve_supplier}>
              <h2>Approve Order</h2>
              <div className={styles.approve_supplier_container}>
                <div className={styles.approveSupplier_collapse_table}>
                  <table>
                    <thead>
                      <tr>
                        <th>Country {">"} Target audience</th>
                        <th>Langauge</th>
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
                      {orderDataForModal?.map((country, i) => {
                        let languages = country?.Languages.map((lang) => ({
                          label: lang?.languageName,
                          value: lang?.languageId,
                        }));
                        return (
                          <React.Fragment key={uuid()}>
                            <tr>
                              <td
                                onClick={() => {
                                  if (!orderDataForModal[i]?.open) {
                                    let x = orderDataForModal;
                                    x[i].open = true;
                                    setOrderForModal([...x]);
                                  } else {
                                    let x = orderDataForModal;
                                    x[i].open = false;
                                    setOrderForModal([...x]);
                                  }
                                }}
                              >
                                <div className={styles.flex}>
                                  <span className={styles.icon}>
                                    <BiCaretDown />
                                  </span>
                                  <span> {country?.countryName}</span>
                                </div>
                              </td>
                              <td>
                                <Dropdown
                                  dropdownText="Select Language"
                                  options={languages}
                                  // onChange={() => console.log("yes yes ")}
                                  onChange={(e) => {
                                    let x = orderDataForModal;
                                    x[i].language = e?.label;
                                    setOrderForModal([...x]);
                                  }}
                                />
                              </td>
                              <td>{country?.avgIr}</td>
                              <td>{country?.feasibilitySum}</td>
                              <td>{country?.maxTimelinePerTg}</td>
                              <td>{country?.avgCpi}</td>
                              <td>{country?.totalBudgetSum}</td>
                              <td>
                                <span>
                                  {" "}
                                  <RiCheckboxCircleFill
                                    size={20}
                                    color="#198038"
                                    onClick={(e) => {
                                      handleCountryActionChange(i, "approved");
                                    }}
                                  />
                                </span>
                                <span>
                                  {" "}
                                  <RiCloseCircleFill
                                    size={20}
                                    color="#DA1E28"
                                    onClick={(e) => {
                                      handleCountryActionChange(i, "rejected");
                                    }}
                                  />
                                </span>
                              </td>
                              <td>
                                <Chip
                                  variant="filled"
                                  color={getChipColor(country?.status)}
                                >
                                  {country?.status?.charAt(0)?.toUpperCase() +
                                    country?.status?.slice(1)}
                                </Chip>
                              </td>
                            </tr>

                            {country?.open &&
                              country?.tgs?.map((tg, j) => {
                                return (
                                  <tr key={tg?.id}>
                                    <td
                                      style={{
                                        paddingLeft: "4em",
                                      }}
                                    >
                                      <ul>
                                        <li>
                                          {tg?.tgTargetAudience} (ID #{tg?.id})
                                        </li>
                                      </ul>
                                    </td>
                                    <td></td>
                                    <td>{tg?.ir}</td>
                                    <td>{tg?.feasibility}</td>
                                    <td>{tg?.timeline}</td>
                                    <td>{tg?.cpi}</td>
                                    <td>{tg?.totalBudget}</td>
                                    <td>
                                      <span>
                                        {" "}
                                        <RiCheckboxCircleFill
                                          size={20}
                                          color="#198038"
                                          onClick={() => {
                                            handleTgActionChange(
                                              i,
                                              j,
                                              "approved"
                                            );
                                          }}
                                        />
                                      </span>
                                      <span>
                                        {" "}
                                        <RiCloseCircleFill
                                          size={20}
                                          color="#DA1E28"
                                          onClick={() => {
                                            handleTgActionChange(
                                              i,
                                              j,
                                              "rejected"
                                            );
                                          }}
                                        />
                                      </span>
                                    </td>
                                    <td>
                                      {(() => {
                                        let x =
                                          country?.status === "partial"
                                            ? tg?.status
                                            : country?.status;
                                        return (
                                          <Chip
                                            variant="filled"
                                            color={getChipColor(x)}
                                          >
                                            {console.log(tg?.status)}
                                            {x?.charAt(0)?.toUpperCase() +
                                              x?.slice(1)}
                                          </Chip>
                                        );
                                      })()}
                                    </td>
                                  </tr>
                                );
                              })}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <section className={styles.proceed}>
                <Button
                  onClick={() => handleModal("transferModal", true)}
                  variant="filled"
                  // disabled={
                  //   orderDataForModal?.status === "partial" ||
                  //   orderDataForModal?.status === "approved"
                  //     ? false
                  //     : true
                  // }
                >
                  Proceed
                </Button>
              </section>
            </div>
          </ModalContent>
        </Modal>

        {/* transfer to blaze model */}
        <Modal
          showModal={showModal?.transferModal}
          setShowModal={() => handleModal("transferModal", false)}
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
                      {orderDataForModal?.map((country, i) => {
                        if (
                          country?.status === "partial" ||
                          country?.status === "approved"
                        )
                          return (
                            <React.Fragment key={uuid()}>
                              <tr>
                                <td
                                  onClick={() => {
                                    if (!orderDataForModal[i].open) {
                                      let x = orderDataForModal;
                                      x[i].open = true;
                                      setOrderForModal([...x]);
                                    } else {
                                      let x = orderDataForModal;
                                      x[i].open = false;
                                      setOrderForModal([...x]);
                                    }
                                  }}
                                >
                                  <div className={styles.flex}>
                                    <span className={styles.icon}>
                                      <BiCaretDown />
                                    </span>
                                    <span> {country?.countryName}</span>
                                  </div>
                                </td>
                                <td>{country?.avgIr}</td>
                                <td>{country?.feasibilitySum}</td>
                                <td>{country?.maxTimelinePerTg}</td>
                                <td>{country?.avgCpi}</td>
                                <td>${country?.totalBudgetSum}</td>
                                <td>
                                  <Chip variant="filled" color="success">
                                    Approved
                                  </Chip>
                                </td>
                              </tr>

                              {country?.open && (
                                <>
                                  {country?.tgs?.map((tg) => {
                                    if (tg?.status === "approved")
                                      return (
                                        <tr>
                                          <td style={{ paddingLeft: "2em" }}>
                                            <div className={styles.flex}>
                                              <span className={styles.icon}>
                                                <BiCaretDown />
                                              </span>
                                              <span>
                                                {tg?.tgTargetAudience} (ID #
                                                {tg?.id})
                                              </span>
                                            </div>
                                          </td>
                                          <td>{tg?.ir}</td>
                                          <td>{tg?.feasibility}</td>
                                          <td>{tg?.timeline}</td>
                                          <td>{tg?.cpi}</td>
                                          <td>${tg?.totalBudget}</td>

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
                                    return null;
                                  })}
                                </>
                              )}
                            </React.Fragment>
                          );
                        return null;
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
                      options={helperData?.accountManagers}
                      onChange={(val) => {
                        setOrderForModal((prev) => {
                          return prev?.map((country) => {
                            return country?.status === "approved" ||
                              country?.status === "parital"
                              ? { ...country, accountManager: val }
                              : country;
                          });
                        });
                      }}
                      style={{ width: "100%" }}
                    />
                  </div>
                </section>
                <section>
                  <Label className={styles.formLabel}>Project Manager</Label>
                  <div className={styles.managerInput}>
                    <AutoComplete
                      options={helperData?.projectManagers}
                      onChange={(val) => {
                        setOrderForModal((prev) => {
                          return prev?.map((country) => {
                            return country?.status === "approved" ||
                              country?.status === "parital"
                              ? { ...country, projectManager: val }
                              : country;
                          });
                        });
                      }}
                      style={{ width: "100%" }}
                    />
                  </div>
                </section>
              </div>
              <section className={styles.proceed}>
                <Button
                  variant="outlined"
                  onClick={() => handleModal("transferModal", false)}
                >
                  Back
                </Button>
                <Button
                  onClick={() =>
                    handleTransferToBlaze(orderDataForModal, salesData)
                  }
                  variant="filled"
                >
                  Transfer
                </Button>
              </section>
            </div>
          </ModalContent>
        </Modal>

        {/* description */}
        <div className={styles.details_container}>
          <div className={styles.description}>
            <section className={styles.img_text}>
              <img src={description} alt="" />
              <span>Description</span>
            </section>
            {salesData?.description ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: salesData?.description,
                }}
              ></p>
            ) : (
              <p>No Description</p>
            )}
          </div>

          {/* sales manager details container */}
          <div className={styles.manager_details_container}>
            <section className={styles.sales_manager_details}>
              <p className={styles.intro_text}>Sales Manager</p>
              <section className={styles.details}>
                <div className={styles.details_wrapper}>
                  <img src={device} alt="" />
                  <p>
                    {helperData?.salesManagers?.map((res) => {
                      if (res?.value == salesData?.salesManagerId) {
                        return res?.label;
                      }
                    })}
                  </p>
                </div>
                <div className={styles.details_wrapper}>
                  <span className={styles.email}>Email</span>
                  {helperData?.salesManagers?.map((res) => {
                    if (salesData?.salesManagerId == res?.value) {
                      return <p className={styles.fullemail}>{res?.email}</p>;
                    }
                  })}
                </div>
                <div className={styles.details_wrapper}>
                  <span className={styles.createdDate}>Created Date</span>
                  <p className={styles.date}>
                    {new Date(salesData?.createdAt)?.toLocaleDateString(
                      "en-ca"
                    )}
                  </p>
                </div>
                <div className={styles.details_wrapper}>
                  <span className={styles.totBudget}>Total Budget</span>
                  <p className={styles.total}>${salesData?.totalBudgetSum}</p>
                </div>
              </section>
            </section>

            {salesData?.BidPerson == null ? (
              <>
                <section className={styles.add_bid_container}>
                  <div
                    onClick={openAddBidPerson}
                    className={styles.add_bid_person}
                  >
                    <BsPlus color="#1765DC" size={80} />
                    <p>Add Bid Person</p>
                  </div>
                </section>
              </>
            ) : (
              <>
                {/* bid person details */}

                <section className={styles.sales_manager_details}>
                  <p className={styles.intro_text}>Bid Person</p>
                  <section className={styles.details}>
                    <div className={styles.details_wrapper}>
                      <img src={device} alt="" />

                      {helperData?.salesManagers?.map((res) => {
                        if (res?.value == salesData?.BidPerson) {
                          return <p>{res?.label}</p>;
                        }
                      })}
                    </div>
                    <div className={styles.details_wrapper}>
                      <span className={styles.email}>Email</span>
                      {helperData?.salesManagers?.map((res) => {
                        if (res?.value == salesData?.BidPerson) {
                          return (
                            <p className={styles.fullemail}>{res?.email}</p>
                          );
                        }
                      })}
                    </div>
                    <div className={styles.details_wrapper}>
                      <span className={styles.createdDate}>Bidding Date</span>
                      <p className={styles.date}>
                        {new Date(salesData?.BiddingDate)?.toLocaleDateString(
                          "en-ca"
                        )}
                      </p>
                    </div>
                    <div className={styles.details_wrapper}>
                      <span className={styles.totBudget}>Bid Amount</span>
                      <p className={styles.total}>${salesData?.BidAmount}</p>
                    </div>
                  </section>
                </section>
              </>
            )}

            <Modal showModal={addBidPerson} setShowModal={setAddBidPerson}>
              <ModalContent>
                <div className={styles.addBidPersonModal}>
                  <p className={styles.intro}>Add Bid Person</p>
                  <form action="">
                    <section>
                      <label htmlFor="bidPerson">Select Bid Person</label>
                      <select
                        name="BidPerson"
                        id="BidPerson"
                        onChange={(e) => handleBidpersonchange(e)}
                      >
                        <option value="" disabled selected>
                          Select SalesManagers
                        </option>
                        {helperData?.salesManagers?.map((res) => {
                          return (
                            <>
                              <option value={res?.value}>{res?.label}</option>
                            </>
                          );
                        })}
                      </select>
                    </section>

                    <section>
                      <label htmlFor="bidDate">Select Bidding Date</label>
                      <input
                        type="date"
                        name="BiddingDate"
                        onChange={(e) => handleBidpersonchange(e)}
                      />
                    </section>
                    <section>
                      <label htmlFor="bidAmount">Enter Bid Amount</label>
                      <input
                        type="number"
                        name="BidAmount"
                        onChange={(e) => handleBidpersonchange(e)}
                      />
                    </section>
                    <div className={styles.bidPersonSave}>
                      <Button variant="filled" onClick={(e) => handleSubmit(e)}>
                        Save
                      </Button>
                    </div>
                  </form>
                </div>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
