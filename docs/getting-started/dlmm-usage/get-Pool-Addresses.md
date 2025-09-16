---
sidebar_position: 9
---

import CodeBlock from '@site/src/components/CodeBlock'

# 📜 Get Pool Addresses

## Pool Address

A utility function implement to get the list of `Pool` Addresses on `Saros` liquidity layer, and we will need to import some functions from`@saros-finance/dlmm-sdk` which are:

<CodeBlock
filename="getPoolAddresses.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import {
LiquidityBookServices,
MODE,
} from "@saros-finance/dlmm-sdk";`} />

## Configurations

After importing the related function now we need to initialize our Liquidity book service using mainnet or devnet mode.

<CodeBlock
filename="getPoolAddresses.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const liquidityBookServices = new LiquidityBookServices({
  mode: MODE.MAINNET,
});`} />

## Usage

<CodeBlock
filename="getPoolAddresses.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const getPoolAddresses = async () => {
try {
const poolAddresses = await liquidityBookService.fetchPoolAddresses();
return poolAddresses;
} catch (error) {
if (error instanceof Error) {
console.error(error.message);
}
return [];
}
}`} />
