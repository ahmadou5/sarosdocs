import { BlogCard } from "@site/src/components/blog/blogCard";
import styles from "../blogPage/index.module.css";
import { useColorMode } from "@docusaurus/theme-common";
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

interface BlogPageProps {
  posts: BlogPost[];
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

export const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <SarosLogo />
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Latest Bounties</h1>
        </header>

        <div className={styles.blogGrid}>
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
