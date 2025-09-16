---
sidebar_position: 6
---

import CodeBlock from '@site/src/components/CodeBlock'

# 📜 Get DEX Name

## Dex Name

A utility function implement to get the `DEX` (Decentralise Exchange) name and we will need to import some functions from`@saros-finance/dlmm-sdk` which are:

<CodeBlock
filename="getDexName.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import {
LiquidityBookServices,
MODE,
} from "@saros-finance/dlmm-sdk";`} />

## Configurations

After importing the related function now we need to initialize our Liquidity book service using mainnet or devnet mode.

<CodeBlock
filename="getDexName.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const liquidityBookServices = new LiquidityBookServices({
  mode: MODE.MAINNET,
});`} />

## Usage

<CodeBlock
filename="getDexName.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const getDexName = async () => {
try {
const dexName = await liquidityBookService.getDexName();
return dexName;
} catch (error) {
if (error instanceof Error) {
console.error(error.message);
}
}
}`} />
