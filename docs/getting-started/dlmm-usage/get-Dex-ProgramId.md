---
sidebar_position: 7
---

import CodeBlock from '@site/src/components/CodeBlock'

# Get DEX ProgramId

## Dex ProgramId

A utility function implement to get the `DEX` (Decentralise Exchange) programID and we will need to import some functions from`@saros-finance/dlmm-sdk` which are:

<CodeBlock
filename="getDexProgramId.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import {
LiquidityBookServices,
MODE,
} from "@saros-finance/dlmm-sdk";`} />

## Configurations

After importing the related function now we need to initialize our Liquidity book service using mainnet or devnet mode.

<CodeBlock
filename="getDexProgramId.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const liquidityBookServices = new LiquidityBookServices({
  mode: MODE.MAINNET,
});`} />

## Usage

<CodeBlock
filename="getDexProgramId.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const getDexProgramId = async () => {
try {
const dexId = await liquidityBookService.getDexProgramId();
return dexId;
} catch (error) {
if (error instanceof Error) {
console.error(error.message);
}
}
}`} />
