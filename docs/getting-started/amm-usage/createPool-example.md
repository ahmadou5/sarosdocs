---
sidebar_position: 3
---

# Create POOL - Example

## Create a Pool

To create a new **Pool** we need to introduce some new Helper functions from the `@saros-finance/sdk` :

```js
import {
  convertBalanceToWei,
  createPool,
  genConnectionSolana,
} from "@saros-finance/sdk";

import { PublicKey, clusterApiUrl, Connection } from "@solana/web3.js";
```

## BigNumber Support

Also we will be needing `BN` Module which is installed by the command :

```js
npm install bn.js
```

After Successfully adding `BN` Module, then we can now use it on our Code like :

```js
import BN from "bn.js";
```

## Connection

Then we need a Connection to the Solana Cluster(network). we can use the saros-finanace `genConnectionSolana` helper function or use the solana `Connection` Class

```js
//using @saros-finance genConnectionSolana function
const connection = genConnectionSolana();

//using @solana/web3.js Connection
const connection = new Connection(clusterApiUrl.mainnet, "confirmed");
```

## Create Pool Configs

So now that we are almost ready lets configure some of the configurations we are going to use.

```js
//Token Program ID
const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

//SAROS SWAP PROGRAM
const SAROS_SWAP_PROGRAM_ADDRESS_V1 = new PublicKey(
  "SSwapUtytfBdBn1b9NUGG6foMVPtcWgpRU32HToDUZr"
);

const userAccount = "5UrM9csUEDBeBqMZTuuZyHRNhbRW4vQ1MgKJDrKU1U2v"; // owner address

const FEE_OWNER = "FDbLZ5DRo61queVRH9LL1mQnsiAoubQEnoCRuPEmH9M8";

const mintAddressUsdt = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";
const mintAddressUsdc = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
```

## POOLS

SPL Tokens and Pool Params in this example we will use the tokens C98 and USDC

```js
// Pool example on saros C98 to USDC
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
};
```

## CreatePool Parameters

`createPool` helper function from `@saros-finance/sdk` need some args to pass to it when calling which are as follows:

- connection: a solana network(cluster) instance or RPC connection.
- userAccount: user solana address(string)
- fee Account: address of the fee receiver(PublicKey)
- token0Mint: the mint address of the first token(PublicKey)
- token1Mint: the mint address of the Second token(PublicKey)
- token0Account: the user token account of the first token(PublicKey)
- token1Account: the user token account of the Second token(PublicKey)
- token0convertedAmount: the converted amount of the first token using the helper function `convertBalanceToWei()` from `@saros-finance/sdk`
- token1convertedAmount: the converted amount of the second token using the helper function `convertBalanceToWei()` from `@saros-finance/sdk`
- curveType: the type of the pool, is it a stablecoin pool or normal SPLS(non-stable)
- curveParameter: same as CurveType (is it a stablecoin pool type?)(BN) in bigNumber here.
- TOKEN_PROGRAM_ID: the program id of token
- SAROSWAP_PROGRAM_ID: the program address of Saros Swap Program

Now that we are more than ready, lets start implementing our handleCreatePool function.

## Usage

```ts
const handleCreatePool = async () => {
  try {
    const token0Mint = USDC_TOKEN.mintAddress;
    const token1Mint = C98_TOKEN.mintAddress;
    const token0Account = USDC_TOKEN.addressSPL;
    const token1Account = C98_TOKEN.addressSPL;

    const isStableCoin =
      (token0Mint === mintAddressUsdt && token1Mint === mintAddressUsdc) ||
      (token0Mint === mintAddressUsdc && token1Mint === mintAddressUsdt);

    const curveType = isStableCoin ? 1 : 0;
    const curveParameter = isStableCoin ? 1 : 0;
    const convertFromAmount = convertBalanceToWei(1, USDC_TOKEN.decimals);
    const convertToAmount = convertBalanceToWei(1, C98_TOKEN.decimals);

    const createPoolResponse = await createPool(
      connection,
      accountSol,
      new PublicKey(FEE_OWNER),
      new PublicKey(token0Mint),
      new PublicKey(token1Mint),
      new PublicKey(token0Account),
      new PublicKey(token1Account),
      convertFromAmount,
      convertToAmount,
      curveType,
      new BN(curveParameter),
      TOKEN_PROGRAM_ID,
      SAROS_SWAP_PROGRAM_ADDRESS_V1
    );
    const { isError } = createPoolResponse;

    if (isError) {
      throw new Error();
    }

    return `Your transaction hash ${createPoolResponse.hash}`;
  } catch (error) {
    if(error instanceOf Error) {
        console.error(error.message)
    }
  }
};
```
