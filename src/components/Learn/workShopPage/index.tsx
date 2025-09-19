import styles from "../learnPage/index.module.css";
import { useColorMode } from "@docusaurus/theme-common";
import { LearnCard } from "../learnCard";
import { YouTubePlayer } from "../VideoPlayer";
import CodeBlock from "../../CodeBlock";

interface workshop {
  id: string;
  title: string;
  category: string;
  tag: string[];
  highlights: Array<{
    label: string;
    description: string;
  }>;
  description: string;
  videoUrl: string;
  videoId: string;
  imageUrl: string;
  content: string;
}

interface WorkshopPageProps {
  workshops: workshop;
  navigate: () => void;
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

export const WorkShopPage: React.FC<WorkshopPageProps> = ({
  workshops,
  navigate,
}) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <YouTubePlayer videoUrl={workshops.videoUrl} title={workshops.title} />
        <div className={styles.blogGrid}>
          <div className={styles.cardDescription}>{workshops.description}</div>
        </div>
        <p className={styles.cardDescription}>{"Workshop Objectives:"}</p>
        <ul className={styles.highlights}>
          {workshops.highlights.map((highlight, highlightIndex) => (
            <li key={highlightIndex} className={styles.highlightItem}>
              <a className={styles.highlightLink}>{highlight.label}</a>:{" "}
              {highlight.description}
            </li>
          ))}
        </ul>
        <div className={styles.tagsContainer}>
          {workshops.tag.map((tag, tagIndex) => (
            <span key={tagIndex} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <button className={styles.readMoreBtn} onClick={navigate}>
          Back
        </button>
      </div>
    </div>
  );
};
