import React, { useState } from "react";
import styles from "./index.module.css";
import Terminal from "../Terminal";

type PackageManagerKeys = "npm" | "yarn" | "pnpm" | "bun";
type PackageCommands = Partial<Record<PackageManagerKeys, string>>;

interface PackageManagerTabsProps {
  commands?: PackageCommands;
  title?: string;
  packageName?: string;
  description?: string;
  isDevServer: boolean;
}

const PackageManagerTabs: React.FC<PackageManagerTabsProps> = ({
  commands,
  title = "Terminal",
  packageName = "next@latest react@latest react-dom@latest",
  description = "To manually create a new Next.js app, install the required packages:",
  isDevServer = false,
}) => {
  // Generate default commands if none provided
  const defaultCommands: PackageCommands = {
    npm: `npm install ${packageName}`,
    yarn: `yarn add ${packageName}`,
    pnpm: `pnpm install ${packageName}`,
    bun: `bun add ${packageName}`,
  };

  const devServerCommands: PackageCommands = {
    npm: `npm run dev`,
    yarn: `yarn run dev`,
    pnpm: `pnpm run dev`,
    bun: `bun run dev`,
  };

  const finalCommands =
    commands || isDevServer ? devServerCommands : defaultCommands;
  const commandKeys = Object.keys(finalCommands) as PackageManagerKeys[];
  const [activeTab, setActiveTab] = useState<PackageManagerKeys>(
    commandKeys[0]
  );

  const managers: Record<PackageManagerKeys, string> = {
    npm: "npm",
    yarn: "yarn",
    pnpm: "pnpm",
    bun: "bun",
  };

  return (
    <div className={styles.installationWrapper}>
      <div className={styles.packageManagerTabs}>
        {Object.entries(finalCommands).map(([manager, command]) => {
          const managerKey = manager as PackageManagerKeys;
          return (
            <button
              key={manager}
              className={`${styles.packageTab} ${
                activeTab === manager ? styles.active : ""
              }`}
              onClick={() => setActiveTab(managerKey)}
            >
              {managers[managerKey]}
            </button>
          );
        })}
      </div>

      <Terminal
        title={title}
        command={finalCommands[activeTab] || ""}
        showCopy={true}
        output=""
      />
    </div>
  );
};

export default PackageManagerTabs;
