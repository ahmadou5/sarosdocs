import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import { Code, Megaphone, Rocket, Bug } from "lucide-react";
import HeroCTACard from "../Cards";

type FeatureItem = {
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

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

function Feature({ Svg, description }: FeatureItem) {
  return (
    <div className={clsx("flex ")}>
      <div className="text--center w-[400px]">
        <Svg
          className={styles.featureSvg}
          role="img"
          width={600}
          height={120}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <div className={styles.featuresSub}>{description}</div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container bg-red-400">
        <div className="text--center"></div>
        <div className="bg-red-500 flex items-center m-auto mr-auto w-[90%]">
          <Feature
            Svg={require("@site/static/img/saros.svg").default}
            description="Developers Hub"
          />
        </div>
        <div className={styles.cardContainer}>
          {CTAList.map((props, idx) => (
            <HeroCTACard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
