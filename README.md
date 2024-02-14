## Smart contract development using fireblocks & hardhat on EVM test chain - `goerli`

## Install dependencies

```bash
$ yarn install
```

## Running the app

```bash
# compile solidity contracts
$ npx hardhat compile

# deploy the compiled 'DigitalCollectible' smart contract
$ npx hardhat run --network goerli scripts/deploy-collectible.ts

# to interact with the deployed 'DigitalCollectible' smart contract
# minting collectibles
# transferring ownership of a collectible to another user
# get all collectibles of an user
$ npx hardhat run --network goerli scripts/interact.ts
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Links

- [Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started)
- [Fireblocks](https://developers.fireblocks.com/docs/deploying-an-nft-collection)
