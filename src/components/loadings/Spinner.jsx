import React from "react";
// import styles from "./styles.module.css";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={`${styles.container}`}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Spinner;
