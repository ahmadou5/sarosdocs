import { useColorMode } from "@docusaurus/theme-common";
import styles from "../hackPage/index.module.css";

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

export const HackathonPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <SarosLogo />
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>BUIDL the BOLD</h1>
          <h1 className={styles.pageTitle}>The First Ever Saros Hackathon</h1>
        </header>

        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Coming Soon!!</h1>
        </div>
        <div
          style={{
            backgroundImage: `url(${
              require("@site/static/saros/banner7.png").default
            })`,
          }}
          className={styles.imageSection}
        ></div>
      </div>
    </div>
  );
};
