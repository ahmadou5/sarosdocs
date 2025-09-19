import React, { useEffect, useRef, useState } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "../learn/index.module.css";
import { useColorMode } from "@docusaurus/theme-common";
import YouTubePlayerExample, {
  YouTubePlayer,
} from "@site/src/components/Learn/VideoPlayer";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { LearnPage } from "@site/src/components/Learn/learnPage";
import { WorkShopPage } from "@site/src/components/Learn/workShopPage";

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

const workshops: workshop[] = [
  {
    id: "001",
    title: "Intro to Saros SDK",
    category: "Workshop",
    tag: ["BUIDL the BOLD", "Hackathon", "Workshop"],
    highlights: [
      {
        label: "Intro to Saros DLMM",
        description: "Easily understand what is Saros DLMM and how to use it.",
      },
      {
        label: "Liquidity Distribution",
        description:
          "Understand how Liquidity distribution works and implement it in real time",
      },
      {
        label: "Bin",
        description: "Understand The Concept of bin.",
      },
      {
        label: "Pool Metadata",
        description:
          "Understand How to easily Pool Metadat from Saros DLMM whic include the tokens, prices and market info.",
      },
    ],
    description:
      "Follow on with Lido - Saros Ecosystem Lead, in this first workshop,Learn from how to get pool metadata to live market pricing, bins & liquidity distribution, and also learn how to build a Pool Distribution Viewer with Saros TypeScript SDK. Perfect first step to dive into DLMM & start BUIDLing on Saros.",
    videoUrl: "https://www.youtube.com/watch?fe&v=4gkEHqVbw4w&feature=youtu.be",
    videoId: "4gkEHqVbw4w",
    imageUrl: require("@site/static/bounties/learn1.jpeg").default,
    content: "This module covers advanced React concepts...",
  },
];

export default function Learn() {
  const { siteConfig } = useDocusaurusContext();
  const formSectionRef = useRef(null);
  const [moduleId, setModuleId] = useState(null);
  const [moduleData, setModuleData] = useState<workshop>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      // Extract module ID from URL hash or search params
      const urlParams = new URLSearchParams(window.location.search);
      const hashId = window.location.hash.replace("#", "");
      const searchId = urlParams.get("id");

      // Try to get ID from hash first, then search params, then path
      const id = hashId || searchId;

      if (id) {
        setModuleId(id);
        loadModuleData(id);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const loadModuleData = async (id: string) => {
    try {
      setLoading(true);
      setModuleId(id); // Set the module ID here

      const data = workshops.filter((workshop) => workshop.id === id);
      if (data.length > 0) {
        setModuleData(data[0]);
        if (ExecutionEnvironment.canUseDOM) {
          document.title = `${data[0].title} - Learn | ${siteConfig.title}`;
          window.history.replaceState(null, "", `/learn#${id}`);
        }
      }
    } catch (error) {
      console.error("Error loading module data:", error);
    } finally {
      setLoading(false);
    }
  };
  const scrollToForm = () => {
    formSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <Layout title="Loading..." description="Loading learning module...">
        <main className={styles.main}>
          <div>Loading...</div>
        </main>
      </Layout>
    );
  }

  if (!moduleId || !moduleData) {
    return (
      <Layout
        title="Learn"
        description="Choose a learning module to get started"
      >
        <LearnPage
          workshops={workshops}
          loadModule={(id) => {
            loadModuleData(id);
          }}
        />
      </Layout>
    );
  }

  return (
    <Layout
      title={`Learn`}
      description="Join Saros Hackathon aand build the future of the internet market capital"
    >
      <WorkShopPage
        workshops={moduleData}
        navigate={() => {
          setModuleData(null);
          window.history.replaceState(null, "", `/learn`);
        }}
      />
    </Layout>
  );
}
