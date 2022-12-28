import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Header from "../../customComponents/header/Header";
import styles from "./Quotation.module.css";
import { SALES_BASE_URL } from "../../config";

const countriesData = [
  {
    countries: ["United Kingdom", "France", "Germany"],
    loi: 15,
    ir: 30,
    targetAudience: 30,
    overallSample: 100,
    feasibility: 30,
    timeline: 7,
    cpi: 10,
    totalCost: 300,
  },
  {
    countries: ["United Kingdom"],
    loi: 15,
    ir: 30,
    targetAudience: 30,
    overallSample: 100,
    feasibility: 30,
    timeline: 7,
    cpi: 10,
    totalCost: 300,
  },
  {
    countries: ["France"],
    loi: 15,
    ir: 30,
    targetAudience: 30,
    overallSample: 100,
    feasibility: 30,
    timeline: 7,
    cpi: 10,
    totalCost: 300,
  },
  {
    countries: ["Germany"],
    loi: 15,
    ir: 30,
    targetAudience: 30,
    overallSample: 100,
    feasibility: 30,
    timeline: 7,
    cpi: 10,
    totalCost: 300,
  },
];

const settingsQuestionData = [
  {
    questionHeader: "Quotas",
    questionBody: "Are there any quotas or profiling which we need to target ?",
  },
  {
    questionHeader: "Exclusion List",
    questionBody:
      "Is there an exclusion list or completes/terminates that you want to exclude from the survey ?",
  },
  {
    questionHeader: "Personal Identifiable Information",
    questionBody:
      "I am assuming there is no PII collection. Please confirm the same.",
  },
  {
    questionHeader: "Questionnaire Availability",
    questionBody:
      "Can you please share the screening criteria or questionnaire, if available ?",
  },
  {
    questionHeader: "Device Agnostic",
    questionBody:
      "I am assuming this survey is going to run on all devices (i.e. Desktop, Mobile, Tablet). Please confirm the same.",
  },
  {
    questionHeader: "Started Date",
    questionBody: "When would you like us to begin fielding the survey?",
  },
];

const Quotation = () => {
  const { id } = useParams();
  const [qoutationData, setQuotionData] = useState({});

  const getData = () => {
    axios
      .get(`${SALES_BASE_URL}/sales/get-salesorders/${id}`)
      .then((res) => {
        setQuotionData(res?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(qoutationData);

  let countrieskey = qoutationData?.countries
    ? Object.keys(qoutationData?.countries)[0]?.split("-")[1]
    : ["GRP-default"];
  console.log(countrieskey);

  return (
    <>
      <Header />
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
      <div className={styles.bidding_container}>
        <section className={styles.bidding_intro}>
          <h1>Bidding Quota</h1>
          <p className={styles.teamName}>
            Hi Market Cube (Schlesinger Group) Team,
          </p>
          <p>
            Thank you for sending your request to Mirats Insights and looping in
            our bids management team to get full coverage.
          </p>
          <p>
            Below is the quote from the study. Feel free to let me know if you
            need anything else.
          </p>
        </section>
        {/* countries table */}
        <section className={styles.countries_table}>
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>LOI(average)</th>
                <th>IR(assumed)</th>
                <th>Overall Sample</th>
                <th>Feasibility</th>
                <th>Timeline</th>
                <th>CPI</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {/* {Object.entries(qoutationData?.countries)?.map(([key, value]) => {
                return value?.map((values) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <span>{values?.countryName}</span>
                        </td>
                        <td>{values?.avgLoi} Mins</td>
                        <td>{values.avgIr} %</td>
                        <td>{values.sampleRequiredSum} Samples</td>
                        <td>{values.feasibilitySum} Samples</td>
                        <td>{values.maxTimelinePerTg} Days</td>
                        <td>$ {values.avgCpi}</td>
                        <td>$ {values.totalBudgetSum}</td>
                      </tr>
                    </>
                  );
                });
              })} */}
              {qoutationData?.countries?.UNGRP?.map((data) => (
                <tr>
                  <td>
                    <span>{data?.countryName}</span>
                  </td>
                  <td>{data.avgLoi} Mins</td>
                  <td>{data.avgIr} %</td>
                  <td>{data.sampleRequiredSum} Samples</td>
                  <td>{data.feasibilitySum} Samples</td>
                  <td>{data.maxTimelinePerTg} Days</td>
                  <td>$ {data.avgCpi}</td>
                  <td>$ {data.totalBudgetSum}</td>
                </tr>
              ))}
              {qoutationData?.countries?.[`GRP-${countrieskey}`]
                ?.filter((data, i) => {
                  return qoutationData?.countries?.[`GRP-${countrieskey}`]?.map(
                    (val) => {
                      return (
                        val.avgLoi &&
                        val.avgIr &&
                        val.feasibilitySum &&
                        val.sampleRequiredSum &&
                        val.maxTimelinePerTg &&
                        val.avgCpi &&
                        val.totalBudgetSum
                      );
                    }
                  );
                  /* .indexOf(
                        data.avgLoi &&
                          data.avgIr &&
                          data.feasibilitySum &&
                          data.sampleRequiredSum &&
                          data.maxTimelinePerTg &&
                          data.avgCpi &&
                          data.totalBudgetSum
                      ) == i */
                })
                ?.map((myData) => (
                  <>
                    <tr>
                      <td>
                        <span>{myData?.countryName}</span>
                      </td>
                      <td>{myData.avgLoi} Mins</td>
                      <td>{myData.avgIr} %</td>
                      <td>{myData.sampleRequiredSum} Samples</td>
                      <td>{myData.feasibilitySum} Samples</td>
                      <td>{myData.maxTimelinePerTg} Days</td>
                      <td>$ {myData.avgCpi}</td>
                      <td>$ {myData.totalBudgetSum}</td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </section>
        <p>
          Also, here is the summary of this quote which includes all the
          country's data.
        </p>

        <div className={styles.overview_stats}>
          <section className={styles.summary_table}>
            <div className={styles.summary_data}>
              <p>Total Budget</p>
              <p>$ {qoutationData?.totalBudgetSum}</p>
            </div>
            <div className={styles.summary_data}>
              <p>Timeline</p>
              <p>{qoutationData?.maxTimelinePerCountry} days</p>
            </div>
            <div className={styles.summary_data}>
              <p>CPI</p>
              <p>$ {qoutationData?.avgCpi}</p>
            </div>
            <div className={styles.summary_data}>
              <p>Feasibility</p>
              <p>{qoutationData?.feasibilitySum} samples</p>
            </div>
            <div className={styles.summary_data}>
              <p>Sample Required</p>
              <p>{qoutationData?.sampleRequiredSum} samples</p>
            </div>
            <div className={styles.summary_data}>
              <p>LOI</p>
              <p>{qoutationData?.avgLoi} mins</p>
            </div>
            <div className={styles.summary_data}>
              <p>IR</p>
              <p>{qoutationData?.avgIr} %</p>
            </div>
          </section>
          <section className={styles.overview_container}>
            <h1 className={styles.overview_text}>Overview</h1>
            <section className={styles.overview_content}>
              {qoutationData?.Overview}
            </section>
          </section>
        </div>

        <p>
          While we are in the initial stage of setting up, please confirm the
          following points so that we can best prepare for the successful
          delivery of this project.
        </p>

        <section className={styles.settings_questions}>
          {settingsQuestionData.map((data) => (
            <div className={styles.questions}>
              <p>{data.questionHeader}</p>
              <p>{data.questionBody}</p>
            </div>
          ))}
        </section>

        <p>Please see the below points and keep a note of them -</p>
        <section className={styles.points_list}>
          <ul>
            <li>
              If the Length of Interview (LOl) and the Incidence Rate (IR)
              change by more than 25 percent during the project, this may affect
              the Cost Per Interview (CPI). According to the rate card, a new
              CPI resulting from a change will be based on both the Actual LOl
              and Actual IR. For example, if the Actual IR changes by more than
              25 %, this will cause a reprice. The new CPI will be based on the
              Actual IR of 5 % and Actual LOl of 9 min.
            </li>
            <li>
              We expect our IDs within two weeks from the date of closing the
              fieldwork.
            </li>
            <li>
              Rejects based on Nonsensical responses can be reconciled at the
              end of the field, provided you can provide us with the complete
              questionnaire of the study, as well as each rejected participant's
              exclusive participation data if rejected IDs are more than 10%, if
              not we will invoice for all completes registered at our end.
            </li>
            <li>
              Once the study link is closed, any erroneous data should be
              communicated to us within four days. Otherwise, all interviews
              will be considered correct, and complete project management and
              incentives will be charged.
            </li>
            <li>
              If you want us to bill to your India office then please note that
              the CPI and Cost is exclusive of GST. If you want us to bid
              inclusive all costs and taxes then please email
              jamesbond@miratsinsights.com with Subject line "Quotation CPI
              Inclusive Taxes Request - [Your Company Name]".
            </li>
            <li>
              We are counting Quotafulls, Drops (At clients end) and Terminates
              while calculating Incidence Rate. Please inform us if you have
              your own IR formulae.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default Quotation;
