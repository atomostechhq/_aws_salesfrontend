import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <div className={styles.loader_container}>
        <div className={styles.lds_ripple}>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
