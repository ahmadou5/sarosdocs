---
sidebar_position: 4
---

import CodeBlock from '@site/src/components/CodeBlock'
import PackageManagerTabs from '@site/src/components/PackageManager'

# 🔒 Add Liquidity

## Add Liquidity

When adding **Liquidity** we need some new Helper functions from the `@saros-finance/dlmm-sdk` so lets go and get them:

<CodeBlock
filename="AddLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import {
  LiquidityShape,
  createUniformDistribution,
  getMaxPosition,
  getMaxBinArray,
  getBinArray,
  getBinRange,
  findPosition,
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

## BigDecimal Support

Also we will be needing `js-big-decimal` Module which is installed by the command :

<PackageManagerTabs title="Terminal" packageName='js-big-decimal' />

After Successfully adding `js-big-decimal` Module, then we can now use it on our Code like :

<CodeBlock
filename="AddLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import bigDecimal from "js-big-decimal";`} />

## Utility Function

A utility function to convert our Balance Value to bigDecimal

<CodeBlock
filename="AddLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`convertBalanceToWei = (strValue: number, iDecimal: number = 9) => {
if (strValue === 0) return 0;

    try {
      const multiplyNum = new bigDecimal(Math.pow(10, iDecimal));
      const convertValue = new bigDecimal(Number(strValue));
      const result = multiplyNum.multiply(convertValue);
      return result.getValue();
    } catch {
      return 0;
    }

};`} />

## Add Liquidity Configs

So now that we are almost ready lets configure the liquidity book service using our preffered network mainnet or devnet.

<CodeBlock
filename="AddLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const liquidityBookService = new LiquidityBookServices({
  mode: MODE.MAINNET,
});`} />

## Tokens and Pool configs

<CodeBlock
filename="AddLiquidity.tsx"
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
filename="AddLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const addLiquidity = async () => {
try {
const baseToken = C98_TOKEN;
const quoteToken = USDC_TOKEN;

        const payer = new PublicKey(userAddress);
        const pair = new PublicKey(POOL_PARAMS.address);
        const shape = LiquidityShape.Spot;
        const binRange = [-10, 10] as [number, number];

        const userPositions = await liquidityBookService.getUserPositions({
            payer,
            pair
        });
        const pairInfo = await liquidityBookService.getPairAccount(pair);
        const activeBin = pairInfo.activeId;

        const connection = liquidityBookService.connection;

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

        let currentBlockhash = blockhash;
        let currentLastBlockhash = lastValidBlockHeight;

        const maxPositionList = getMaxPosition(
        [binRange[0], binRange[1]],
        activeBin
        );

        const maxLiqDistribution = createUniformDistribution({
        shape,
        binRange,
        });

        const binArrayList = getMaxBinArray(binRange, activeBin);

        const allTxs: Transaction[] = [];
        const txsCreatePosition: Transaction[] = [];
        const initialTransaction = new Transaction();

        await Promise.all(
          binArrayList.map(async (item) => {
            await this.liquidityBookService.getBinArray({
              binArrayIndex: item.binArrayLowerIndex,
              pair: pair,
              payer: payer,
              transaction: initialTransaction,
            });

            await this.liquidityBookService.getBinArray({
              binArrayIndex: item.binArrayUpperIndex,
              pair: pair,
              payer,
              transaction: initialTransaction,
            });
          })
        );

        await Promise.all(
          [baseToken, quoteToken].map(async (token) => {
            await this.liquidityBookService.getPairVaultInfo({
              payer,
              transaction: initialTransaction,
              tokenAddress: new PublicKey(token.mintAddress),
              pair: pair,
            });
            await this.liquidityBookService.getUserVaultInfo({
              payer,
              tokenAddress: new PublicKey(token.mintAddress),
              transaction: initialTransaction,
            });
          })
        );

        if (initialTransaction.instructions.length > 0) {
          initialTransaction.recentBlockhash = currentBlockhash;
          initialTransaction.feePayer = payer;
          allTxs.push(initialTransaction);
        };

        const maxLiquidityDistribution = await Promise.all(
            maxPositionList.map(async (item) => {
                const { range: relativeBinRange, binLower, binUpper } = getBinRange(item, activeBin);
                const currentPosition = userPosition.find(findPosition(item, activeBin));
                const findStartIndex = maxLiqDistribution.findIndex(
                  (item) => item.relativeBinId === relativeBinRange[0]
                );
                const startIndex = findStartIndex === -1 ? 0 : findStartIndex;
                const findEndIndex = maxLiqDistribution.findIndex(
                  (item) => item.relativeBinId === relativeBinRange[1]
                );
                const endIndex =
                 findEndIndex === -1 ? maxLiqDistribution.length : findEndIndex +      1;

                const liquidityDistribution = maxLiqDistribution.slice(
                  startIndex,
                  endIndex
                );
                const binArray = binArrayList.find(
                 (item) =>
                    item.binArrayLowerIndex * 256 <= binLower &&
                    (item.binArrayUpperIndex + 1) * 256 > binUpper
                );

                const binArrayLower = await this.liquidityBookService.      getBinArray({
                  binArrayIndex: binArray?.binArrayLowerIndex || 0,
                  pair: pair,
                  payer: payer,
                });

                const binArrayUpper = await this.liquidityBookService.getBinArray({
                  binArrayIndex: binArray?.binArrayUpperIndex || 0,
                  pair: pair,
                  payer: payer,
                });

                if (!currentPosition) {
                    const transaction = new Transaction();

                    const positionMint = Keypair.generate();

                    const { position } = await liquidityBookService.createPosition({
                        pair: pair,
                        payer: payer,
                        relativeBinIdLeft: relativeBinRange[0],
                        relativeBinIdRight: relativeBinRange[1],
                        binArrayIndex: binArray?.binArrayLowerIndex || 0,
                        positionMint: positionMint.publicKey,
                        transaction: transaction
                    });
                    transaction.feePayer = payer;
                    transaction.recentBlockhash = currentBlockhash;

                    transaction.sign(positionMint);

                    txsCreatePosition.push(transaction);
                    allTxs.push(transaction);
                    return {
                      positionMint: positionMint.publicKey.toString(),
                      position,
                      liquidityDistribution,
                      binArrayLower: binArrayLower.toString(),
                      binArrayUpper: binArrayUpper.toString(),
                    };
                }
                return {
                  positionMint: currentPosition.positionMint,
                  liquidityDistribution,
                  binArrayLower: binArrayLower.toString(),
                  binArrayUpper: binArrayUpper.toString(),
                };
            })
        );
        const AddLiquidityTx = await Promise.all(
            maxLiquidityDistribution.map(async(item) => {
                const { binArrayLower, binArrayUpper, liquidityDistribution, positionMint } = item;

                const transaction = new Transaction();
                await liquidityBookService.addLiquidityIntoPosition({
                    amountX: Number(
                        convertBalanceToWei(1000, baseToken.decimal);
                    ),
                    amountY: Number(
                        convertBalanceToWei(1000, quoteToken.decimal);
                    ),
                    binArrayLower: new PublicKey(binArrayLower),
                    binArrayUpper: new PublicKey(binArrayUpper),
                    liquidityDistribution,
                    pair: pair,
                    positionMint: new PublicKey(positionMint),
                    payer: payer,
                    transaction: transaction,
                })
                transaction.recentBlockhash = currentBlockhash;
                transaction.feePayer = payer;

                allTxs.push(transaction);
                return allTxs;
            })
        );
        return AddLiquidityTx;
    } catch(error) {
        if(error instanceOf Error) console.error(error.message);
    }

}`} />
