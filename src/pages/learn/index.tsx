import React, { useRef } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import { useColorMode } from "@docusaurus/theme-common";

function SarosLogo() {
  const { colorMode } = useColorMode();

  const logoSrc =
    colorMode === "dark"
      ? require("@site/static/img/whitesaros.png").default
      : require("@site/static/img/purplesaros.png").default;

  return (
    <div className={styles.logoContainer}>
      <img src={logoSrc} alt="Saros logo" />
    </div>
  );
}

export default function Learn() {
  const { siteConfig } = useDocusaurusContext();
  const formSectionRef = useRef(null);

  const scrollToForm = () => {
    formSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout
      title={`Learn`}
      description="Join Saros Hackathon aand build the future of the internet market capital"
    >
      <SarosLogo />
    </Layout>
  );
}
