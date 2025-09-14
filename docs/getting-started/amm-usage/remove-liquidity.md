---
sidebar_position: 5
---

import CodeBlock from '@site/src/components/CodeBlock'
import PackageManagerTabs from '@site/src/components/PackageManager'

# 🔓 Remove Liquidity

## Remove Liquidity

Removing **Liquidity** we need some new Helper functions from the `@saros-finance/sdk` :

<CodeBlock
filename="RemoveLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`import {
withdrawAllTokenTypes,
convertBalanceToWei,
getPoolInfo,
getTokenMintInfo,
getTokenAccountInfo,
getInfoTokenByMint,
genConnectionSolana,
} from "@saros-finance/sdk";

import { PublicKey, clusterApiUrl, Connection } from "@solana/web3.js";`} />

## Connection

Then we need a Connection to the Solana Cluster(network). we can use the saros-finanace `genConnectionSolana` helper function or use the solana `Connection` Class

<CodeBlock
filename="RemoveLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`//using @saros-finance genConnectionSolana function
const connection = genConnectionSolana();

//using @solana/web3.js Connection
const connection = new Connection(clusterApiUrl.mainnet, "confirmed");`} />

## Remove Liquidity Configs

So now that we are almost ready lets configure some of the configurations we are going to use to remove that Liquidity out to touch some grass.

<CodeBlock
filename="RemoveLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`//SAROS SWAP PROGRAM
const SAROS_SWAP_PROGRAM_ADDRESS_V1 = new PublicKey(
"SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr"
);

const userAccount = "5UrM9csUEDBeBqMZTuuZyHRNhbRW4vQ1MgKJDrKU1U2v"; // owner address

const SLIPPAGE = 0.5;`} />

## POOLS

SPL Tokens and Pool Params in this example we will use the tokens C98 and USDC

<CodeBlock
filename="AddLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`// Pool example on saros C98 to USDC
const USDC_TOKEN = {
id: "usd-coin",
mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
symbol: "usdc",
name: "USD Coin",
icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
decimals: "6",
addressSPL: "FXRiEosEvHnpc3XZY1NS7an2PB1SunnYW1f5zppYhXb3",
};

const C98_TOKEN = {
id: "coin98",
mintAddress: "C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9",
symbol: "C98",
name: "Coin98",
icon: "https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/c98-512.svg",
decimals: "6",
addressSPL: "EKCdCBjfQ6t5FBfDC2zvmr27PgfVVZU37C8LUE4UenKb",
};

//PoolParams
const poolParams = {
address: "2wUvdZA8ZsY714Y5wUL9fkFmupJGGwzui2N74zqJWgty",
tokens: {
C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9: {
...C98_TOKEN,
},
EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
...USDC_TOKEN,
},
},
tokenIds: [
"C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9",
"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
],
};`} />

## Remove Liquidity Parameters

we are going to use the `withdrawAllTokenTypes` helper function from `@saros-finance/sdk`, and it need some args to pass to it when calling, which are as follows:

- connection: a solana network(cluster) instance or RPC connection.
- userAccount: user solana address(string)
- userLPTokenAccount: address of the LP token account that the user is holding fetched using `getInfoTokenByMint()` from `@saros-finance/sdk`
- token0Account: the user token account of the first token(PublicKey)
- token1Account: the user token account of the Second token(PublicKey)
- LPTokenAmount: the converted amount of the lp token using the helper function `convertBalanceToWei()` from `@saros-finance/sdk`
- poolAddress: The address of the pool(PublicKey).
- SAROSWAP_PROGRAM_ID: the program address of Saros Swap Program
- token0Mint: the mint address of the first token(string)
- token1Mint: the mint address of the Second token(string)
- SLIPPAGE: the slippage percentage

Now that we are more than ready, lets start implementing our handleRemoveLiquidity function.

## Usage

<CodeBlock
filename="RemoveLiquidity.tsx"
language="TypeScript"
showCopy={true}
showLineNumbers={true} code={`const handleRemoveLiquidity = async () => {
try {
// Get pool information using pool address
const poolAccountInfo = await getPoolInfo(
connection,
new PublicKey(poolParams.address)
);

const lpTokenSupply = poolAccountInfo.supply
? poolAccountInfo.supply.toNumber()
: 0;

const lpTokenMint = poolAccountInfo.lpTokenMint.toString();
const newPoolToken0AccountInfo = await getTokenAccountInfo(
connection,
poolAccountInfo.token0Account
);

const lpTokenAmount =
(parseFloat(1) \* lpTokenSupply) /
newPoolToken0AccountInfo.amount.toNumber();

const infoLpUser = await getInfoTokenByMint(lpTokenMint, accountSol);
// Define token mint addresses and SPL token accounts
const token0Mint = C98_TOKEN.mintAddress;
const token1Mint = USDC_TOKEN.mintAddress;
const token0Account = C98_TOKEN.addressSPL;
const token1Account = USDC_TOKEN.addressSPL;

const withdrawResult = await withdrawAllTokenTypes(
connection,
userAccount,
infoLpUser.pubkey,
token0Account,
token1Account,
lpTokenAmount,
new PublicKey(poolParams.address),
SAROS_SWAP_PROGRAM_ADDRESS_V1,
token0Mint,
token1Mint,
SLIPPAGE
);

// Handle result
const { isError } = withdrawResult;

if (isError) {
throw new Error()
}

return withdrawResult.hash;
} catch(error) {
if(error instanceOf Error)console.error(error.message)
}
};`} />

This example demonstrates how to:

- Remove Liquidity
