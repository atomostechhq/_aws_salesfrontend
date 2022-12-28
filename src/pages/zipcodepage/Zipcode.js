import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SALES_BASE_URL } from "../../config";
import styles from "./zipcode.module.css";
import { DocumentViewer } from "react-documents";

const Zipcode = () => {
  const { id } = useParams();
  const [salesData, setSalesData] = useState({});
  useEffect(() => {
    axios
      .get(`${SALES_BASE_URL}/sales/get-salesorders/${id}`)
      .then((res) => {
        setSalesData(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let url = salesData?.screener;
  let newUrl = url?.split(/[#?]/)[0].split(".").pop().trim();
  // let urlType = newUrl[newUrl.length - 1];
  console.log(newUrl);

  const css = {
    width: "500px",
    height: "550px",
    borderRadius: "5px",
  };

  console.log(salesData);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {!salesData?.screener ? (
        <h1>Loading...............</h1>
      ) : newUrl === "pdf" ? (
        <DocumentViewer url={url}></DocumentViewer>
      ) : (
        <img src={url} style={css} />
      )}
    </div>
  );
};
export default Zipcode;
