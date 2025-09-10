import React from "react";
import styles from "./styles.module.css";

function Hero({ children }) {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroBackground} />
      <div className={styles.heroContent}>{children}</div>
    </div>
  );
}

export default Hero;
