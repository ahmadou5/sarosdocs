import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { BlogPage } from "@site/src/components/blog/blogPage";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

interface Author {
  name: string;
  initials: string;
  avatar?: string;
}

interface BlogPost {
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
export default function Blog(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A quick start guide to Saros"
    >
      <BlogPage posts={samplePosts} />
    </Layout>
  );
}

const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "DLMM DEMO CHALLENGE",
    description:
      "Create working demo applications that showcase real-world usage and get a head start on our upcoming $100K hackathon, your submission could become the foundation for your winning hackathon project!",
    date: "October 15th, 2025",
    authors: [],
    highlights: [
      {
        label: "Multi-feature demo application",
        description: "showcasing practical use cases of Saros functionality",
      },
      {
        label: "Must use at least one Saros SDK",
        description:
          "with meaningful integration (DLMM SDKs strongly preferred)",
      },
      {
        label: "Live deployed application",
        description: "accessible via public URL",
      },
    ],
    tags: ["Developement"],
    imageUrl: require("@site/static/bounties/dlmmchallenge.png").default,
    imageAlt: "Saros",
    readMoreLink: "https://earn.superteam.fun/listing/dlmm-demo-challenge-1",
    isActive: true,
  },
  {
    id: "2",
    title: "SAROS VIDEO QUEST",
    description:
      "Create compelling short-form content that educates and inspires the Solana DeFi community about Saros. Help spread the word about next-generation liquidity solutions through engaging video content.",
    date: "October 16th, 2025",
    authors: [
      {
        name: "ahmad",
        initials: "shit",
      },
    ],
    highlights: [
      {
        label: "30–60 second video",
        description:
          "posted publicly on X (Twitter). Tag @saros_xyz in your post",
      },
      {
        label: "Language",
        description: "English preferred",
      },
      {
        label: "Factual accuracy",
        description: "with easy-to-follow explanations",
      },
      {
        label: "Saros branding",
        description: "mentioned verbally or displayed on-screen.",
      },
    ],
    tags: ["Content", "writers"],
    imageUrl: require("@site/static/bounties/sarosvideo.png").default,
    imageAlt: "Saros",
    readMoreLink: "https://earn.superteam.fun/listing/saros-video-quest-1",
    isActive: true,
  },
  {
    id: "3",
    title: "SAROS SDK GUIDE CHALLENGE",
    description:
      "Help create developer documentation that makes Saros SDKs a joy to build with. Ship guides that cut friction and fast-track hackathon builders from zero to shipping.",
    date: "September 23rd, 2025",
    authors: [],
    highlights: [
      {
        label: "A complete quick-start guide",
        description: "for at least one of Saros’ SDKs",
      },
      {
        label: "At least two step-by-step integration tutorials",
        description: "for common use cases (e.g., swap, liquidity, staking).",
      },
      {
        label: "At least three working code examples",
        description:
          "showcasing functionality from the SDK and tested on devnet or mainnet",
      },
      {
        label: "Documentation format",
        description:
          "in Markdown, Notion, or a hosted doc site with public access.",
      },
    ],
    tags: ["Developers", "Frontend"],
    imageUrl: require("@site/static/bounties/Banner2.png").default,
    imageAlt: "Saros",
    readMoreLink:
      "https://earn.superteam.fun/listing/saros-sdk-guide-challenge",
    isActive: false,
  },
  {
    id: "4",
    title: "SAROS SDK BUG HUNT",
    description:
      "Help Saros ship bulletproof SDKs for our upcoming hackathon. Find bugs now, and you'll enter the hackathon knowing the tools inside-out with production-tested confidence.",
    date: "September 23rd, 2025",
    authors: [],
    highlights: [
      {
        label: "Clear reproduction steps & expected vs. actual behavior",
        description:
          "detailed enough for us to replicate the issue without guessing.",
      },
      {
        label: "Severity classification",
        description: "mark the issue as Critical, Medium, or Minor.",
      },
      {
        label: "Logs, screenshots, or screen recordings",
        description: "show the bug happening in real time if possible.",
      },
      {
        label: "Suggested fix or diagnostic pointers",
        description: "if you have insight into the cause or a potential fix.",
      },
    ],
    tags: ["Developers"],
    imageUrl: require("@site/static/bounties/Banner5.png").default,
    imageAlt: "Saros",
    readMoreLink: "https://earn.superteam.fun/listing/saros-sdk-bug-hunt",
    isActive: false,
  },
];
