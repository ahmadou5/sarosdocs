---
sidebar_position: 7
---

# Get Stake List - Example

## Stake List

To fetch the **Stake** list all we need from the `@saros-finance/sdk` is :

```js
import sarosSdk from "@saros-finance/sdk";
```

## SarosStakeService

We need to utilize the SarosStakeService that we got from the sarosSdk member we just imported

```js
//using @saros-finance Saros Stake Services
const { SarosStakeService } = sarosSdk;
```

## Usage

```js
//Query all Staking on Saros
const handleFetchStakeList = async () => {
  try {
    const stakeResponse = await SarosStakeService.getListPool({
      page: 1,
      size: 2,
    });
    return stakeResponse;
  } catch (error) {
    if(error instanceOf Error) console.error(error)
    return []
  }
};
```
