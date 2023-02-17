import React, { useEffect, useMemo, useState } from "react";
import TextField from "../../../components/TextField/TextField";
import { Label } from "../../../components/TextField/TextField.style";
import Header from "../../../customComponents/header/Header";
import styles from "./CreateOrder.module.css";
import AutoComplete from "../../../components/AutoComplete/AutoComplete";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Checkbox from "../../../components/CheckBox/CheckBox";
import device from "../../../assets/device.png";
import description from "../../../assets/description.png";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Button from "../../../components/Button";
import Select from "react-select";
import { RiDeleteBin5Line, RiCloseLine } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import { v4 as uuid } from "uuid";
import { BsPlus } from "react-icons/bs";
import ButtonWithIcon from "../../../components/ButtonWithIcon/ButtonWithIcon";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { supplierStatuses } from "../../../utils/commonData";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { useSalesOrderContext } from "../SalesOrderContext";
import {
  CLIENT_BASE_URL,
  PEOPLES_BASE_URL,
  SALES_BASE_URL,
  FILE_UPLOAD_URL,
} from "../../../config";
import CheckBox from "../../../components/CheckBox/CheckBox";
import { MdOutlineAdd } from "react-icons/md";
// import { utils, writeFile } from "xlsx";
import { WorkSheet, WorkBook, utils, writeFile } from "xlsx";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { useHelperDataContext } from "../../../context/HelperDataContext";
import Alert from "../../../components/Alert/Alert";
import { useSearchParams } from "react-router-dom";
// import Loading from "../../Loading";
import Loader from "../../../assets/loader/Loader";
import SurveyFetchLoader from "../../../assets/surveyFetchLoader/SurveyFetchLoader";

const CreateOrder = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { setAlertSettings, handlealert, fetchSalesOrders } =
    useSalesOrderContext();
  const [zipCodefileInput, setZipcodeFileInput] = useState([]);
  const [screenerFileInput, setScreenerFileInput] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [salesorder, setSalesorder] = useState();
  const { helperData, setHelperData } = useHelperDataContext();
  const [showTgDesc, setShowTgDesc] = useState(false);
  const [deviceData, setDeviceData] = useState();

  useEffect(() => {
    if (window.location.pathname === `/edit/${id}/update-salesorder`) {
      axios.get(`${SALES_BASE_URL}/sales/get-salesorders/${id}`).then((res) => {
        setSalesorder(res?.data);

        console.log(res?.data);
      });
    }
  }, [id]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${SALES_BASE_URL}/sales/salesorderdevices/getSalesOrderDevices/${id}`
  //     )
  //     .then((res) => {
  //       setDeviceData(res?.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [id]);

  //HANDLE ZIP CODE DATA:
  const handleZipcodeFileChange = (event) => {
    event.preventDefault();

    Object?.entries(event.target.files)?.map(([key, value]) => {
      setZipcodeFileInput((prev) => [...prev, value]);
    });
  };

  const handleZipCode = async (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const splitText = text.split("\n");

      setSalesorder((prev) => ({
        ...prev,
        zipcode: JSON.stringify(splitText),
      }));
    };
    reader.readAsText(event.target.files[0]);
  };

  const handlefileuploadClick = (e) => {
    e.preventDefault();

    zipCodefileInput?.map((data) => {
      if (window.location.pathname === `/edit/${id}/update-salesorder`) {
        setSalesorder((prev) => ({
          ...prev,
          zipcodeFile: data?.name,
        }));
        setAlertSettings({
          open: true,
          setalert: handlealert,
          color: "alternative",
          msg: "Zipcode File Updated",
          posi: "bottomLeft",
          hide: 3000,
        });
      } else {
        setSalesorder((prev) => ({
          ...prev,
          zipcodeFile: data?.name,
        }));
        setAlertSettings({
          open: true,
          setalert: handlealert,
          color: "alternative",
          msg: "Zipcode Upload Successfully",
          posi: "bottomLeft",
          hide: 3000,
        });
      }
    });
  };

  const handleScreenerFileChange = (e) => {
    Object?.entries(e.target.files)?.map(([key, value]) => {
      setScreenerFileInput((prev) => [...prev, value]);
    });
  };

  const handleScreenerclick = (e) => {
    e.preventDefault();

    screenerFileInput?.forEach((files) => {
      axios
        .post(
          `${FILE_UPLOAD_URL}/api/file/upload`,
          {
            file: files,
            portalName: "Sales",
            userid: "10004",
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (window.location.pathname === `/edit/${id}/update-salesorder`) {
            setAlertSettings({
              open: true,
              setalert: handlealert,
              color: "alternative",
              msg: "Screener File Updated",
              posi: "bottomLeft",
              hide: 3000,
            });
          } else {
            setAlertSettings({
              open: true,
              setalert: handlealert,
              color: "alternative",
              msg: "Screener Upload Successfully",
              posi: "bottomLeft",
              hide: 3000,
            });
          }
          setSalesorder((prev) => ({
            ...prev,
            screener: res?.data,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  // handleFileDeletes
  const handleZipcodedelete = (e, data, index) => {
    e.preventDefault();
    setZipcodeFileInput((prev) =>
      [...zipCodefileInput]?.filter((d, i) => i !== index)
    );

    console.log("deleted zipcode.....", index);
  };

  const handleScreenerdelete = (e, data, index) => {
    e.preventDefault();
    setScreenerFileInput((prev) =>
      [...screenerFileInput]?.filter((d, i) => i !== index)
    );
    console.log("deleted screener.....", index);
  };

  const openTgDescModal = (e, id) => {
    setShowTgDesc(id);
  };

  const addCountry = (e) => {
    e.preventDefault();
    //ajay
    setTableData((prev) => {
      return [
        ...prev,
        {
          countryUid: uuid(),
          avgLoi: 0,
          avgIr: 0,
          sampleRequiredSum: 0,
          feasibilitySum: 0,
          avgCpi: 0,
          maxTimelinePerTg: 0,
          tgs: [],
          totalBudgetSum: 0,
        },
      ];
    });
  };
  const addTg = (countryUid) => {
    setTableData((prevData) => {
      return prevData?.map((country) => {
        if (country?.countryUid === countryUid) {
          return {
            ...country,
            avgCpi: Number(
              (country?.avgCpi * country?.tgs?.length + 0) /
                (country?.tgs?.length + 1)
            ),
            avgIr: Number(
              (country?.avgIr * country?.tgs?.length + 0) /
                (country?.tgs?.length + 1)
            ),
            avgLoi: parseInt(
              (country?.avgLoi * country?.tgs?.length + 0) /
                (country?.tgs?.length + 1)
            ),
            maxTimelinePerTg: country?.maxTimelinePerTg + 0,
            feasibilitySum: country?.feasibilitySum + 0,
            sampleRequiredSum: country?.sampleRequiredSum + 0,
            totalBudgetSum: country?.totalBudgetSum + 0,
            disabledCountry: true,
            tgs: [
              ...country?.tgs,
              {
                tgId: uuid(),
                loi: 0,
                ir: 0,
                requiredSample: 0,
                feasibility: 0,
                cpi: 0,
                timeline: 0,
                totalBudget: 0,
              },
            ],
          };
        }
        return country;
      });
    });
  };

  const handleDuplicateTg = (countryUid, target) => {
    setTableData((prevData) => {
      return prevData?.map((country) => {
        if (country?.countryUid === countryUid) {
          return {
            ...country,
            avgCpi: Number(
              (country?.avgCpi * country?.tgs?.length + target?.cpi) /
                (country?.tgs?.length + 1)
            ),
            avgIr: Number(
              (country?.avgIr * country?.tgs?.length + target?.ir) /
                (country?.tgs?.length + 1)
            ),
            avgLoi: parseInt(
              (country?.avgLoi * country?.tgs?.length + target?.loi) /
                (country?.tgs?.length + 1)
            ),
            maxTimelinePerTg: country?.maxTimelinePerTg + target?.timeline,
            feasibilitySum: country?.feasibilitySum + target?.feasibility,
            sampleRequiredSum:
              country?.sampleRequiredSum + target?.requiredSample,
            totalBudgetSum: country?.totalBudgetSum + target?.totalBudget,
            tgs: [...country?.tgs, { ...target, tgId: uuid() }],
          };
        }
        return country;
      });
    });
  };

  const handleAddCountryWithTarget = (e) => {
    e.preventDefault();
    setTableData((prev) => {
      return [
        ...prev,
        {
          countryUid: uuid(),
          disabledCountry: true,
          tgs: [
            {
              tgId: uuid(),
              avgLoi: 0,
              avgIr: 0,
              sampleRequiredSum: 0,
              feasibilitySum: 0,
              totalBudgetSum: 0,
              avgCpi: 0,
              maxTimelinePerTg: 0,
            },
          ],
        },
      ];
    });
  };

  const handleDeleteCountry = (countryUid) => {
    setTableData((prev) => {
      return prev.filter((country) => {
        return country?.countryUid !== countryUid;
      });
    });
  };

  const handleDeleteTg = (countryUid, target) => {
    // console.log(tableData);
    setTableData((prev) => {
      return prev.map((country) => {
        if (country?.countryUid === countryUid) {
          let x = country;
          x.avgCpi = Number(
            (country?.avgCpi * country?.tgs?.length - target?.cpi) /
              (country?.tgs?.length + 1)
          );
          x.avgIr = Number(
            (country?.avgIr * country?.tgs?.length - target?.ir) /
              (country?.tgs?.length + 1)
          );
          x.avgLoi = parseInt(
            (country?.avgLoi * country?.tgs?.length - target?.loi) /
              (country?.tgs?.length + 1)
          );
          x.maxTimelinePerTg = country?.maxTimelinePerTg - target?.timeline;
          x.feasibilitySum = country?.feasibilitySum - target?.feasibility;
          x.sampleRequiredSum =
            country?.sampleRequiredSum - target?.requiredSample;
          x.totalBudgetSum = country?.totalBudgetSum - target?.totalBudget;
          x.tgs = x?.tgs?.filter((tgs) => tgs?.tgId !== target?.tgId);
          if (!x.tgs.length) x["disabledCountry"] = false;
          return x;
        }
        return country;
      });
    });
  };

  const handleCountryRowChange = (name, value, countryUid) => {
    setTableData((prev) => {
      return prev?.map((country) => {
        if (country?.countryUid === countryUid) {
          return {
            ...country,
            [name]: value,
            totalBudgetSum:
              (name === "avgCpi" ? Number(value) : Number(country?.avgCpi)) *
              (name === "feasibilitySum"
                ? Number(value)
                : Number(country?.feasibilitySum)),
          };
        }
        return country;
      });
    });
  };

  const handleTgRowChange = (name, value, countryUid, tgId) => {
    setTableData((prev) => {
      return prev?.map((country) => {
        if (country?.countryUid === countryUid) {
          let x = country;
          x.tgs = x?.tgs?.map((tgs, i) => {
            if (tgs?.tgId === tgId) {
              return {
                ...tgs,
                [name]: value,
                totalBudget:
                  (name === "cpi" ? value : tgs?.cpi) *
                  (name === "feasibility" ? value : tgs?.feasibility),
              };
            }
            return tgs;
          });

          switch (name) {
            case "loi":
              x["avgLoi"] = 0;
              x?.tgs?.forEach((item) => {
                x["avgLoi"] = Math.round(
                  (x["avgLoi"] * x?.tgs?.length + item?.loi) / x?.tgs?.length
                );
              });
              break;
            case "ir":
              x["avgIr"] = 0;
              x?.tgs?.forEach((item) => {
                x["avgIr"] = Number(
                  (
                    (x["avgIr"] * x?.tgs?.length + item?.ir) /
                    x?.tgs?.length
                  ).toFixed(2)
                );
              });
              break;
            case "cpi":
              x["avgCpi"] = 0;
              x["totalBudgetSum"] = 0;
              x?.tgs?.forEach((item) => {
                x["avgCpi"] = Number(
                  (
                    (x["avgCpi"] * x?.tgs?.length + item?.cpi) /
                    x?.tgs?.length
                  ).toFixed(2)
                );
                x["totalBudgetSum"] += item?.totalBudget;
              });
              break;
            case "requiredSample":
              x["sampleRequiredSum"] = 0;
              x?.tgs?.forEach((item) => {
                x["sampleRequiredSum"] += item?.requiredSample;
              });
              break;
            case "feasibility":
              x["feasibilitySum"] = 0;
              x["totalBudgetSum"] = 0;
              x?.tgs?.forEach((item) => {
                x["feasibilitySum"] += item?.feasibility;
                x["totalBudgetSum"] += item?.totalBudget;
              });
              break;
            case "timeline":
              x["maxTimelinePerTg"] = 0;
              x?.tgs?.forEach((item) => {
                x["maxTimelinePerTg"] = Math.max(
                  ...x?.tgs.map((o) => o.timeline)
                );
              });
              break;
            default:
              break;
          }
          // console.log(x);
          return x;
        }

        return country;
      });
    });
  };

  // handlechange data
  const handlechange = (name, value) => {
    if (name === "targetAudienceId") {
      helperData?.targetAudiences?.forEach((target) => {
        if (target?.value === value) {
          setHelperData((prev) => ({ ...prev, secTgs: target?.secTgs }));
        }
      });
    }

    setSalesorder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handlestatuschange
  const handleStatuschange = (e, name) => {
    setSalesorder((prev) => ({
      ...prev,
      [name]: e.value,
    }));
  };

  // create order
  const handlesubmit = async (e) => {
    e.preventDefault();

    var startDate = new Date();
    var endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    let body = salesorder;
    let avgLoi = 0,
      avgCpi = 0,
      avgIr = 0,
      sampleRequiredSum = 0,
      feasibilitySum = 0,
      totalBudgetSum = 0,
      maxTimelinePerCountry = 0;
    maxTimelinePerCountry = Math.max(
      ...tableData?.map((country) => {
        avgLoi += country?.avgLoi;
        avgCpi += country?.avgCpi;
        avgIr += country?.avgIr;
        sampleRequiredSum += country?.sampleRequiredSum;
        feasibilitySum += country?.feasibilitySum;
        totalBudgetSum += country?.totalBudgetSum;
        return country?.maxTimelinePerTg;
      })
    );
    body["avgLoi"] = Math.round(avgLoi / tableData?.length);
    body["avgIr"] = Number((avgIr / tableData?.length).toFixed(2));
    body["avgCpi"] = Number((avgCpi / tableData?.length).toFixed(2));
    body["sampleRequiredSum"] = sampleRequiredSum;
    body["feasibilitySum"] = feasibilitySum;
    body["totalBudgetSum"] = totalBudgetSum;
    body["maxTimelinePerCountry"] = maxTimelinePerCountry;
    body["salesOrderCountryGroups"] = tableData;
    body["startDate"] = startDate.toLocaleDateString("en-CA");
    body["endDate"] = endDate.toLocaleDateString("en-CA");
    axios
      .post(`${SALES_BASE_URL}/sales/salesorders/create/`, salesorder)
      .then(
        (res) => console.log(res),
        setAlertSettings({
          open: true,
          setalert: handlealert,
          color: "success",
          msg: "Salesorder Created Successfully",
          posi: "bottomLeft",
          hide: 3000,
        }),
        fetchSalesOrders(),
        navigate("/sales-order")
      )
      .catch((err) => console.log(err));
  };

  // update order
  const handleUpdateOrder = (e) => {
    e.preventDefault();
    axios
      .put(`${SALES_BASE_URL}/sales/update/salesorders/${id}`, salesorder)
      .then((res) => {
        setAlertSettings({
          open: true,
          setalert: handlealert,
          color: "success",
          msg: `Salesorder ${id} updated Successfully`,
          posi: "bottomLeft",
          hide: 3000,
        });
        navigate(`/sales-order/overview/${id}`);

        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  let result = [];
  const handleExportToExcel = (e) => {
    e.preventDefault();
    // const workSheet: WorkSheet = utils.json_to_sheet(tableData);
    // const workBook: WorkBook = utils.book_new();
    // utils.book_append_sheet(workBook, workSheet, "object_to_save");
    // return writeFile(workBook, "Tests.xlsx");
    const fileType = "xlsx";
    const ws = XLSX.utils.json_to_sheet(result);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    // return writeFile(data, "Tests.xlsx");
    FileSaver.saveAs(data, "Tests.xlsx");
  };
  console.log(salesorder);
  console.log(tableData);
  // console.log(zipCodefileInput);
  // console.log(screenerFileInput);
  console.log(helperData);
  console.log(deviceData);

  useEffect(() => {
    axios
      .get(
        `${SALES_BASE_URL}/sales/salesorderdevices/getSalesOrderDevices/${id}`
      )
      .then((res) => {
        setDeviceData(res?.data);
      });
  }, []);

  return (
    <>
      <Header />

      {helperData?.loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className={styles.sales_order_container}>
          <h1 className={styles.intro_text}>New Sales Order</h1>

          <form action="">
            <div className={styles.sales_order_form}>
              <section className={styles.left_form}>
                <div className={styles.inputField}>
                  <Label className={styles.formLabel}>Email Subject Line</Label>
                  <section className={styles.inputText}>
                    <TextField
                      type="text"
                      placeholder="Email Subject Line"
                      style={{ width: "100%" }}
                      name="emailSubjectLine"
                      value={salesorder?.emailSubjectLine}
                      onChange={(e) => {
                        handlechange(e.target.name, e.target.value);
                      }}
                    />
                  </section>
                </div>
                <div className={styles.inputField}>
                  <Label className={styles.formLabel}>Project Name</Label>
                  <section className={styles.inputText}>
                    <TextField
                      type="text"
                      placeholder="Project Name"
                      style={{ width: "100%" }}
                      name="projectName"
                      value={salesorder?.projectName}
                      onChange={(e) =>
                        handlechange(e.target.name, e.target.value)
                      }
                    />
                  </section>
                </div>
                <div className={styles.inputField}>
                  <Label className={styles.formLabel}>Client Name</Label>

                  <section className={styles.inputText}>
                    <AutoComplete
                      options={helperData?.clients ? helperData?.clients : []}
                      onChange={(value) => handlechange("clientId", value)}
                      style={{ width: "100%" }}
                      defaultValue={() => {
                        let x;
                        helperData?.clients?.forEach((res) => {
                          if (res?.value === salesorder?.clientId) {
                            x = res?.value;
                          }
                        });
                        return x;
                      }}
                    />
                  </section>
                </div>
                <div className={styles.inputField}>
                  <Label className={styles.formLabel}>Target Audience</Label>
                  <section className={styles.inputText}>
                    <AutoComplete
                      options={
                        helperData?.targetAudiences
                          ? helperData?.targetAudiences
                          : []
                      }
                      onChange={(val) => handlechange("targetAudienceId", val)}
                      style={{ width: "100%" }}
                      defaultValue={() => {
                        let x;
                        helperData?.targetAudiences?.map((res) => {
                          if (res?.value === salesorder?.targetAudienceId) {
                            x = res?.value;
                          }
                        });
                        return x;
                      }}
                    />
                  </section>
                </div>
                <div className={styles.inputField}>
                  <Label className={styles.formLabel}>Secondary Audience</Label>

                  <section className={styles.inputText} onChange={handlechange}>
                    <AutoComplete
                      disabled={!salesorder?.targetAudienceId ? true : false}
                      options={() => {
                        return helperData?.targetAudiences?.filter((tg) => {
                          return (
                            tg?.value ===
                              salesorder?.TargetAudience?.targetAudienceId ||
                            tg?.value === salesorder?.targetAudienceId
                          );
                        })[0]?.secTgs;
                      }}
                      onChange={(val) =>
                        handlechange("secTargetAudienceId", val)
                      }
                      style={{ width: "100%" }}
                      defaultValue={() => {
                        let x;
                        helperData?.targetAudiences?.map((res) => {
                          if (
                            res?.value ===
                            salesorder?.SecTargetAudience?.targetAudienceId
                          ) {
                            return res?.secTgs?.map((sectg) => {
                              if (
                                sectg?.value ===
                                salesorder?.SecTargetAudience
                                  ?.sectargetAudienceId
                              ) {
                                x = sectg?.value;
                              }
                            });
                          }
                        });
                        // console.log(x);
                        return x;
                      }}
                    />
                  </section>
                </div>
                <div className={styles.inputField}>
                  <Label className={styles.formLabel}>Overview</Label>
                  <section className={styles.inputText}>
                    <TextField
                      type="text"
                      style={{ width: "100%" }}
                      name="Overview"
                      onChange={(e) =>
                        handlechange(e.target.name, e.target.value)
                      }
                      value={salesorder?.Overview}
                    />
                  </section>
                </div>
              </section>
              <section className={styles.right_form}>
                <div className={styles.inputField}>
                  <Label className={styles.formLabel}>Sales Manager</Label>
                  <section className={styles.inputText}>
                    <AutoComplete
                      options={
                        helperData?.salesManagers
                          ? helperData?.salesManagers
                          : []
                      }
                      onChange={(val) => handlechange("salesManagerId", val)}
                      style={{ width: "100%" }}
                      defaultValue={() => {
                        let x;
                        helperData?.salesManagers?.map((res) => {
                          if (res?.value === salesorder?.salesManagerId) {
                            x = res?.value;
                          }
                        });
                        return x;
                      }}
                    />
                  </section>
                </div>
                <div className={styles.inputField}>
                  <Label className={styles.formLabel}>Methodology</Label>
                  <section className={styles.inputText}>
                    <AutoComplete
                      options={
                        helperData?.methodologies
                          ? helperData?.methodologies
                          : []
                      }
                      onChange={(val) => handlechange("methodologyId", val)}
                      style={{ width: "100%" }}
                      defaultValue={() => {
                        let x;
                        helperData?.methodologies?.map((res) => {
                          if (res?.value === salesorder?.methodologyId) {
                            x = res?.value;
                          }
                        });
                        return x;
                      }}
                    />
                  </section>
                </div>
                <div className={styles.inputField}>
                  <Label className={styles.formLabel}>Study Type</Label>
                  <section className={styles.inputText}>
                    <AutoComplete
                      options={
                        helperData?.studyTypes ? helperData?.studyTypes : []
                      }
                      style={{ width: "100%" }}
                      onChange={(val) => handlechange("studyTypeId", val)}
                      defaultValue={() => {
                        let x;
                        helperData?.studyTypes?.map((res) => {
                          if (res?.value === salesorder?.studyTypeId) {
                            x = res?.value;
                          }
                        });
                        return x;
                      }}
                    />
                  </section>
                </div>
                <div className={styles.inputField}>
                  <Label className={styles.formLabel}>Industry</Label>
                  <section className={styles.inputText}>
                    <AutoComplete
                      options={
                        helperData?.industries ? helperData?.industries : []
                      }
                      style={{ width: "100%" }}
                      onChange={(val) => handlechange("industryId", val)}
                      defaultValue={() => {
                        let x;
                        helperData?.industries?.map((res) => {
                          if (res?.value === salesorder?.industryId) {
                            x = res?.value;
                          }
                        });
                        return x;
                      }}
                    />
                  </section>
                </div>
                <div className={styles.inputField}>
                  <Label className={styles.formLabel}>Status</Label>

                  <section className={styles.inputText}>
                    {" "}
                    <Dropdown
                      dropdownText="In-Progress"
                      options={supplierStatuses}
                      onChange={(e) => handleStatuschange(e, "status")}
                      defaultValue={() => {
                        let x = salesorder?.status;
                        return x;
                      }}
                    />
                  </section>
                </div>
              </section>
            </div>
            <div className={styles.sales_order_details}>
              <section className={styles.left_order_details}>
                {/* zipcode */}
                <section className={styles.zipcode_container}>
                  <div className={styles.zipcode}>
                    <span>Upload Zipcode</span>
                    <ul>
                      <li>Upload file containing zipcodes/pincodes</li>
                      <li>Max file size of the document should be 4MB</li>
                      <li>Files can be .txt, xls, .doc</li>
                    </ul>
                    <div className={styles.upload_container}>
                      <div className={styles.inputfile_box}>
                        <input
                          type="file"
                          id="zipcodefile"
                          multiple
                          className={styles.inputfile}
                          onChange={(e) => {
                            handleZipcodeFileChange(e);
                            handleZipCode(e);
                          }}
                        />
                        <label for="zipcodefile">
                          <span id="file-name" className={styles.file_box}>
                            {/* {fileInput} */}
                          </span>
                          <span className={styles.file_button}>Browse</span>
                        </label>
                      </div>
                      <Button variant="filled" onClick={handlefileuploadClick}>
                        {window.location.pathname ===
                        `/edit/${id}/update-salesorder`
                          ? "Update "
                          : "Upload"}
                      </Button>
                    </div>
                    <div className={styles.fileContainer}>
                      {window.location.pathname ===
                        `/edit/${id}/update-salesorder` &&
                      salesorder?.zipcodeFile ? (
                        <>
                          {
                            <span id="file-name" className={styles.file_box}>
                              <p>{salesorder?.zipcodeFile}</p>
                              <button
                                className={styles.delete_file}
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                <GrClose size={18} />
                              </button>
                            </span>
                          }
                        </>
                      ) : (
                        <>
                          {zipCodefileInput?.map((data, index) => (
                            <span id="file-name" className={styles.file_box}>
                              <p> {data?.name}</p>
                              <button
                                className={styles.delete_file}
                                onClick={(e) =>
                                  handleZipcodedelete(e, data, index)
                                }
                              >
                                <GrClose size={18} />
                              </button>
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                  <div className={styles.zipcode}>
                    {/* screeners */}
                    <span>Upload Screeners</span>
                    <ul>
                      <li>Upload file containing screening questions</li>
                      <li>Max file size of the document should be 4MB</li>
                      <li>Files can be .txt, xls, .doc</li>
                    </ul>
                    <div className={styles.upload_container}>
                      <div className={styles.inputfile_box}>
                        <input
                          type="file"
                          id="screenerfile"
                          className={styles.inputfile}
                          onChange={handleScreenerFileChange}
                        />

                        <label for="screenerfile">
                          <span id="file-name" className={styles.file_box}>
                            {/* {fileInput} */}
                          </span>
                          <span className={styles.file_button}>Browse</span>
                        </label>
                      </div>
                      <Button variant="filled" onClick={handleScreenerclick}>
                        {window.location.pathname ===
                        `/edit/${id}/update-salesorder`
                          ? "Update "
                          : "Upload "}
                      </Button>
                    </div>
                    <div className={styles.fileContainer}>
                      {window.location.pathname ===
                        `/edit/${id}/update-salesorder` &&
                      salesorder?.screener ? (
                        <>
                          <span id="file-name" className={styles.file_box}>
                            <p>
                              {
                                salesorder?.screener?.split("/")[
                                  salesorder?.screener?.split("/")?.length - 1
                                ]
                              }
                            </p>
                            <button
                              className={styles.delete_file}
                              onClick={(e) => {
                                e.preventDefault();
                                console.log("clickd");
                              }}
                            >
                              <GrClose size={18} />
                            </button>
                          </span>
                        </>
                      ) : (
                        <>
                          {screenerFileInput?.map((data, index) => (
                            <span id="file-name" className={styles.file_box}>
                              <p> {data?.name}</p>
                              <button
                                className={styles.delete_file}
                                onClick={(e) =>
                                  handleScreenerdelete(e, data, index)
                                }
                              >
                                <GrClose size={18} />
                              </button>
                            </span>
                          ))}
                        </>
                      )}
                      {}
                    </div>
                  </div>
                </section>

                {/* device compatibility */}
                <div className={styles.topup_deviceCompatibility}>
                  <section className={styles.topUp}>
                    <Checkbox
                      id="topUp"
                      onChange={(e) => {
                        handlechange("topUp", e.target.value);
                      }}
                      checked={salesorder?.topUp}
                      label="Mark As Top-Up"
                    />

                    {/* <label for="topUp">Mark As Top-Up</label> */}
                  </section>

                  <section className={styles.device_compatibility}>
                    <div className={styles.img_text}>
                      <img src={device} alt="" />
                      <span>Device Compatibility</span>
                    </div>
                    {helperData?.devices?.map((res) => {
                      let array = [];
                      salesorder?.SalesOrderDevices?.map((device) => {
                        if (device?.deviceId === res?.value) {
                          array.push(device?.deviceId);
                        }
                      });

                      return (
                        <section className={styles.devices}>
                          <CheckBox
                            label={res?.label}
                            onChange={(e) => {
                              if (`/edit/${id}/update-salesorder`) {
                                console.log("here");
                                if (e.target.value) {
                                  setSalesorder((prev) => {
                                    // let deviceid;
                                    // deviceData?.map((res) => {
                                    //   return (deviceid = res?.id);
                                    // });
                                    return {
                                      ...prev,
                                      SalesOrderDevices: [
                                        ...(prev?.SalesOrderDevices
                                          ? prev?.SalesOrderDevices
                                          : []),
                                        {
                                          // id: deviceid,
                                          salesOrderId: Number(id),
                                          deviceId: res?.value,
                                        },
                                      ],
                                    };
                                  });
                                } else {
                                  setSalesorder((prev) => {
                                    let newData = prev;
                                    newData.SalesOrderDevices =
                                      newData.SalesOrderDevices?.filter(
                                        (d) => d?.deviceId !== array[0]
                                      );

                                    return { ...newData };
                                  });
                                }
                              } else {
                                if (e.target.value) {
                                  // console.log("chked");
                                  setSalesorder((prev) => {
                                    return {
                                      ...prev,
                                      SalesOrderDevices: [
                                        ...(prev?.SalesOrderDevices
                                          ? prev?.SalesOrderDevices
                                          : []),
                                        { deviceId: res?.value },
                                      ],
                                    };
                                  });
                                } else {
                                  setSalesorder((prev) => {
                                    let newData = prev;
                                    newData.SalesOrderDevices =
                                      newData.SalesOrderDevices?.filter(
                                        (d) => d?.deviceId !== array[0]
                                      );

                                    return { ...newData };
                                  });
                                }
                              }
                            }}
                            checked={array.includes(res?.value)}
                          />
                        </section>
                      );
                    })}
                  </section>
                </div>
              </section>

              <section className={styles.right_order_details}>
                <div className={styles.desc_text}>
                  <img src={description} alt="" />
                  <span>Description</span>
                </div>
                <div className={styles.suneditor}>
                  <SunEditor
                    onChange={(val) => handlechange("description", val)}
                    setContents={salesorder?.description}
                    setOptions={{
                      buttonList: [
                        [
                          "bold",
                          "underline",
                          "italic",
                          "strike",
                          "list",
                          "align",
                          "fontSize",
                          "formatBlock",
                          "table",
                          // "image",
                          "preview",
                        ],
                      ],
                    }}
                    height="150px"
                  />
                </div>
              </section>
            </div>

            {/* table */}

            <section className={styles.action_btns}>
              <section className={styles.importExcel}>
                <Button variant="filled" onClick={handleExportToExcel}>
                  Import From Excel
                </Button>
              </section>
            </section>
            <div className={styles.opportunity_table}>
              <table id="table-to-xls-DATA">
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Currency</th>
                    <th>Avg. LOI</th>
                    <th>IR(assumed)</th>
                    <th>Req Sample</th>
                    <th>Feasibility</th>
                    <th>CPI</th>
                    <th>Timeline</th>
                    <th>Total Budget</th>
                    <th></th>
                    <th style={{ width: "2%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {window.location.pathname ===
                    `/edit/${id}/update-salesorder` ? (
                      <>
                        {Object.keys(
                          salesorder?.countries ? salesorder?.countries : {}
                        )?.map((key) => {
                          return salesorder?.countries[key]?.map((res) => {
                            let data = res;

                            if (key === "UNGRP") {
                              return (
                                <React.Fragment key={data?.countryId}>
                                  <tr>
                                    <td>
                                      <Select
                                        options={helperData?.countries}
                                        isMulti
                                        onChange={(e) => {
                                          let body = e?.map((country) => ({
                                            countryId: country?.value,
                                          }));
                                          handleCountryRowChange(
                                            "salesOrderCountries",
                                            body,
                                            data?.countryId
                                          );
                                        }}
                                        value={helperData?.countries?.map(
                                          (res) => {
                                            if (
                                              res?.value === data?.countryId
                                            ) {
                                              return data?.countryId;
                                            }
                                          }
                                        )}
                                      />
                                    </td>
                                    <td className={styles.currency}>
                                      <select
                                        onChange={(e) =>
                                          handleCountryRowChange(
                                            "currencyId",
                                            parseInt(e.target.value),
                                            data?.countryId
                                          )
                                        }
                                        value={data?.currency?.currencyId}
                                      >
                                        <option disabled selected>
                                          select currency
                                        </option>
                                        {helperData?.currencies?.map(
                                          (currency) => {
                                            return (
                                              <option value={currency?.value}>
                                                {currency?.label}
                                              </option>
                                            );
                                          }
                                        )}
                                      </select>
                                    </td>
                                    <td>
                                      {" "}
                                      <div className={styles.field_group}>
                                        <input
                                          type="number"
                                          name="avgLoi"
                                          required
                                          value={data?.avgLoi}
                                          disabled={data?.disabledCountry}
                                          onChange={(e) => {
                                            handleCountryRowChange(
                                              "avgLoi",
                                              parseFloat(e.target.value),
                                              data?.countryUid
                                            );
                                          }}
                                        />{" "}
                                        <span>mins</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className={styles.field_group}>
                                        <input
                                          type="number"
                                          name="avgIr"
                                          required
                                          value={data?.avgIr}
                                          disabled={data?.disabledCountry}
                                          onChange={(e) => {
                                            handleCountryRowChange(
                                              "avgIr",
                                              parseFloat(e.target.value),
                                              data?.countryUid
                                            );
                                          }}
                                        />{" "}
                                        <span>%</span>
                                      </div>
                                    </td>
                                    <td>
                                      {" "}
                                      <div className={styles.field_group}>
                                        <input
                                          type="number"
                                          name="sampleRequiredSum"
                                          required
                                          value={data?.sampleRequiredSum}
                                          disabled={data?.disabledCountry}
                                          onChange={(e) => {
                                            handleCountryRowChange(
                                              "sampleRequiredSum",
                                              parseFloat(e.target.value),
                                              data?.countryUid
                                            );
                                          }}
                                        />{" "}
                                      </div>
                                    </td>
                                    <td>
                                      {" "}
                                      <div className={styles.field_group}>
                                        <input
                                          type="number"
                                          name="feasibilitySum"
                                          required
                                          value={data?.feasibilitySum}
                                          disabled={data?.disabledCountry}
                                          onChange={(e) => {
                                            handleCountryRowChange(
                                              "feasibilitySum",
                                              parseFloat(e.target.value),
                                              data?.countryUid
                                            );
                                          }}
                                        />{" "}
                                      </div>
                                    </td>
                                    <td>
                                      {" "}
                                      <div className={styles.field_group}>
                                        <input
                                          type="number"
                                          name="avgCpi"
                                          required
                                          value={data?.avgCpi}
                                          disabled={data?.disabledCountry}
                                          onChange={(e) => {
                                            handleCountryRowChange(
                                              "avgCpi",
                                              parseFloat(e.target.value),
                                              data?.countryUid
                                            );
                                          }}
                                        />{" "}
                                      </div>
                                    </td>
                                    <td>
                                      <div className={styles.field_group}>
                                        <input
                                          type="number"
                                          name="maxTimelinePerTg"
                                          required
                                          value={data?.maxTimelinePerTg}
                                          disabled={data?.disabledCountry}
                                          onChange={(e) => {
                                            handleCountryRowChange(
                                              "maxTimelinePerTg",
                                              parseFloat(e.target.value),
                                              data?.countryUid
                                            );
                                          }}
                                        />{" "}
                                        <span>days</span>
                                      </div>
                                    </td>
                                    <td>
                                      {" "}
                                      <span>
                                        {data?.totalBudgetSum}
                                        {helperData?.currencies?.map(
                                          (currency) => {
                                            if (
                                              currency?.value ===
                                              data?.currencyId
                                            ) {
                                              return (
                                                <span>
                                                  ({currency?.symbol})
                                                </span>
                                              );
                                            }
                                            return null;
                                          }
                                        )}
                                      </span>{" "}
                                    </td>
                                    <td>
                                      <button
                                        className={styles.add_target}
                                        onClick={(e) => addTg(data?.countryId)}
                                      >
                                        <BsPlus /> Add Target
                                      </button>
                                    </td>
                                    <td>
                                      <button className={styles.delete}>
                                        <MdOutlineDeleteOutline
                                          color="#1765dc"
                                          size={18}
                                          style={{ cursor: "pointer" }}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleDeleteCountry(
                                              data?.countryId
                                            );
                                          }}
                                        />
                                      </button>
                                    </td>
                                  </tr>
                                  <>
                                    {data?.tgs?.map((target) => {
                                      return (
                                        <tr
                                          className={styles.tgrow}
                                          key={target?.tgId}
                                        >
                                          <td></td>

                                          <td>
                                            <div
                                              className={
                                                styles.targetaudience_input
                                              }
                                            >
                                              <input
                                                type="text"
                                                name="tgTargetAudience"
                                                required
                                                value={target?.tgTargetAudience}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "tgTargetAudience",
                                                    e.target.value,
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                              {/* target description */}
                                              <button
                                                onClick={(e) =>
                                                  openTgDescModal(
                                                    e,
                                                    target?.tgId
                                                  )
                                                }
                                                className={styles.decBtn}
                                              >
                                                <MdOutlineAdd size={20} />
                                              </button>
                                              {showTgDesc == target?.tgId ? (
                                                <>
                                                  <div
                                                    className={
                                                      styles.tgDescContainer
                                                    }
                                                  >
                                                    <section>
                                                      <button
                                                        onClick={() =>
                                                          setShowTgDesc(
                                                            (prev) => !prev
                                                          )
                                                        }
                                                        className={
                                                          styles.closeBtn
                                                        }
                                                      >
                                                        <RiCloseLine />
                                                      </button>
                                                    </section>
                                                    <textarea
                                                      type="text"
                                                      name="tgDescription"
                                                      required
                                                      value={
                                                        target?.tgDescription
                                                      }
                                                      onChange={(e) => {
                                                        handleTgRowChange(
                                                          "tgDescription",
                                                          e.target.value,
                                                          data?.countryUid,
                                                          target?.tgId
                                                        );
                                                      }}
                                                      cols="30"
                                                      rows="10"
                                                    ></textarea>
                                                    <section
                                                      className={
                                                        styles.save_container
                                                      }
                                                    >
                                                      <button
                                                        onClick={() =>
                                                          setShowTgDesc(
                                                            (prev) => !prev
                                                          )
                                                        }
                                                        className={styles.save}
                                                      >
                                                        Save
                                                      </button>
                                                    </section>
                                                  </div>
                                                </>
                                              ) : null}
                                            </div>
                                          </td>
                                          <td>
                                            {" "}
                                            <div className={styles.field_group}>
                                              <input
                                                type="number"
                                                name="loi"
                                                required
                                                value={target?.loi}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "loi",
                                                    parseFloat(e.target.value),
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                              <span>mins</span>
                                            </div>
                                          </td>
                                          <td>
                                            <div className={styles.field_group}>
                                              <input
                                                type="number"
                                                name="ir"
                                                required
                                                value={target?.ir}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "ir",
                                                    parseFloat(e.target.value),
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                              <span>%</span>
                                            </div>
                                          </td>
                                          <td>
                                            {" "}
                                            <div className={styles.field_group}>
                                              <input
                                                type="number"
                                                name="requiredSample"
                                                required
                                                value={target?.requiredSample}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "requiredSample",
                                                    parseFloat(e.target.value),
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                            </div>
                                          </td>
                                          <td>
                                            {" "}
                                            <div className={styles.field_group}>
                                              <input
                                                type="number"
                                                name="feasibility"
                                                required
                                                value={target?.feasibility}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "feasibility",
                                                    parseFloat(e.target.value),
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                            </div>
                                          </td>
                                          <td>
                                            {" "}
                                            <div className={styles.field_group}>
                                              <input
                                                type="number"
                                                name="cpi"
                                                required
                                                value={target?.cpi}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "cpi",
                                                    parseFloat(e.target.value),
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                            </div>
                                          </td>
                                          <td>
                                            <div className={styles.field_group}>
                                              <input
                                                type="number"
                                                name="timeline"
                                                required
                                                value={target?.timeline}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "timeline",
                                                    parseFloat(e.target.value),
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                              <span>days</span>
                                            </div>
                                          </td>
                                          <td>
                                            {" "}
                                            <span>
                                              {target?.totalBudget}
                                            </span>{" "}
                                          </td>
                                          <td>
                                            <button
                                              className={styles.duplicate}
                                              onClick={() =>
                                                handleDuplicateTg(
                                                  data?.countryUid,
                                                  target
                                                )
                                              }
                                            >
                                              <BsPlus /> Duplicate
                                            </button>
                                          </td>

                                          <td>
                                            <button className={styles.delete}>
                                              <MdOutlineDeleteOutline
                                                color="#1765dc"
                                                size={18}
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  handleDeleteTg(
                                                    data?.countryUid,
                                                    target
                                                  )
                                                }
                                              />
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </>
                                </React.Fragment>
                              );
                            } else {
                              return (
                                <React.Fragment key={data?.countryId}>
                                  <tr>
                                    <td>
                                      <Select
                                        options={helperData?.countries}
                                        name="country"
                                        isMulti
                                        onChange={(e) => {
                                          let body = e?.map((country) => ({
                                            countryId: country?.value,
                                          }));
                                          handleCountryRowChange(
                                            "salesOrderCountries",
                                            body,
                                            data?.countryId
                                          );
                                        }}
                                        value={helperData?.countries?.map(
                                          (res) => {
                                            if (
                                              res?.value === data?.countryId
                                            ) {
                                              return data?.countryId;
                                            }
                                          }
                                        )}
                                      />
                                    </td>
                                    <td className={styles.currency}>
                                      <select
                                        name=""
                                        id=""
                                        onChange={(e) =>
                                          handleCountryRowChange(
                                            "currencyId",
                                            parseInt(e.target.value),
                                            data?.countryId
                                          )
                                        }
                                        value={data?.currency?.currencyId}
                                      >
                                        <option value="" disabled selected>
                                          select currency
                                        </option>
                                        {helperData?.currencies?.map(
                                          (currency) => {
                                            return (
                                              <option value={currency?.value}>
                                                {currency?.label}
                                              </option>
                                            );
                                          }
                                        )}
                                      </select>
                                    </td>
                                    <td>
                                      {" "}
                                      <div className={styles.field_group}>
                                        <input
                                          type="number"
                                          name="avgLoi"
                                          required
                                          value={data?.avgLoi}
                                          disabled={data?.disabledCountry}
                                          onChange={(e) => {
                                            handleCountryRowChange(
                                              "avgLoi",
                                              parseFloat(e.target.value),
                                              data?.countryId
                                            );
                                          }}
                                        />{" "}
                                        <span>mins</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className={styles.field_group}>
                                        <input
                                          type="number"
                                          name="avgIr"
                                          required
                                          value={data?.avgIr}
                                          disabled={data?.disabledCountry}
                                          onChange={(e) => {
                                            handleCountryRowChange(
                                              "avgIr",
                                              parseFloat(e.target.value),
                                              data?.countryUid
                                            );
                                          }}
                                        />{" "}
                                        <span>%</span>
                                      </div>
                                    </td>
                                    <td>
                                      {" "}
                                      <div className={styles.field_group}>
                                        <input
                                          type="number"
                                          name="sampleRequiredSum"
                                          required
                                          value={data?.sampleRequiredSum}
                                          disabled={data?.disabledCountry}
                                          onChange={(e) => {
                                            handleCountryRowChange(
                                              "sampleRequiredSum",
                                              parseFloat(e.target.value),
                                              data?.countryUid
                                            );
                                          }}
                                        />{" "}
                                      </div>
                                    </td>
                                    <td>
                                      {" "}
                                      <div className={styles.field_group}>
                                        <input
                                          type="number"
                                          name="feasibilitySum"
                                          required
                                          value={data?.feasibilitySum}
                                          disabled={data?.disabledCountry}
                                          onChange={(e) => {
                                            handleCountryRowChange(
                                              "feasibilitySum",
                                              parseFloat(e.target.value),
                                              data?.countryUid
                                            );
                                          }}
                                        />{" "}
                                      </div>
                                    </td>
                                    <td>
                                      {" "}
                                      <div className={styles.field_group}>
                                        <input
                                          type="number"
                                          name="avgCpi"
                                          required
                                          value={data?.avgCpi}
                                          disabled={data?.disabledCountry}
                                          onChange={(e) => {
                                            handleCountryRowChange(
                                              "avgCpi",
                                              parseFloat(e.target.value),
                                              data?.countryId
                                            );
                                          }}
                                        />{" "}
                                      </div>
                                    </td>
                                    <td>
                                      <div className={styles.field_group}>
                                        <input
                                          type="number"
                                          name="maxTimelinePerTg"
                                          required
                                          value={data?.maxTimelinePerTg}
                                          disabled={data?.disabledCountry}
                                          onChange={(e) => {
                                            handleCountryRowChange(
                                              "maxTimelinePerTg",
                                              parseFloat(e.target.value),
                                              data?.countryUid
                                            );
                                          }}
                                        />{" "}
                                        <span>days</span>
                                      </div>
                                    </td>
                                    <td>
                                      {" "}
                                      <span>
                                        {data?.totalBudgetSum}
                                        {helperData?.currencies?.map(
                                          (currency) => {
                                            if (
                                              currency?.value ===
                                              data?.currencyId
                                            ) {
                                              return (
                                                <span>
                                                  ({currency?.symbol})
                                                </span>
                                              );
                                            }
                                            return null;
                                          }
                                        )}
                                      </span>{" "}
                                    </td>
                                    <td>
                                      <button
                                        className={styles.add_target}
                                        onClick={(e) => addTg(data?.countryUid)}
                                      >
                                        <BsPlus /> Add Target
                                      </button>
                                    </td>
                                    <td>
                                      <button className={styles.delete}>
                                        <MdOutlineDeleteOutline
                                          color="#1765dc"
                                          size={18}
                                          style={{ cursor: "pointer" }}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleDeleteCountry(
                                              data?.countryId
                                            );
                                          }}
                                        />
                                      </button>
                                    </td>
                                  </tr>
                                  <>
                                    {data?.tgs?.map((target) => {
                                      return (
                                        <tr
                                          className={styles.tgrow}
                                          key={target?.tgId}
                                        >
                                          <td></td>

                                          <td>
                                            <div
                                              className={
                                                styles.targetaudience_input
                                              }
                                            >
                                              <input
                                                type="text"
                                                name="tgTargetAudience"
                                                required
                                                value={target?.tgTargetAudience}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "tgTargetAudience",
                                                    e.target.value,
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                              {/* target description */}
                                              <button
                                                onClick={(e) =>
                                                  openTgDescModal(
                                                    e,
                                                    target?.tgId
                                                  )
                                                }
                                                className={styles.decBtn}
                                              >
                                                <MdOutlineAdd size={20} />
                                              </button>
                                              {showTgDesc == target?.tgId ? (
                                                <>
                                                  <div
                                                    className={
                                                      styles.tgDescContainer
                                                    }
                                                  >
                                                    <section>
                                                      <button
                                                        onClick={() =>
                                                          setShowTgDesc(
                                                            (prev) => !prev
                                                          )
                                                        }
                                                        className={
                                                          styles.closeBtn
                                                        }
                                                      >
                                                        <RiCloseLine />
                                                      </button>
                                                    </section>
                                                    <textarea
                                                      type="text"
                                                      name="tgDescription"
                                                      required
                                                      value={
                                                        target?.tgDescription
                                                      }
                                                      onChange={(e) => {
                                                        handleTgRowChange(
                                                          "tgDescription",
                                                          e.target.value,
                                                          data?.countryUid,
                                                          target?.tgId
                                                        );
                                                      }}
                                                      cols="30"
                                                      rows="10"
                                                    ></textarea>
                                                    <section
                                                      className={
                                                        styles.save_container
                                                      }
                                                    >
                                                      <button
                                                        onClick={() =>
                                                          setShowTgDesc(
                                                            (prev) => !prev
                                                          )
                                                        }
                                                        className={styles.save}
                                                      >
                                                        Save
                                                      </button>
                                                    </section>
                                                  </div>
                                                </>
                                              ) : null}
                                            </div>
                                          </td>
                                          <td>
                                            {" "}
                                            <div className={styles.field_group}>
                                              <input
                                                type="number"
                                                name="loi"
                                                required
                                                value={target?.loi}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "loi",
                                                    parseFloat(e.target.value),
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                              <span>mins</span>
                                            </div>
                                          </td>
                                          <td>
                                            <div className={styles.field_group}>
                                              <input
                                                type="number"
                                                name="ir"
                                                required
                                                value={target?.ir}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "ir",
                                                    parseFloat(e.target.value),
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                              <span>%</span>
                                            </div>
                                          </td>
                                          <td>
                                            {" "}
                                            <div className={styles.field_group}>
                                              <input
                                                type="number"
                                                name="requiredSample"
                                                required
                                                value={target?.requiredSample}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "requiredSample",
                                                    parseFloat(e.target.value),
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                            </div>
                                          </td>
                                          <td>
                                            {" "}
                                            <div className={styles.field_group}>
                                              <input
                                                type="number"
                                                name="feasibility"
                                                required
                                                value={target?.feasibility}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "feasibility",
                                                    parseFloat(e.target.value),
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                            </div>
                                          </td>
                                          <td>
                                            {" "}
                                            <div className={styles.field_group}>
                                              <input
                                                type="number"
                                                name="cpi"
                                                required
                                                value={target?.cpi}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "cpi",
                                                    parseFloat(e.target.value),
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                            </div>
                                          </td>
                                          <td>
                                            <div className={styles.field_group}>
                                              <input
                                                type="number"
                                                name="timeline"
                                                required
                                                value={target?.timeline}
                                                onChange={(e) => {
                                                  handleTgRowChange(
                                                    "timeline",
                                                    parseFloat(e.target.value),
                                                    data?.countryUid,
                                                    target?.tgId
                                                  );
                                                }}
                                              />{" "}
                                              <span>days</span>
                                            </div>
                                          </td>
                                          <td>
                                            {" "}
                                            <span>
                                              {target?.totalBudget}
                                            </span>{" "}
                                          </td>
                                          <td>
                                            <button
                                              className={styles.duplicate}
                                              onClick={() =>
                                                handleDuplicateTg(
                                                  data?.countryUid,
                                                  target
                                                )
                                              }
                                            >
                                              <BsPlus /> Duplicate
                                            </button>
                                          </td>

                                          <td>
                                            <button className={styles.delete}>
                                              <MdOutlineDeleteOutline
                                                color="#1765dc"
                                                size={18}
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  handleDeleteTg(
                                                    data?.countryUid,
                                                    target
                                                  )
                                                }
                                              />
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </>
                                </React.Fragment>
                              );
                            }
                          });
                        })}
                      </>
                    ) : (
                      <>
                        {tableData?.map((data, i) => {
                          return (
                            <React.Fragment key={data?.countryUid}>
                              <tr>
                                <td>
                                  <Select
                                    options={helperData?.countries}
                                    name="country"
                                    isMulti
                                    onChange={(e) => {
                                      let body = e?.map((country) => ({
                                        countryId: country?.value,
                                      }));
                                      handleCountryRowChange(
                                        "salesOrderCountries",
                                        body,
                                        data?.countryUid
                                      );
                                    }}
                                  />
                                </td>
                                <td className={styles.currency}>
                                  <select
                                    name=""
                                    id=""
                                    onChange={(e) =>
                                      handleCountryRowChange(
                                        "currencyId",
                                        parseInt(e.target.value),
                                        data?.countryUid
                                      )
                                    }
                                  >
                                    <option value="" disabled selected>
                                      select currency
                                    </option>
                                    {helperData?.currencies?.map((currency) => {
                                      return (
                                        <option value={currency?.value}>
                                          {currency?.label}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </td>
                                <td>
                                  {" "}
                                  <div className={styles.field_group}>
                                    <input
                                      type="number"
                                      name="avgLoi"
                                      required
                                      value={data?.avgLoi}
                                      disabled={data?.disabledCountry}
                                      onChange={(e) => {
                                        handleCountryRowChange(
                                          "avgLoi",
                                          parseFloat(e.target.value),
                                          data?.countryUid
                                        );
                                      }}
                                    />{" "}
                                    <span>mins</span>
                                  </div>
                                </td>
                                <td>
                                  <div className={styles.field_group}>
                                    <input
                                      type="number"
                                      name="avgIr"
                                      required
                                      value={data?.avgIr}
                                      disabled={data?.disabledCountry}
                                      onChange={(e) => {
                                        handleCountryRowChange(
                                          "avgIr",
                                          parseFloat(e.target.value),
                                          data?.countryUid
                                        );
                                      }}
                                    />{" "}
                                    <span>%</span>
                                  </div>
                                </td>
                                <td>
                                  {" "}
                                  <div className={styles.field_group}>
                                    <input
                                      type="number"
                                      name="sampleRequiredSum"
                                      required
                                      value={data?.sampleRequiredSum}
                                      disabled={data?.disabledCountry}
                                      onChange={(e) => {
                                        handleCountryRowChange(
                                          "sampleRequiredSum",
                                          parseFloat(e.target.value),
                                          data?.countryUid
                                        );
                                      }}
                                    />{" "}
                                  </div>
                                </td>
                                <td>
                                  {" "}
                                  <div className={styles.field_group}>
                                    <input
                                      type="number"
                                      name="feasibilitySum"
                                      required
                                      value={data?.feasibilitySum}
                                      disabled={data?.disabledCountry}
                                      onChange={(e) => {
                                        handleCountryRowChange(
                                          "feasibilitySum",
                                          parseFloat(e.target.value),
                                          data?.countryUid
                                        );
                                      }}
                                    />{" "}
                                  </div>
                                </td>
                                <td>
                                  {" "}
                                  <div className={styles.field_group}>
                                    <input
                                      type="number"
                                      name="avgCpi"
                                      required
                                      value={data?.avgCpi}
                                      disabled={data?.disabledCountry}
                                      onChange={(e) => {
                                        handleCountryRowChange(
                                          "avgCpi",
                                          parseFloat(e.target.value),
                                          data?.countryUid
                                        );
                                      }}
                                    />{" "}
                                  </div>
                                </td>
                                <td>
                                  <div className={styles.field_group}>
                                    <input
                                      type="number"
                                      name="maxTimelinePerTg"
                                      required
                                      value={data?.maxTimelinePerTg}
                                      disabled={data?.disabledCountry}
                                      onChange={(e) => {
                                        handleCountryRowChange(
                                          "maxTimelinePerTg",
                                          parseFloat(e.target.value),
                                          data?.countryUid
                                        );
                                      }}
                                    />{" "}
                                    <span>days</span>
                                  </div>
                                </td>
                                <td>
                                  {" "}
                                  <span>
                                    {data?.totalBudgetSum}
                                    {helperData?.currencies?.map((currency) => {
                                      if (
                                        currency?.value === data?.currencyId
                                      ) {
                                        return (
                                          <span>({currency?.symbol})</span>
                                        );
                                      }
                                      return null;
                                    })}
                                  </span>{" "}
                                </td>
                                <td>
                                  <button
                                    className={styles.add_target}
                                    onClick={(e) => addTg(data?.countryUid)}
                                  >
                                    <BsPlus /> Add Target
                                  </button>
                                </td>
                                <td>
                                  <button className={styles.delete}>
                                    <MdOutlineDeleteOutline
                                      color="#1765dc"
                                      size={18}
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleDeleteCountry(data?.countryUid)
                                      }
                                    />
                                  </button>
                                </td>
                              </tr>
                              <>
                                {data?.tgs?.map((target) => {
                                  return (
                                    <tr
                                      className={styles.tgrow}
                                      key={target?.tgId}
                                    >
                                      <td></td>

                                      <td>
                                        <div
                                          className={
                                            styles.targetaudience_input
                                          }
                                        >
                                          <input
                                            type="text"
                                            name="tgTargetAudience"
                                            required
                                            value={target?.tgTargetAudience}
                                            onChange={(e) => {
                                              handleTgRowChange(
                                                "tgTargetAudience",
                                                e.target.value,
                                                data?.countryUid,
                                                target?.tgId
                                              );
                                            }}
                                          />{" "}
                                          {/* target description */}
                                          <button
                                            onClick={(e) =>
                                              openTgDescModal(e, target?.tgId)
                                            }
                                            className={styles.decBtn}
                                          >
                                            <MdOutlineAdd size={20} />
                                          </button>
                                          {showTgDesc == target?.tgId ? (
                                            <>
                                              <div
                                                className={
                                                  styles.tgDescContainer
                                                }
                                              >
                                                <section>
                                                  <button
                                                    onClick={() =>
                                                      setShowTgDesc(
                                                        (prev) => !prev
                                                      )
                                                    }
                                                    className={styles.closeBtn}
                                                  >
                                                    <RiCloseLine />
                                                  </button>
                                                </section>
                                                <textarea
                                                  type="text"
                                                  name="tgDescription"
                                                  required
                                                  value={target?.tgDescription}
                                                  onChange={(e) => {
                                                    handleTgRowChange(
                                                      "tgDescription",
                                                      e.target.value,
                                                      data?.countryUid,
                                                      target?.tgId
                                                    );
                                                  }}
                                                  cols="30"
                                                  rows="10"
                                                ></textarea>
                                                <section
                                                  className={
                                                    styles.save_container
                                                  }
                                                >
                                                  <button
                                                    onClick={() =>
                                                      setShowTgDesc(
                                                        (prev) => !prev
                                                      )
                                                    }
                                                    className={styles.save}
                                                  >
                                                    Save
                                                  </button>
                                                </section>
                                              </div>
                                            </>
                                          ) : null}
                                        </div>
                                      </td>
                                      <td>
                                        {" "}
                                        <div className={styles.field_group}>
                                          <input
                                            type="number"
                                            name="loi"
                                            required
                                            value={target?.loi}
                                            onChange={(e) => {
                                              handleTgRowChange(
                                                "loi",
                                                parseFloat(e.target.value),
                                                data?.countryUid,
                                                target?.tgId
                                              );
                                            }}
                                          />{" "}
                                          <span>mins</span>
                                        </div>
                                      </td>
                                      <td>
                                        <div className={styles.field_group}>
                                          <input
                                            type="number"
                                            name="ir"
                                            required
                                            value={target?.ir}
                                            onChange={(e) => {
                                              handleTgRowChange(
                                                "ir",
                                                parseFloat(e.target.value),
                                                data?.countryUid,
                                                target?.tgId
                                              );
                                            }}
                                          />{" "}
                                          <span>%</span>
                                        </div>
                                      </td>
                                      <td>
                                        {" "}
                                        <div className={styles.field_group}>
                                          <input
                                            type="number"
                                            name="requiredSample"
                                            required
                                            value={target?.requiredSample}
                                            onChange={(e) => {
                                              handleTgRowChange(
                                                "requiredSample",
                                                parseFloat(e.target.value),
                                                data?.countryUid,
                                                target?.tgId
                                              );
                                            }}
                                          />{" "}
                                        </div>
                                      </td>
                                      <td>
                                        {" "}
                                        <div className={styles.field_group}>
                                          <input
                                            type="number"
                                            name="feasibility"
                                            required
                                            value={target?.feasibility}
                                            onChange={(e) => {
                                              handleTgRowChange(
                                                "feasibility",
                                                parseFloat(e.target.value),
                                                data?.countryUid,
                                                target?.tgId
                                              );
                                            }}
                                          />{" "}
                                        </div>
                                      </td>
                                      <td>
                                        {" "}
                                        <div className={styles.field_group}>
                                          <input
                                            type="number"
                                            name="cpi"
                                            required
                                            value={target?.cpi}
                                            onChange={(e) => {
                                              handleTgRowChange(
                                                "cpi",
                                                parseFloat(e.target.value),
                                                data?.countryUid,
                                                target?.tgId
                                              );
                                            }}
                                          />{" "}
                                        </div>
                                      </td>
                                      <td>
                                        <div className={styles.field_group}>
                                          <input
                                            type="number"
                                            name="timeline"
                                            required
                                            value={target?.timeline}
                                            onChange={(e) => {
                                              handleTgRowChange(
                                                "timeline",
                                                parseFloat(e.target.value),
                                                data?.countryUid,
                                                target?.tgId
                                              );
                                            }}
                                          />{" "}
                                          <span>days</span>
                                        </div>
                                      </td>
                                      <td>
                                        {" "}
                                        <span>{target?.totalBudget}</span>{" "}
                                      </td>
                                      <td>
                                        <button
                                          className={styles.duplicate}
                                          onClick={() =>
                                            handleDuplicateTg(
                                              data?.countryUid,
                                              target
                                            )
                                          }
                                        >
                                          <BsPlus /> Duplicate
                                        </button>
                                      </td>

                                      <td>
                                        <button className={styles.delete}>
                                          <MdOutlineDeleteOutline
                                            color="#1765dc"
                                            size={18}
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              handleDeleteTg(
                                                data?.countryUid,
                                                target
                                              )
                                            }
                                          />
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </>
                            </React.Fragment>
                          );
                        })}
                      </>
                    )}
                  </>
                </tbody>
              </table>
            </div>

            <section className={styles.add_countries_btn}>
              <ButtonWithIcon
                variant="alternateIcon"
                className={styles.addCountry}
                onClick={(e) => addCountry(e)}
              >
                {<AiOutlinePlus />}Add Country
              </ButtonWithIcon>

              <ButtonWithIcon
                variant="alternateIcon"
                className={styles.addCountry}
                onClick={handleAddCountryWithTarget}
              >
                {<AiOutlinePlus />}Country with Target
              </ButtonWithIcon>
            </section>

            <section className={styles.create_order}>
              {window.location.pathname === `/edit/${id}/update-salesorder` ? (
                <Button variant="filled" onClick={handleUpdateOrder}>
                  Update Salesorder
                </Button>
              ) : (
                <Button variant="filled" onClick={handlesubmit}>
                  Create Order
                </Button>
              )}
            </section>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateOrder;
