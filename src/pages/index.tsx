import type { ReactNode } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Search from "@theme/SearchBar";
import styles from "./index.module.css";
import Hero from "../components/HeroComponent";
import {
  Bug,
  Code,
  Rocket,
  HandshakeIcon,
  BadgeDollarSign,
} from "lucide-react";
import HeroCTACard from "../components/Cards";

type CTA = {
  title: string;
  description: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  to: string;
};

const CTAList: CTA[] = [
  {
    title: "Docs",
    description: "Build Solana Dapps with our SDK and Dev Tools",
    icon: Code,
    to: "/docs/Overview",
  },
  {
    title: "Bounties",
    description: "Help Saros ship bulletproof SDKs for our upcoming hackathon",
    icon: BadgeDollarSign,
    to: "bounties",
  },
  {
    title: "Hackathon",
    description: "Announcing the $100K Saros Hackathon.",
    icon: Rocket,
    to: "hackathon",
  },
  {
    title: "Dev Station",
    description: "Join the Saros Developers community on Telegram.",
    icon: HandshakeIcon,
    to: "https://t.me/+DLLPYFzvTzJmNTJh",
  },
];

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
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A quick start guide to Saros"
    >
      <Hero>
        <SarosLogo />
        <p className={styles.tagline}>Developer Hub</p>
        <div className={styles.cardContainer}>
          {CTAList.map((props, idx) => (
            <HeroCTACard key={idx} {...props} />
          ))}
        </div>
      </Hero>
    </Layout>
  );
}
