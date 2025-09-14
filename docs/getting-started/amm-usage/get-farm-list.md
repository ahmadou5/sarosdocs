---
sidebar_position: 6
---

import CodeBlock from '@site/src/components/CodeBlock'
import PackageManagerTabs from '@site/src/components/PackageManager'

# 📜 Get Farm List

## Farm List

To fetch the **Farm** list all we need from the `@saros-finance/sdk` is :

<CodeBlock
filename="FarmList.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import sarosSdk from "@saros-finance/sdk";`} />

## SarosFarmService

We need to utilize the SarosFarmService that we got from the sarosSdk member we just imported

<CodeBlock
filename="FarmList.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`//using @saros-finance SarosFarm Services then we
const { SarosFarmService } = sarosSdk;`} />

## Usage

<CodeBlock
filename="FarmList.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`//Query all farms on Saros
const handleFetchFarmList = async () => {
  try {
    const farmResponse = await SarosFarmService.getListPool({
      page: 1,
      size: 2,
    });
    return farmResponse;
  } catch (error) {
    if(error instanceOf Error) console.error(error)
    return []
  }
};`} />
