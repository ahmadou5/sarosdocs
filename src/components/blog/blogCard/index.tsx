import React, { useEffect, useState } from "react";
import styles from "../blogCard/index.module.css";

// TypeScript interfaces
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

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

interface BlogPageProps {
  posts: BlogPost[];
}

// BlogCard Component
export const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <article
      className={`${styles.blogCard} ${isVisible ? styles.visible : ""}`}
    >
      {/* Gradient top bar */}
      <div className={styles.gradientBar} />

      {/* Image Section - 1/3 height */}
      <div
        className={styles.imageSection}
        style={{ backgroundImage: `url(${post.imageUrl})` }}
      >
        <div className={styles.imageOverlay} />

        {/* Author avatars */}
        <div className={styles.authorAvatars}>
          {
            <div className={styles.avatar}>
              {post.isActive ? "Active" : "Finished"}
            </div>
          }
        </div>

        {/* Date badge */}
        <div className={styles.dateBadge}>{post.date}</div>
      </div>

      {/* Content Section - 2/3 height */}
      <div className={styles.contentSection}>
        <h2 className={styles.cardTitle}>{post.title}</h2>

        <p className={styles.cardDescription}>{post.description}</p>

        <ul className={styles.highlights}>
          {post.highlights.map((highlight, highlightIndex) => (
            <li key={highlightIndex} className={styles.highlightItem}>
              <a href={highlight.href || "#"} className={styles.highlightLink}>
                {highlight.label}
              </a>
              : {highlight.description}
            </li>
          ))}
        </ul>

        <div className={styles.tagsContainer}>
          {post.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <a href={post.readMoreLink} className={styles.readMoreBtn}>
          {post.isActive ? "Participate" : "View Winners"}
        </a>
      </div>
    </article>
  );
};
