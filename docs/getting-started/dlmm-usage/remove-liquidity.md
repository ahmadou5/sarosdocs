---
sidebar_position: 5
---

import CodeBlock from '@site/src/components/CodeBlock'

# 🔓 Remove Liquidity

## Remove Liquidity

As we aim removing **Liquidity** we need some new Helper functions from the `@saros-finance/dlmm-sdk`:

<CodeBlock
filename="RemoveLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import {
  RemoveLiquidityType,
  PositionInfo,
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

## Remove Liquidity Configs

So now that we are almost ready lets configure the liquidity book service using our preffered network mainnet or devnet.

<CodeBlock
filename="RemoveLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const liquidityBookService = new LiquidityBookServices({
  mode: MODE.MAINNET,
});`} />

## Tokens and Pool configs

<CodeBlock
filename="RemoveLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`interface Token {
id: string;
mintAddress: string;
symbol: string;
name: string;
decimal: number;
addressSPL: string;
}
const userAddress = "Fke5jj8NMGGes1fyMysvfpi67BkBF5DiQPCQzoT6yCyj"; //user wallet

// Pool example on saros C98 to USDC
const USDC_TOKEN: Token = {
id: "usd-coin",
mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
symbol: "usdc",
name: "USD Coin",
decimals: 6,
addressSPL: "FXRiEosEvHnpc3XZY1NS7an2PB1SunnYW1f5zppYhXb3",
};

const C98_TOKEN: Token = {
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
const WSOL_TOKEN_DEVNET: Token = {
id: "wsol",
mintAddress: "So11111111111111111111111111111111111111112",
symbol: "WSOL",
name: "WSOL",
decimals: 9,
};

const SAROS_TOKEN_DEVNET: Token = {
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
filename="RemoveLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const removeLiquidity = async () => {
try {
const baseToken = C98_TOKEN;
const quoteToken = USDC_TOKEN;

        const payer = new PublicKey(userAddress);
        const pair = new PublicKey(POOL_PARAMS.address);
        const type = RemoveLiquidityType.BOTH;
        const connection = liquidityBookService.connection;

        if(!type) {
            throw new Error("Invalid Liquity Type")
        }

        const pairInfo = await liquidityBookService.getPairAccount(pair);
        const activeId = pairInfo.activeId;

        const range = [activeId - 3, activeId + 3] as [number, number];

        const userPositions = await liquidityBookService.getUserPositions({
            payer,
            pair
        });

        const positionList = userPositions.filter((item: PositionInfo) => {
            return !(item.upperBinId < range[0] || item.lowerBinId > range[1]);
        })

        if (!positionList.length) throw Error("No position found in this range");

        const maxPositionList = positionList.map((item: PositionInfo) => {
            const start = range[0] > item.lowerBinId ? range[0] : item.lowerBinId;
            const end = range[1] < item.upperBinId ? range[1] : item.upperBinId;

            return {
                position: item.position,
                start,
                end,
                positionMint: item.positionMint
            }
        });


        const { blockhash, lastValidBlockHeight } = await connection.    getLatestBlockhash({
          commitment: "confirmed",
        });

        const { txs, txCreateAccount, txCloseAccount } =
        await liquidityBookService.removeMultipleLiquidity({
          maxPositionList: maxPositionList,
          payer,
          type,
          pair: new PublicKey(pair),
          tokenMintX: new PublicKey(baseToken.mintAddress),
          tokenMintY: new PublicKey(quoteToken.mintAddress),
          activeId,
        });

        const allTxs = [...txs];

        if (txCreateAccount) {
          allTxs.unshift(txCreateAccount);
        }
        if (txCloseAccount) {
          allTxs.push(txCloseAccount);
        }

        allTxs.forEach((tx) => {
          tx.feePayer = payer;
          tx.recentBlockhash = blockhash;
        });

        return allTxs;
    } catch(error) {
        if(error instanceOf Error) console.error(error.message);
    }

}`} />
