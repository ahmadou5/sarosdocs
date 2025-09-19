import styles from "../learnPage/index.module.css";
import { useColorMode } from "@docusaurus/theme-common";
import { LearnCard } from "../learnCard";

interface workshop {
  id: string;
  title: string;
  highlights: Array<{
    label: string;
    description: string;
  }>;
  tag: string[];
  description: string;
  videoUrl: string;
  videoId: string;
  imageUrl: string;
  content: string;
}

interface BountyPageProps {
  workshops: workshop[];
  loadModule: (id: string) => void;
}
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

export const LearnPage: React.FC<BountyPageProps> = ({
  workshops,
  loadModule,
}) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <SarosLogo />
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>
            UpSkill for the Upcoming Hackathon.
          </h1>
        </header>

        <div className={styles.blogGrid}>
          {workshops.map((workshop, index) => (
            <LearnCard
              key={workshop.id}
              workshop={workshop}
              index={index}
              loadModule={loadModule}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
