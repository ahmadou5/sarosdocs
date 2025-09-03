---
sidebar_position: 8
---

# Stake - Example

To creae a new **Pool** we need to introduce some new Helper functions from the `@saros-finance/sdk`:

```js
import {
  getSwapAmountSaros,
  swapSaros,
  convertBalanceToWei,
  createPool,
  genConnectionSolana,
} from "@saros-finance/sdk";

import BN from "bn.js";
```
