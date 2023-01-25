// import loader from "../loader.svg";
// import logo from "../miratsLogo.png";

// import loading from "../../assets/loader.svg";
import logo from "../miratsLogo.png";
import styles from "./SurveyFetchLoader.module.css";

const SurveyFetchLoader = () => {
  return (
    <>
      <div className={styles.page_container}>
        <div className={styles.img_container}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.loader_container}>
          <section>
            <p>Please wait while we</p>
            <p>fetch your survey</p>
          </section>
          {/* <img src={loading} alt="" /> */}
        </div>
      </div>
    </>
  );
};

export default SurveyFetchLoader;
