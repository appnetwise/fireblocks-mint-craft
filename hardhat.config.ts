import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
import '@fireblocks/hardhat-fireblocks';
import { ApiBaseUrl } from '@fireblocks/fireblocks-web3-provider';

dotenv.config();

const { SOLIDITY_VERSION, NETWORK_URL, PRIVATE_KEY, NETWORK_NAME } =
  process.env;

if (!NETWORK_URL || !PRIVATE_KEY || !NETWORK_NAME) {
  throw new Error('Missing required environment variable');
}

const config: HardhatUserConfig = {
  solidity: SOLIDITY_VERSION || '0.8.23',
  defaultNetwork: 'goerli',
  networks: {
    goerli: {
      url: 'https://rpc.ankr.com/eth_goerli',
      fireblocks: {
        apiBaseUrl: ApiBaseUrl.Sandbox, // If using a sandbox workspace
        privateKey: process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH,
        apiKey: process.env.FIREBLOCKS_API_KEY,
        vaultAccountIds: [0, 1, 2],
      },
    },
  },
};

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

export default config;
