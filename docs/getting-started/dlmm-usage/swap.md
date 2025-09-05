---
sidebar_position: 2
---

# Swap

## Swap

To implement `Swap` functionality we need to import all the **Swap** related functions from `@saros-finance/dlmm-sdk` which are:

```js
import {
  BIN_STEP_CONFIGS,
  LiquidityBookServices,
  MODE,
} from "@saros-finance/dlmm-sdk";
import {
  PublicKey,
  Transaction,
  Keypair,
  signTransaction,
} from "@solana/web3.js";
```

## Swap configurations

After Successfully importing the `Swap` related function now we need to initialize our Liquidity book service using mainnet or devnet mode, and also configure all the `Swap` configs

```js
const liquidityBookServices = new LiquidityBookServices({
  mode: MODE.MAINNET,
});
```

## Tokens and Pool configs

```ts
const userAddress = "Fke5jj8NMGGes1fyMysvfpi67BkBF5DiQPCQzoT6yCyj"; //user wallet

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
};
```

## Usage

Now Lets implement the handleSwap functionality.

```ts
const handleSwap = async () => {
  try {
    const amountFrom = 1e6 // Token C98
    const quoteData = await liquidityBookServices.getQuote({
        amount: BigInt(amountFrom),
        isExactInput: true, // input amount in
        swapForY: true, // swap from C98 to USDC
        pair: new PublicKey(POOL_PARAMS.address),
        tokenBase: new PublicKey(POOL_PARAMS.baseToken.mintAddress),
        tokenQuote: new PublicKey(POOL_PARAMS.quoteToken.mintAddress),
        tokenBaseDecimal: POOL_PARAMS.baseToken.decimals,
		tokenQuoteDecimal: POOL_PARAMS.quoteToken.decimals,
		slippage: POOL_PARAMS.slippage
    })

    const { amountIn, amountOut, priceImpact, amount, otherAmountOffset } = quoteData // slippage(fee) include

    const swapTransaction = await liquidityBookServices.swap({
        amount,
        tokenMintX: new PublicKey(POOL_PARAMS.baseToken.mintAddress),
        tokenMintY: new PublicKey(POOL_PARAMS.quoteToken.mintAddress),
        otherAmountOffset,
        hook: new PublicKey(liquidityBookServices.hooksConfig), // optional, if you have a hook.
        isExactInput: true, // input amount in
        swapForY: true, //swap from C98 to USDC
        pair: new PublicKey(POOL_PARAMS.address),
        payer: new PublicKey(userAddress)
    })

    const signedTransaction = signTransaction(swapTransaction);

    const signature = await liquidityBookServices.connection.sendRawTransaction(
	signedTransaction.serialize(),
		{
			skipPreflight: true,
			preflightCommitment: "confirmed",
		}
	);

    const { blockhash, lastValidBlockHeight } = await liquidityBookServices.connection.getLatestBlockhash();

	await liquidityBookServices.connection.confirmTransaction({
		signature,
		blockhash,
		lastValidBlockHeight,
	});
  } catch (error) {
    if(error instanceOf Error) console.error(error.message)
  }
};
```
