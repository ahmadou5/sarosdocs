---
sidebar_position: 6
---

# Get Farm List

## Farm List

To fetch the **Farm** list all we need from the `@saros-finance/sdk` is :

```js
import sarosSdk from "@saros-finance/sdk";
```

## SarosFarmService

We need to utilize the SarosFarmService that we got from the sarosSdk member we just imported

```js
//using @saros-finance SarosFarm Services then we
const { SarosFarmService } = sarosSdk;
```

## Usage

```js
//Query all farms on Saros
const handleFetchFarmList = async () => {
  try {
    const farmResponse = await SarosFarmService.getListPool({
      page: 1,
      size: 2,
    });
    return farmResponse;
  } catch (error) {
    if(error instanceOf Error) console.error(error)
    return []
  }
};
```
