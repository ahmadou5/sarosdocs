import React, { ReactElement, ReactNode, useState } from "react";
import styles from "./index.module.css";
import { Copy } from "lucide-react";

const Terminal = ({
  title = "Terminal",
  children,
  showCopy = true,
  command = "",
  output = "",
}: {
  title: string;
  children?: ReactNode;
  showCopy: boolean;
  command: string;
  output: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    //alert("Copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.terminalBlock}>
      <div className={styles.terminalHeader}>{title}</div>
      <div className={styles.terminalContent}>
        {showCopy && command && (
          <button className={styles.copyButton} onClick={handleCopy}>
            {copied ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
        )}
        {command && (
          <pre>
            <code>
              <span className={styles.terminalPrompt}>$ </span>
              <span className={styles.terminalCommand}>{command}</span>
            </code>
          </pre>
        )}
        {output && (
          <div className={styles.terminalOutput}>
            <pre>
              <code>{output}</code>
            </pre>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Terminal;
