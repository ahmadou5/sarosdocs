import React, { useRef } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Header from "@site/src/components/Hackathon/HackHeader";
import { useColorMode } from "@docusaurus/theme-common";
import { HackathonPage } from "@site/src/components/Hackathon/hackPage";

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

export default function Hackathon() {
  const { siteConfig } = useDocusaurusContext();
  const formSectionRef = useRef(null);

  const scrollToForm = () => {
    formSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout
      title={`Hackathon`}
      description="Join Saros Hackathon aand build the future of the internet market capital"
    >
      <HackathonPage />
    </Layout>
  );
}
