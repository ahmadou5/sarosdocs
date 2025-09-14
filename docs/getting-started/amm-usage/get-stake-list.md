---
sidebar_position: 7
---

import CodeBlock from '@site/src/components/CodeBlock'
import PackageManagerTabs from '@site/src/components/PackageManager'

# 📜 Get Stake List

## Stake List

To fetch the **Stake** list all we need from the `@saros-finance/sdk` is :

<CodeBlock
filename="StakeList.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import sarosSdk from "@saros-finance/sdk";`} />

## SarosStakeService

We need to utilize the SarosStakeService that we got from the sarosSdk member we just imported

<CodeBlock
filename="StakeList.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`//using @saros-finance Saros Stake Services
const { SarosStakeService } = sarosSdk;`} />

## Usage

<CodeBlock
filename="StakeList.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`//Query all Staking on Saros
const handleFetchStakeList = async () => {
  try {
    const stakeResponse = await SarosStakeService.getListPool({
      page: 1,
      size: 2,
    });
    return stakeResponse;
  } catch (error) {
    if(error instanceOf Error) console.error(error)
    return []
  }
};`} />
