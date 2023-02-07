import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Chip from "../../components/Chips/Chip";
import Link from "../../components/Link/Link";
import Search from "../../components/Search/Search";
import Table, {
  TableActionPopUp,
  TableBody,
  TableHead,
  TableRow,
  TableWithPagination,
  Td,
  Th,
} from "../../components/Table/Table";
import TablePagination from "../../components/Table/TablePagination";
import Header from "../../customComponents/header/Header";
import styles from "./SalesOrder.module.css";
import { AiFillInfoCircle } from "react-icons/ai";
import ToolTip from "../../components/Tooltip/ToolTip";
import { TooltipTarget } from "../../components/Tooltip/Tooltip.style";
import Modal from "../../components/Modal/Modal";
import { ModalContent } from "../../components/Modal/Modal.style";
import Dropdown from "../../components/Dropdown/Dropdown";
import TabContext from "../../components/Tab/TabContext";
import { TabList } from "../../components/Tab/TabContext";
import { TabPanel } from "../../components/Tab/TabContext";
import { Tab } from "../../components/Tab/TabContext";
import axios from "axios";
import { supplierStatuses } from "../../utils/commonData";
import { useSearchParams } from "react-router-dom";
import { CLIENT_BASE_URL, SALES_BASE_URL } from "..//../config";
import { useSalesOrderContext } from "./SalesOrderContext";
import { useHelperDataContext } from "../../context/HelperDataContext";

const SalesOrder = () => {
  const [tabActive, setTabActive] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({});
  const { salesOrderData, handleFilterChange, params } = useSalesOrderContext();
  const { helperData } = useHelperDataContext();
  let Salesperson = [];

  console.log(filters);
  console.log(showModal);

  useEffect(() => {
    helperData?.salesManagers?.map((res) => {
      Salesperson.push({ label: res?.label, value: res?.value });
    });
  }, [Salesperson, helperData?.salesManagers]);

  console.log(helperData);
  console.log(salesOrderData);
  console.log(helperData);
  console.log(params);

  return (
    <>
      <Header />
      <div className={styles.project_order_container}>
        <div className={styles.project_intro_order}>
          <h1>Sales Orders</h1>
          <Link to="/create-order">
            <Button variant="filled">Create Order</Button>
          </Link>
        </div>

        <div className={styles.tabs}>
          <TabContext
            onChange={(value) => handleFilterChange("view", value)}
            value={params?.view}
            position="horizontal"
          >
            <div className={styles.tablistContainer}>
              <TabList>
                {supplierStatuses?.map((status) => {
                  return <Tab value={status?.value}>{status?.label}</Tab>;
                })}
              </TabList>
            </div>
            <TabPanel value={params?.view}>
              <div className={styles.table_with_filters}>
                <section className={styles.filters_container}>
                  <section className={styles.filters}>
                    <Dropdown
                      dropdownText={
                        filters?.salesperson
                          ? filters?.salesperson
                          : "select salesperson"
                      }
                      options={Salesperson}
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          salesperson: e?.value,
                        });
                      }}
                    />

                    <input
                      type="month"
                      className={styles.month_filter}
                      value={filters?.date}
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          date: e.target.value,
                        });
                      }}
                    />
                    <span
                      className={styles.clear_filters}
                      onClick={() => setFilters({ salesperson: "", date: "" })}
                    >
                      Clear Filters
                    </span>
                  </section>
                  <Search
                    placeholder="Search for ID, Project name, User"
                    value={params?.q}
                    onKeyUp={(e) => {
                      if (e.keyCode === 13) {
                        console.log(e);
                        handleFilterChange("q", e.target.value);
                      }
                    }}
                  />
                </section>
                <section className={styles.project_order_table}>
                  <TableActionPopUp selectedRows={selectedRows}>
                    <button className={styles.tableRowDelete}>Delete</button>
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
                                  setSelectedRows(salesOrderData);
                                } else setSelectedRows([]);
                              }}
                            />
                          </Th>
                          <Th>ID</Th>
                          <Th>Project Name</Th>
                          <Th>Acc Name</Th>
                          <Th>Status</Th>
                          <Th>Total Budget</Th>
                          <Th>LOI</Th>
                          <Th>IR</Th>
                          <Th>Feasibility</Th>
                          <Th>Sales Manager</Th>
                          <Th>Bidding Date</Th>
                          <Th>ST(Methodology)</Th>
                          <Th>Countries</Th>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {salesOrderData?.salesOrders
                          ?.filter((fsales) =>
                            !filters?.salesperson
                              ? fsales
                              : fsales?.salesManagerId == filters?.salesperson
                          )
                          ?.filter((datefilter) =>
                            !filters?.date
                              ? datefilter
                              : new Date(
                                  datefilter?.BiddingDate
                                )?.getMonth() ===
                                  new Date(filters?.date).getMonth() &&
                                new Date(datefilter?.BiddingDate)?.getYear() ===
                                  new Date(filters?.date).getYear()
                          )

                          ?.map((d, i) => {
                            return (
                              <TableRow key={i}>
                                <Td>
                                  <input
                                    type="checkbox"
                                    checked={
                                      selectedRows.filter(
                                        (r) => r.id === d.salesorder_id
                                      )[0]
                                    }
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedRows((prev) => [...prev, d]);
                                      } else
                                        setSelectedRows((prev) => {
                                          return prev.filter((pd) => {
                                            return pd.id !== d.salesorder_id;
                                          });
                                        });
                                    }}
                                  />
                                </Td>

                                <Td>
                                  <Link
                                    border="underline"
                                    color="black"
                                    to={`/sales-order/overview/${d.salesorder_id}`}
                                  >
                                    {d.salesorder_id}
                                  </Link>
                                </Td>

                                <Td>
                                  <div className={styles.flex}>
                                    {" "}
                                    <Link
                                      color="black"
                                      to={`/sales-order/overview/${d.salesorder_id}`}
                                    >
                                      {d?.projectName ? (
                                        <ToolTip
                                          content={d.projectName}
                                          position="top"
                                        >
                                          <section className={styles.projName}>
                                            <TooltipTarget>
                                              {d.projectName}
                                            </TooltipTarget>
                                          </section>
                                        </ToolTip>
                                      ) : (
                                        <span className={styles.noData}>
                                          -------
                                        </span>
                                      )}
                                    </Link>
                                    {d?.topUp ? (
                                      <ToolTip
                                        content="top-up order"
                                        position="top"
                                      >
                                        <span className={styles.info}>
                                          <TooltipTarget>
                                            <AiFillInfoCircle size={20} />
                                          </TooltipTarget>
                                        </span>
                                      </ToolTip>
                                    ) : null}
                                  </div>
                                </Td>
                                <Td>
                                  <section>
                                    {d?.clientId ? (
                                      <ToolTip
                                        content={helperData?.clients?.map(
                                          (res) => {
                                            if (res?.value == d?.clientId) {
                                              return res?.label;
                                            }
                                          }
                                        )}
                                        position="top"
                                      >
                                        <TooltipTarget>
                                          <span className={styles.accName}>
                                            {helperData?.clients?.map((res) => {
                                              if (res?.value == d?.clientId) {
                                                return res?.label;
                                              }
                                            })}
                                          </span>
                                        </TooltipTarget>
                                      </ToolTip>
                                    ) : (
                                      <span className={styles.noData}>
                                        -------
                                      </span>
                                    )}
                                  </section>
                                </Td>
                                <Td>
                                  {" "}
                                  {d.status ? (
                                    <Chip variant="filled" color="primary">
                                      {d.status}
                                    </Chip>
                                  ) : (
                                    <span className={styles.noData}>
                                      -------
                                    </span>
                                  )}
                                </Td>
                                <Td>
                                  $
                                  {d.totalBudgetSum ? (
                                    d.totalBudgetSum
                                  ) : (
                                    <span className={styles.noData}>
                                      -------
                                    </span>
                                  )}
                                </Td>
                                <Td>{d.avgLoi ? d?.avgLoi : "----"}</Td>
                                <Td>{d.avgIr ? d.avgIr : "----"}</Td>
                                <Td>
                                  {d.feasibilitySum ? (
                                    d?.feasibilitySum
                                  ) : (
                                    <span className={styles.noData}>
                                      -------
                                    </span>
                                  )}
                                </Td>
                                <Td>
                                  <section>
                                    {d?.salesManagerId ? (
                                      <ToolTip
                                        content={helperData?.salesManagers?.map(
                                          (res) => {
                                            if (
                                              res?.value == d?.salesManagerId
                                            ) {
                                              return res?.label;
                                            }
                                          }
                                        )}
                                        position="top"
                                      >
                                        <TooltipTarget>
                                          <span className={styles.accName}>
                                            {helperData?.salesManagers?.map(
                                              (res) => {
                                                if (
                                                  res?.value ==
                                                  d?.salesManagerId
                                                ) {
                                                  return res?.label;
                                                }
                                              }
                                            )}
                                          </span>
                                        </TooltipTarget>
                                      </ToolTip>
                                    ) : (
                                      <span className={styles.noData}>
                                        -------
                                      </span>
                                    )}
                                  </section>
                                </Td>

                                <Td>
                                  {d?.BiddingDate ? (
                                    new Date(
                                      d?.BiddingDate
                                    )?.toLocaleDateString("en-ca")
                                  ) : (
                                    <span className={styles.noData}>
                                      -------
                                    </span>
                                  )}
                                </Td>
                                <Td>
                                  {" "}
                                  <section>
                                    {d?.Methodology?.methodology ? (
                                      <ToolTip
                                        content={d?.Methodology?.methodology}
                                        position="top"
                                      >
                                        <TooltipTarget>
                                          <span className={styles.accName}>
                                            {d?.Methodology?.methodology}
                                          </span>
                                        </TooltipTarget>
                                      </ToolTip>
                                    ) : (
                                      <span className={styles.noData}>
                                        -------
                                      </span>
                                    )}
                                  </section>
                                </Td>
                                <Td>
                                  <div className={styles.countries}>
                                    {/* <p> NA, IND, US....</p> */}

                                    <p>
                                      {d.salesOrderCountryGroups?.map(
                                        (country) =>
                                          country?.salesOrderCountries?.map(
                                            (res) => {
                                              return (
                                                <span
                                                  className={styles.countryList}
                                                >
                                                  {res?.Country?.countryCode}
                                                </span>
                                              );
                                            }
                                          )
                                      )}
                                    </p>
                                    <span
                                      onClick={() => {
                                        openModal();
                                        setModalData(d);
                                      }}
                                      className={styles.view_all}
                                    >
                                      View All
                                    </span>
                                  </div>
                                </Td>
                              </TableRow>
                            );
                          })
                          .reverse()}
                      </TableBody>
                    </Table>
                    <TablePagination
                      // rowsPerPage={rowsPerPage}
                      // setRowsPerPage={setRowsPerPage}
                      // pageNumber={pageNumber}
                      // setPageNumber={setPageNumber}
                      itemsPerPageArray={[10, 15, 20]}
                      totalDataCnt={
                        salesOrderData?.count ? salesOrderData?.count : 0
                      }
                    />
                  </TableWithPagination>
                </section>

                {/* viewAll country model */}
                <Modal showModal={showModal} setShowModal={setShowModal}>
                  {[modalData]?.map((data) => (
                    <ModalContent>
                      <div className={styles.countries_modal}>
                        <section className={styles.project_details}>
                          <p>{data?.projectName}</p>
                          <span>{data?.salesorder_id}</span>
                        </section>

                        <div className={styles.country_container}>
                          <h2>Countries</h2>
                          <section className={styles.country_list}>
                            {data?.salesOrderCountryGroups?.map((res) => {
                              return res?.salesOrderCountries?.map(
                                (country) => {
                                  return (
                                    <span>{country?.Country?.countryName}</span>
                                  );
                                }
                              );
                            })}
                          </section>
                        </div>
                      </div>
                    </ModalContent>
                  ))}
                </Modal>
              </div>
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </>
  );
};

export default SalesOrder;
