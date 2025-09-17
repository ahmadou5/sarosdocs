import { useColorMode } from "@docusaurus/theme-common";
import styles from "./index.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { ReactNode } from "react";
import Layout from "@theme/Layout";
import Hero from "../../HeroComponent";
import { Bug, Code, Rocket } from "lucide-react";
import HeroCTACard from "../../Cards";

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
    title: "Bug Hunt",
    description: "Help Saros ship bulletproof SDKs for our upcoming hackathon",
    icon: Bug,
    to: "https://earn.superteam.fun/listing/saros-sdk-bug-hunt",
  },
  {
    title: "Dev Station",
    description: "Join the Saros Developers community on Telegram.",
    icon: Rocket,
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

export default function Header(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Hero>
      <SarosLogo />
      <p className={styles.tagline}>Hackathon</p>
      <p className={styles.tagline2}>Coming Soon!!</p>
    </Hero>
  );
}
