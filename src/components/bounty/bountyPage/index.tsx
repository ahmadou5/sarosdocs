import styles from "../bountyPage/index.module.css";
import { useColorMode } from "@docusaurus/theme-common";
import { BountyCard } from "../bountyCard";
interface Author {
  name: string;
  initials: string;
  avatar?: string;
}

interface Bounty {
  id: string;
  title: string;
  description: string;
  date: string;
  authors: Author[];
  highlights: Array<{
    label: string;
    description: string;
    href?: string;
  }>;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  readMoreLink: string;
  isActive: boolean;
}

interface BountyPageProps {
  bounties: Bounty[];
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

export const BountyPage: React.FC<BountyPageProps> = ({ bounties }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <SarosLogo />
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Latest Bounties</h1>
        </header>

        <div className={styles.blogGrid}>
          {bounties.map((bounty, index) => (
            <BountyCard key={bounty.id} bounty={bounty} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
