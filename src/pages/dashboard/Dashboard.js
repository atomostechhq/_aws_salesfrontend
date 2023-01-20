import axios from "axios";
import { useEffect } from "react";
import { SALES_BASE_URL } from "../../config";
import Header from "../../customComponents/header/Header";
import { languageData } from "../../utils/commonData";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  console.log(" dashboard");

  // useEffect(() => {
  //   languageData?.forEach((lan) => {
  //     axios
  //       .post(`${SALES_BASE_URL}/country/bulkCreateCountry/`)
  //       .then((res) => {

  //       });
  //   });
  // }, []);

  return (
    <>
      <Header />
      <div className={styles.dashboard_container}></div>
    </>
  );
};

export default Dashboard;
