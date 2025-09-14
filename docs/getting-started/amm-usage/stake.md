---
sidebar_position: 8
---

import CodeBlock from '@site/src/components/CodeBlock'
import PackageManagerTabs from '@site/src/components/PackageManager'

# 🌱 Stake

## Stake

To **Stake** your token on `Saros Staking Pool` we need some functions from the `@saros-finance/sdk`:

<CodeBlock
filename="Stake.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import sarosSdk, { genConnectionSolana } from "@saros-finance/sdk";
import { PublicKey, clusterApiUrl, Connection } from "@solana/web3.js";`} />

## BigNumber Support

Also we will be needing `BN` Module which is installed by the command :

<PackageManagerTabs title="Terminal" packageName='bn.js' />

After Successfully adding `BN` Module, then we can now use it on our Code like :

<CodeBlock
filename="Stake.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import BN from "bn.js";`} />

## Connection

Then we need a Connection to the Solana Cluster(network). we can use the saros-finanace `genConnectionSolana` helper function or use the solana `Connection` Class

<CodeBlock
filename="Stake.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`//using @saros-finance genConnectionSolana function
const connection = genConnectionSolana();

//using @solana/web3.js Connection
const connection = new Connection(clusterApiUrl.mainnet, "confirmed");`} />

## SarosFarmService

We need to utilize the SarosFarmService that we got from the sarosSdk member we just imported

<CodeBlock
filename="Stake.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`//using @saros-finance Saros Farm Services
const { SarosFarmService } = sarosSdk;`} />

## Stake Configs

So now that we are almost ready lets configure some of the configurations we are going to use.

<CodeBlock
filename="Stake.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`//Farm Program ID
const SAROS_FARM_ADDRESS = new PublicKey(
"SFarmWM5wLFNEw1q5ofqL7CrwBMwdcqQgK6oQuoBGZJ"
);

const userAccount = "5UrM9csUEDBeBqMZTuuZyHRNhbRW4vQ1MgKJDrKU1U2v"; // owner address

const payerAccount = { publicKey: new PublicKey(userAccount) };

const farmList = [
{
lpAddress: "HVUeNVH93PAFwJ67ENJwPWFU9cWcM57HEAmkFLFTcZkj",
poolAddress: "FW9hgAiUsFYpqjHaGCGw4nAvejz4tAp9qU7kFpYr1fQZ",
poolLpAddress: "2wUvdZA8ZsY714Y5wUL9fkFmupJGGwzui2N74zqJWgty",
rewards: [
{
address: "C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9",
poolRewardAddress: "AC3FyChJwuU7EY9h4BqzjcN8CtGD7YRrAbeRdjcqe1AW",
rewardPerBlock: 6600000,
rewardTokenAccount: "F6aHSR3ChwCXD67wrX2ZBHMkmmU9Gfm9QQmiTBrKvsmJ",
id: "coin98",
},
],
token0: "C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9",
token1: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
token0Id: "coin98",
token1Id: "usd-coin",
},
];`} />

## Usage

<CodeBlock
filename="Stake.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const handleStakePool = async () => {
  try {
    const txnHash = await SarosFarmService.stakePool(
      connection,
      payerAccount,
      new PublicKey(farmList[0].poolAddress),
      new BN(1000),
      SAROS_FARM_ADDRESS,
      farmList[0].rewards,
      new PublicKey(farmList[0].lpAddress)
    );
    return txnHash;
  } catch (error) {
    if(error instanceOf Error) console.error(error.message)
  }
};`} />
