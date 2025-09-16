---
sidebar_position: 8
---

import CodeBlock from '@site/src/components/CodeBlock'

# 📜 Get Pool Metadata

## Pool Metadata

A utility function implement to get the `Pool` Metadata which have all the detailed information we need anout a pool, and we will need to import some functions from`@saros-finance/dlmm-sdk` which are:

<CodeBlock
filename="getPoolMetadata.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import {
LiquidityBookServices,
MODE,
} from "@saros-finance/dlmm-sdk";`} />

## Configurations

After importing the related function now we need to initialize our Liquidity book service using mainnet or devnet mode.

<CodeBlock
filename="getPoolMetadata.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const liquidityBookServices = new LiquidityBookServices({
  mode: MODE.MAINNET,
});`} />

## Usage

<CodeBlock
filename="getPoolMetadata.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const getPoolMetadata = async (pair: string) => {
try {
const poolMetadata = await liquidityBookService.fetchPoolMetadata(
    pair
);
return poolMetadata;
} catch (error) {
if (error instanceof Error) {
console.error(error.message);
}
return {};
}
}`} />
