import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { BiCaretDown } from "react-icons/bi";
import Chip from "../Chips/Chip";
import "./CollapseTable.css";

const collapseData = [
  {
    id: 1,
    level: "Crystal",
    supplierName: "Supp1",
    supplierNum: "#10000324",
    allocation: 328,
    avgCpi: 13,
    totalBudget: 900,
    allocationStatus: "Approved",
    emailSent: "Sent",
    countries: [
      {
        id: 111,
        level: "Gold",
        countryName: "japan",
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
  {
    id: 2,
    level: "Crystal",
    supplierName: "supp2",
    supplierNum: "#10000159",
    countries: [
      {
        id: 121,
        level: "Gold",
        countryName: "country3",
        tg: [
          {
            level: "Silver",
            targetGroupName: "tg1111",
          },
          {
            level: "Silver",
            targetGroupName: "tg2222",
          },
        ],
      },
      {
        id: 131,
        level: "Gold",
        countryName: "country4",
        tg: [
          {
            level: "Silver",
            targetGroupName: "tg3333",
          },
          {
            level: "Silver",
            targetGroupName: "tg4444",
          },
        ],
      },
      {
        id: 141,
        level: "Gold",
        countryName: "country3",
      },
    ],
  },
];

const CollapseTable = () => {
  const [open, setOpen] = useState([]);
  return (
    <>
      <div className="collapse_table">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>
                Supplier {">"} country {">"} Target audience
              </th>
              <th>Allocation</th>
              <th>Avg cpi</th>
              <th>Total Budget</th>
              <th>Allocation Status</th>
              <th>Email Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {collapseData?.map((data) => {
              let suppId = data?.id;
              return (
                <>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td
                      onClick={() => {
                        if (!open.includes(suppId)) {
                          setOpen((prevArr) => [...prevArr, suppId]);
                        } else {
                          setOpen((prevArr) => {
                            return prevArr.filter((id) => id !== suppId);
                          });
                        }
                      }}
                    >
                      <div className="flex">
                        <span className="icon">
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
                    <td>
                      <Chip variant="filled" color="success">
                        Approved
                      </Chip>
                    </td>
                    <td>
                      <Chip variant="outlined" color="success">
                        Sent
                      </Chip>
                    </td>
                    <td>
                      <TbEdit />
                    </td>
                  </tr>

                  {open.includes(suppId) && (
                    <>
                      {data?.countries?.map((country) => {
                        let countryId = country?.id;
                        if (!open.includes(countryId)) {
                          return (
                            <tr>
                              <td>
                                <input type="checkbox" />
                              </td>
                              <td
                                style={{ paddingLeft: "2em" }}
                                onClick={() =>
                                  setOpen((prevArr) => [...prevArr, countryId])
                                }
                              >
                                <div className="flex">
                                  <span className="icon">
                                    <BiCaretDown />
                                  </span>
                                  <span>{country?.countryName}</span>
                                </div>
                              </td>
                              <td>1455</td>
                              <td>20</td>
                              <td>900</td>
                              <td>
                                <Chip variant="filled" color="success">
                                  Approved
                                </Chip>
                              </td>
                              <td>
                                <Chip variant="outlined" color="success">
                                  Sent
                                </Chip>
                              </td>
                              <td>
                                <TbEdit />
                              </td>
                            </tr>
                          );
                        } else {
                          return (
                            <>
                              <tr>
                                <td>
                                  <input type="checkbox" />
                                </td>
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
                                  <div className="flex">
                                    <span className="icon">
                                      <BiCaretDown />
                                    </span>
                                    <span>{country?.countryName}</span>
                                  </div>
                                </td>
                                <td>1455</td>
                                <td>20</td>
                                <td>900</td>
                                <td>
                                  <Chip variant="filled" color="success">
                                    Approved
                                  </Chip>
                                </td>
                                <td>
                                  <Chip variant="outlined" color="success">
                                    Sent
                                  </Chip>
                                </td>
                                <td>
                                  <TbEdit />
                                </td>
                              </tr>
                              {country?.tg?.map((target) => {
                                return (
                                  <tr>
                                    <td>
                                      <input type="checkbox" />
                                    </td>
                                    <td style={{ paddingLeft: "3.5em" }}>
                                      {target?.targetGroupName}
                                    </td>
                                    <td>1455</td>
                                    <td>20</td>
                                    <td>900</td>
                                    <td>
                                      <Chip variant="filled" color="success">
                                        Approved
                                      </Chip>
                                    </td>
                                    <td>
                                      <Chip variant="outlined" color="success">
                                        Sent
                                      </Chip>
                                    </td>
                                    <td>
                                      <TbEdit />
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
    </>
  );
};

export default CollapseTable;
