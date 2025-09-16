---
sidebar_position: 3
---

import CodeBlock from '@site/src/components/CodeBlock'

# 💱 Create Pool

## Create Pool

To Create a `Pool` all we need to import from `@saros-finance/dlmm-sdk` are:

<CodeBlock
filename="createPool.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import {
  BIN_STEP_CONFIGS,
  LiquidityBookServices,
  MODE,
} from "@saros-finance/dlmm-sdk";
import {
  PublicKey,
  Transaction,
  Keypair,
  signTransaction,
} from "@solana/web3.js";`} />

## Create Pool configurations

Next we need to initialize our Liquidity book service using mainnet or devnet mode.

<CodeBlock
filename="createPool.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const liquidityBookServices = new LiquidityBookServices({
  mode: MODE.MAINNET,
});`} />

## Tokens and Pool configs

<CodeBlock
filename="createPool.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const userAddress = "Fke5jj8NMGGes1fyMysvfpi67BkBF5DiQPCQzoT6yCyj"; //user wallet

// Pool example on saros C98 to USDC
const USDC_TOKEN = {
id: "usd-coin",
mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
symbol: "usdc",
name: "USD Coin",
decimals: 6,
addressSPL: "FXRiEosEvHnpc3XZY1NS7an2PB1SunnYW1f5zppYhXb3",
};

const C98_TOKEN = {
id: "coin98",
mintAddress: "C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9",
symbol: "C98",
name: "Coin98",
decimals: 6,
addressSPL: "EKCdCBjfQ6t5FBfDC2zvmr27PgfVVZU37C8LUE4UenKb",
};

const POOL_PARAMS = {
address: "EwsqJeioGAXE5EdZHj1QvcuvqgVhJDp9729H5wjh28DD",
baseToken: C98_TOKEN,
quoteToken: USDC_TOKEN,
slippage: 0.5,
hook: "", // config for reward, adding later
};

//Devnet Tokens and Pool_Params
const WSOL_TOKEN_DEVNET = {
id: "wsol",
mintAddress: "So11111111111111111111111111111111111111112",
symbol: "WSOL",
name: "WSOL",
decimals: 9,
};

const SAROS_TOKEN_DEVNET = {
id: "saros",
mintAddress: "mntCAkd76nKSVTYxwu8qwQnhPcEE9JyEbgW6eEpwr1N",
symbol: "DEXV3-SAROS",
name: "Dex V3 Saros",
decimals: 6,
};

const POOL_PARAMS_DEVNET = {
address: "C8xWcMpzqetpxwLj7tJfSQ6J8Juh1wHFdT5KrkwdYPQB",
baseToken: SAROS_TOKEN_DEVNET,
quoteToken: SOL_TOKEN_DEVNET,
slippage: 0.5,
hook: "", // config for reward, adding later
};`} />

## Usage

<CodeBlock
filename="createPool.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const handleCreatePool = async () => {
try {
const connection = liquidityBookServices.connection;
const tokenX = C98_TOKEN;
const tokenY = USDC_TOKEN;
const binStep = BIN_STEP_CONFIGS[3].binStep; // Example bin step, you can choose from BIN_STEP_CONFIGS
const ratePrice = 1; // Example rate price, you can set it based on your requirements
const payer = new PublicKey(userAddress);

const { blockhash, lastValidBlockHeight } =
await connection!.getLatestBlockhash({
commitment: "confirmed",
});

const { tx } = await liquidityBookServices.createPairWithConfig({
tokenBase: {
mintAddress: tokenX.mintAddress,
decimal: tokenX.decimals
},
tokenQuote: {
mintAddress: tokenY.mintAddress,
decimal: tokenY.decimals
},
ratePrice,
binStep,
payer,
});
tx.recentBlockhash = blockhash;
tx.feePayer = payer;
const signedTx = await signTransaction(tx);

const txHash = await connection.sendRawTransaction(signedTx.serialize(), {
skipPreflight: true,
preflightCommitment: "confirmed"
});

    await connection.confirmTransaction({
      signature: txHash,
      blockhash,
      lastValidBlockHeight
    }, "finalized");

} catch (error) {
if(error instanceOf Error) console.error(error.message)
}

};`} />
