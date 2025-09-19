import React, { useEffect, useState } from "react";
import styles from "../learnCard/index.module.css";

// TypeScript interfaces

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

interface LearnCardProps {
  workshop: workshop;
  index: number;
  loadModule: (id: string) => void;
}

// BlogCard Component
export const LearnCard: React.FC<LearnCardProps> = ({
  workshop,
  index,
  loadModule,
}) => {
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
        style={{ backgroundImage: `url(${workshop.imageUrl})` }}
      >
        <div className={styles.imageOverlay} />

        {/* Author avatars */}
        <div className={styles.authorAvatars}>
          {<div className={styles.avatar}>{workshop.title}</div>}
        </div>

        {/* Date badge */}
        <div className={styles.dateBadge}>{`#${workshop.id}`}</div>
      </div>

      {/* Content Section - 2/3 height */}
      <div className={styles.contentSection}>
        <h2 className={styles.cardTitle}>{workshop.title}</h2>

        <p className={styles.cardDescription}>{workshop.description}</p>
        <ul className={styles.highlights}>
          {workshop.highlights.map((highlight, highlightIndex) => (
            <li key={highlightIndex} className={styles.highlightItem}>
              <a className={styles.highlightLink}>{highlight.label}</a>:{" "}
              {highlight.description}
            </li>
          ))}
        </ul>

        <div className={styles.tagsContainer}>
          {workshop.tag.map((tag, tagIndex) => (
            <span key={tagIndex} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => loadModule(workshop.id)}
          className={styles.readMoreBtn}
        >
          {"Learn"}
        </button>
      </div>
    </article>
  );
};
