import axios from "axios";
import { useEffect } from "react";
import { SALES_BASE_URL } from "../../config";
import Header from "../../customComponents/header/Header";
import { languageData } from "../../utils/commonData";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  console.log(" dashboard");

  useEffect(() => {
    // languageData?.forEach((lan) => {
    //   axios
    //     .get(`${SALES_BASE_URL}/country/getByCountryName/${lan?.country}`)
    //     .then((res) => {
    //       let body = [];
    //       lan?.languages?.forEach((lang) => {
    //         body.push({
    //           languageName: lang,
    //           countryId: res.data.countryId,
    //         });
    //       });
    //       axios.post(`${SALES_BASE_URL}/create/language`, body).then((res) => {
    //         console.log("languages added for country ", lan?.country);
    //       });
    //     });
    // });
  }, []);

  return (
    <>
      <Header />
      <div className={styles.dashboard_container}></div>
    </>
  );
};

export default Dashboard;
