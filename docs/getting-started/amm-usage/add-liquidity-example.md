---
sidebar_position: 4
---

# Add Liquidity - Example

## Add Liquidity

To creae a new **Pool** we need to introduce some new Helper functions from the `@saros-finance/sdk`:

```js
import {
  depositAllTokenTypes,
  convertBalanceToWei,
  getPoolInfo,
  getTokenMintInfo,
  getTokenAccountInfo,
  genConnectionSolana,
} from "@saros-finance/sdk";

import BN from "bn.js";
```

Here's an example of how to add liquidity to a pool:

```js
const onAddLiqPool = async () => {
  // Get pool information using pool address
  const poolAccountInfo = await getPoolInfo(
    connection,
    new PublicKey(poolParams.address)
  );

  // Define token mint addresses and SPL token accounts
  const token0Mint = C98_TOKEN.mintAddress;
  const token1Mint = USDC_TOKEN.mintAddress;
  const token0Account = C98_TOKEN.addressSPL;
  const token1Account = USDC_TOKEN.addressSPL;

  // Get LP token mint information
  const newPoolLpMintInfo = await getTokenMintInfo(
    connection,
    poolAccountInfo.lpTokenMint
  );

  // Get current LP token supply
  const lpTokenSupply = newPoolLpMintInfo.supply
    ? newPoolLpMintInfo.supply.toNumber()
    : 0;

  // Convert input amount to wei (using USDC decimals)
  const convertFromAmount = convertBalanceToWei(1, USDC_TOKEN.decimals);

  // Get token0 account information from pool
  const newPoolToken0AccountInfo = await getTokenAccountInfo(
    connection,
    poolAccountInfo.token0Account
  );

  // Calculate LP token amount based on proportion
  const lpTokenAmount =
    (parseFloat(convertFromAmount) * lpTokenSupply) /
    newPoolToken0AccountInfo.amount.toNumber();

  // Execute deposit transaction
  const result = await depositAllTokenTypes(
    connection,
    accountSol,
    new PublicKey(accountSol),
    new PublicKey(token0Account),
    new PublicKey(token1Account),
    lpTokenAmount,
    new PublicKey(poolParams.address),
    SAROS_SWAP_PROGRAM_ADDRESS_V1,
    token0Mint,
    token1Mint,
    SLIPPAGE
  );

  // Handle result
  const { isError } = result;

  if (isError) {
    return console.log(`${result.mess}`);
  }

  return `Your transaction hash ${result.hash}`;
};
```

This example demonstrates how to:

1. Fetch pool information
2. Calculate the appropriate LP token amount
3. Add liquidity using both tokens
4. Handle the transaction result

Note: Make sure you have the required token accounts and sufficient balances before executing this function.
