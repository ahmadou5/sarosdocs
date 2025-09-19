---
sidebar_position: 1
---

import Terminal from '@site/src/components/Terminal'
import PackageManagerTabs from '@site/src/components/PackageManager'
import CodeBlock from '@site/src/components/CodeBlock'

# Installation

Install `Saros SDK` into your **solana** Dapp.

## Quick Start

- Navigate to your Project root directory `cd my-dapp`

## System requirements

Before you begin, make sure you have the following requirements in place:

- Node.js 18.8 or later.
- Operating System: Linux, Mac OS, or Windows.
- Development Environment: You'll need an Integrated Development Environment (IDE) installed. We recommend Visual Studio Code.
- Languages: Saros AMM SDK(SarosSwap) and Saros DLMM supports JavaScript. while Saros DLMM/rs Supports Rust, Make sure you have the appropriate language environment set up.
- Internet Connection: A stable internet connection is required for installation, updates, and interacting with `Saros SDK`.

## For AMM SDK (Saros Swap).

Choose from your prefered Package Manager `npm`, `yarn`, `pnpm` or `bun`
<PackageManagerTabs title="Terminal" packageName='@saros-finance/sdk' />

## For Dynamic Liquidity Market Maker (Saros DLMM).

Choose from your prefered Package Manager `npm`, `yarn`, `pnpm` or `bun`

<PackageManagerTabs title="Terminal" packageName='@saros-finance/dlmm-sdk' />

## Run development server.

After Successfully installing `Saros SDK` now we are ready to run our project on Development enviroment.

<PackageManagerTabs title="Terminal" packageName='@saros-finance/dlmm-sdk' isDevServer={true} />

Congratulations you just installed `Saros SDK` in your Project 🥳🥳🎯🎯

![Docusaurus logo](/saros/banner7.png)
